import { Button } from "../../ui/button";
import { Copy, Play } from "lucide-react";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { AlertRemediationStep } from "@/types/alert.types";
import AppMarkdownViewer from "@/components/ui/markdown";

type RemediationRunnerProps = {
  step: AlertRemediationStep & {
    content?: string;
  };
};

export const RemediationRunner: React.FC<RemediationRunnerProps> = ({
  step,
}) => {
  const [scriptContent, setScriptContent] = useState(step.content);

  const [errorMessage, setErrorMessage] = useState("");

  const getScriptContent = async (scriptId: string) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(
      `${baseUrl}/api/v1/execution-entity/${scriptId}/content`
    );
    return res.json();
  };

  useEffect(() => {
    if (step.scriptId == "") return;

    if (step.content) {
      console.table({ step, scriptContent, state: "before" });
      setScriptContent(step.content);
      console.table({ step, scriptContent, state: "after" });

      return;
    }

    if (!scriptContent)
      getScriptContent(step.scriptId)
        .then((res) => {
          if (res.data) {
            setScriptContent(res.data);
          } else {
            toast({
              title: `Unable to fetch ${step.scriptName} content`,
              description: res.message || "Please try again later",
            });
            setErrorMessage(res.message);
          }
        })
        .catch(() => {
          toast({
            title: "Unable to fetch script content",
            description: "Please try again later",
          });
        });
  }, [step.scriptId, step.content, step.scriptName]);

  const handleCopy = () => {
    copy(scriptContent || "");
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <div className="mt-2 h-full w-full">
      {/* <p className="text-sm text-muted-foreground">{step.instruction}</p> */}
      <AppMarkdownViewer value={step.instruction || ""} />
      {step.scriptName != "" && (
        <div className="mt-2 rounded-md border bg-muted text-white">
          <div className="flex items-center justify-between gap-2 px-2 py-2">
            <h2 className="text-md text-muted-foreground">{step.scriptName}</h2>
            <div className="flex gap-1">
              <Button
                size="icon"
                className="h-6 w-8 gap-1 rounded-sm p-1"
                onClick={handleCopy}
                variant={"default"}
                disabled={!scriptContent}
              >
                <Copy className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                className="h-6 w-8 gap-1 rounded-sm p-1"
                disabled={true}
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="w-full">
            {!errorMessage && !scriptContent ? (
              <Skeleton className="h-[50px] w-full rounded-md bg-gray-200 dark:bg-gray-400" />
            ) : !errorMessage && scriptContent ? (
              <pre className="w-full text-wrap rounded-b-md bg-codeinnerblock p-2 text-sm leading-5 text-gray-300 dark:bg-codeinnerblock">
                {scriptContent}
              </pre>
            ) : (
              <pre className="w-full text-wrap rounded-b-md bg-codeinnerblock p-2 text-sm leading-5 text-red-500 dark:bg-codeinnerblock">
                {errorMessage}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
