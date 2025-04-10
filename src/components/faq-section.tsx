import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I cap my usage so my bill doesn't run over?",
    answer:
      "Yes, you can set usage limits in your account settings to prevent unexpected charges. We'll notify you when you're approaching your limits.",
  },
  {
    question:
      "I'm worried I could end up with a huge bill at the end of the month.",
    answer:
      "We provide real-time usage monitoring and alerts to help you stay within your budget. You can also set hard limits on resource usage.",
  },
  {
    question: "When will I be billed?",
    answer:
      "Billing occurs at the end of each month for the resources you've used. You'll receive an invoice with detailed usage breakdown.",
  },
  {
    question: "Are you going to change your pricing in the future?",
    answer:
      "We strive to maintain consistent pricing. If any changes occur, we'll provide advance notice and grandfather existing customers on their current plans.",
  },
  {
    question: "What happens if I cancel my subscription?",
    answer:
      "You can cancel anytime. You'll have access to your resources until the end of your billing period. We provide tools to export your data.",
  },
  {
    question: "Do I get a notification if I am approaching my usage limits?",
    answer:
      "Yes, we send email notifications when you reach 80% and 90% of your usage limits to help you avoid any service interruptions.",
  },
  {
    question:
      "What if I need one project for development and one for production?",
    answer:
      "You can create multiple projects under one account. Each project is billed separately based on its resource usage.",
  },
  {
    question: "Can I pause a free project?",
    answer:
      "Yes, you can pause free projects at any time. This helps conserve resources when you're not actively using them.",
  },
];

export function FAQSection() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <h2 className="mb-12 text-center text-2xl font-semibold text-gray-900">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Can&apos;t find the answer to your question?{" "}
          <a href="/contact" className="text-green-600 hover:text-green-700">
            Open a support ticket
          </a>{" "}
          to receive help from our team.
        </p>
      </div>
    </div>
  );
}
