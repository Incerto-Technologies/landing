import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is a Real Database Co-Pilot? | Incerto AI Database Management",
  description: "Discover what makes a real database co-pilot. Learn how Incerto's AI-powered context engine maintains database context across multiple DBMS and solves production issues intelligently.",
  keywords: "database co-pilot, AI database management, database context engine, database automation, production database issues, multi-DBMS management",
  openGraph: {
    title: "What is a Real Database Co-Pilot? | Incerto AI Database Management",
    description: "Discover what makes a real database co-pilot. Learn how Incerto's AI-powered context engine maintains database context across multiple DBMS.",
    type: "website",
    url: "https://incerto.com/real-co-pilot-for-databases",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Real Database Co-Pilot? | Incerto AI Database Management",
    description: "Discover what makes a real database co-pilot. Learn how Incerto's AI-powered context engine maintains database context across multiple DBMS.",
  },
};

const markdown = `
# What is a Real Database Co-Pilot?

Let's understand what we should expect from the best AI-powered Co-Pilot for databases. And where does Incerto stands today.

## The Best of Humans Can't Be Replaced by Incerto (Yet)

If you have a responsible, smart, exteremely knowledgeable teamate managing your databases, Incerto is not a replacement for them yet.
They bring **context** and **agency** - qualities that are hard to replicate.

> Otherwise, we would call it a "Pilot" instead of a "Co-Pilot."

![Incerto as on 22 July 2025](/co-pilot-diagram.png)

## The Limitations of Being Human

Despite their strengths, humans have certain limitations:

- You can't track everything happening inside a database.
- Writing SQL queries takes time.
- You can't store all the context needed to solve complex issues.
- You can't master every DBMS your organization uses.

## What's the Hardest Part About DBMS in Production?

**Context Overload.** Most organizations use 3-4 different DBMSs simultaneously, each running distinct workloads. The larger the scale, the more context is needed, and the more people are required to manage it.

> "A real Co-Pilot must maintain all context, across DBMSs."

## DBMS Expertise is Rare

Becoming an expert requires hands-on experience solving real production issues. That's why many teams rely on external vendors with deep domain expertise.

> "A real Co-Pilot must be able to solve any production issue, across DBMSs."

## Intelligence is Required to Optimize and Solve Unknown Problems

We can all agree on this:

> "A real Co-Pilot must be able to optimize and solve unknown problems."

## What Does Incerto do?

> "Incerto has the ability to fetch complete context across multiple DBMSs and use AI agents to solve problems and complete tasks."

At its core, Incerto is a **Context Engine built specifically for databases**.

![Incerto Context Engine Diagram as of 22 July 2025](/incerto_context_engine.png)

We'll dive into the "Internals of Incerto" in our next blog post.

In the meantime, feel free to reach out with any questions.

`;


export default function RealCoPilotPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => (
              <h1 className="text-4xl font-bold mb-8 text-foreground" {...props} />
            ),
            h2: ({node, ...props}) => (
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground" {...props} />
            ),
            h3: ({node, ...props}) => (
              <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground" {...props} />
            ),
            p: ({node, ...props}) => (
              <p className="mb-4 text-foreground leading-relaxed" {...props} />
            ),
            ul: ({node, ...props}) => (
              <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />
            ),
            li: ({node, ...props}) => (
              <li className="text-foreground" {...props} />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6" {...props} />
            ),
            code: ({node, className, children, ...props}) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                  <code className="text-sm font-mono" {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
            img: ({node, ...props}) => (
              <div className="my-8 text-center">
                <Image
                  src={props.src || ''}
                  alt={props.alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg border shadow-lg mx-auto"
                />
                {props.alt && (
                  <p className="text-sm text-muted-foreground mt-2">{props.alt}</p>
                )}
              </div>
            )
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
} 