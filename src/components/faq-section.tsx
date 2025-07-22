import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionContainer from "./layouts/section-container";

const faqs = [
  {
    question: "What is this Database Observability tool?",
    answer:
      "It's an on-premise solution designed to monitor, analyze, and troubleshoot your database systems in real-time. It provides in-depth insights into performance, schema, query health, and anomalies, with AI-powered suggestions for remediation.",
  },
  {
    question: "How is the pricing structured?",
    answer:
      "We charge based on the <strong>number of databases you choose to monitor</strong>. This includes all features—no per-user or per-query costs. It's simple and scalable as your database footprint grows.",
  },
  {
    question: "Is this a SaaS product?",
    answer:
      "<strong>No.</strong> This is <strong>not a SaaS</strong> product. It is fully <strong>self-hosted on your infrastructure</strong>, ensuring you have complete control over deployment, upgrades, and data flow.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "All your database telemetry, logs, and configuration data are stored <strong>locally on your infrastructure</strong>. We do <strong>not store or access</strong> your data on any external servers.",
  },
  {
    question: "Does any data leave my environment?",
    answer:
      "The only external communication is with <strong>OpenAI and/or Anthropic APIs</strong> for optional AI-based remediation suggestions. You can fully control and audit what is sent, and these integrations can be disabled if desired.",
  },
  {
    question: "What kind of insights does the tool provide?",
    answer:
      "It detects and surfaces: Query performance bottlenecks, Schema inefficiencies, Failed insertions or replication issues, Disk/memory pressure on database nodes, Zookeeper (or other cluster coordination) failures, Sudden spikes in latency or throughput.",
  },
  {
    question: "What databases do you support?",
    answer:
      "The tool currently specializes in <strong>ClickHouse</strong>, but support for other OLAP and OLTP databases is planned. Please contact us for upcoming support details.",
  },
  {
    question: "Do I need internet access to run the tool?",
    answer:
      "Internet access is only required if: You enable AI integrations (OpenAI/Anthropic), You want to fetch updates or use optional telemetry sharing (disabled by default). Otherwise, the tool functions <strong>completely offline</strong>.",
  },
  {
    question: "Can I control what data goes to OpenAI or Anthropic?",
    answer:
      "Absolutely. You can: View and redact prompts before they're sent, Opt-in/opt-out for specific AI agents, Host your own API gateway for logging and filtering outbound requests.",
  },
  {
    question: "How do upgrades and support work?",
    answer:
      "You get: Versioned releases with changelogs, Optional support contracts for SLAs, Documentation and playbooks for upgrade procedures.",
  },
  {
    question: "What are the system requirements?",
    answer:
      "A typical deployment requires a single node: 4 vCPU, 8 GB RAM. Full specs depend on the number of databases and traffic.",
  },
];

export function FAQSection() {
  return (
    <SectionContainer>
      <h3 className="mb-12 text-center text-2xl font-semibold text-foreground">
        Frequently Asked Questions
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Still have questions?{" "}
          <a href="/contact" className="text-primary hover:text-primary/80">
            Contact Us
          </a>{" "}
          now!
        </p>
      </div>
    </SectionContainer>
  );
}
