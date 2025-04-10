import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { WindowView } from "../ui/window-view";
import { TabsContent } from "@radix-ui/react-tabs";

const FEATURES = [
  "Full CRUD",
  "Materialized Views",
  "Foreign Tables",
  "Partitioned Tables",
  "Easy as a spreadsheet",
];
const TABS = [
  {
    label: "Query",
    value: "query",
    src: "/dashboard.png",
  },
  {
    label: "SQL Editor",
    value: "sql-editor",
    src: "/dashboard.png",
  },
  {
    label: "RLS Policies",
    value: "rls-policies",
    src: "/dashboard.png",
  },
];

export function FeaturesSection() {
  return (
    <section className="mt-[70px] px-4">
      <h2 className="text-center text-[34px] font-medium leading-tight text-[var(--color-foreground)]">
        What INCERTO Can DO?
        <br />
        <span className="text-muted-foreground">
          without leaving the dashboard
        </span>
      </h2>

      <Tabs defaultValue="query">
        <div className="mx-auto mt-8 flex max-w-fit items-center gap-4 rounded-full bg-[var(--color-muted)]/10 p-1">
          <TabsList className="space-x-2">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full border  px-4 py-1.5 text-[13px] font-medium text-muted-foreground cursor-pointer data-[state=active]:border-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="mt-8 flex flex-wrap gap-6 justify-center">
              {FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-[13px] font-medium text-[var(--color-muted-foreground)]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3334 4L6.00008 11.3333L2.66675 8"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto mt-8">
              <WindowView>
                <Image
                  src={tab.src}
                  alt="Dashboard Preview"
                  className="w-full rounded-lg border h-full border-[var(--color-border)]"
                  width={2400}
                  height={2400}
                />
              </WindowView>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
