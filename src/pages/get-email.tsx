import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

export const GetEmail = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem("remediation-email");
    if (email) {
      setEmail(email);
      setSuccess(true);
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async () => {
    try {
      setLoading(true);
      z.string().email().parse(email);

      const res = await fetch("https://incerto.in/api/magicpill/remediation", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log(data);
      sessionStorage.setItem("remediation-email", email);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Invalid email",
        description: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <div>
      {!success ? (
        <div className="flex flex-col gap-2 max-w-[500px] mx-auto">
          <h3 className="text-2xl font-semibold capitalize">
            Let's know you better
          </h3>
          <p className="text-sm text-gray-500">
            Enter your email to get access to the clickhouse remediation list
          </p>
          <Input
            type="email"
            placeholder="joe@example.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Button onClick={handleContactSubmit} disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
