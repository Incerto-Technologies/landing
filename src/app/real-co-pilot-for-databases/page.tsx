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
# What is a Real Database Co-Pilot ?

Let understand what can we expect from the best AI Powered Co-Pilot for Databases. And where does Incerto stand ?

## Best of Human's can't be replaced by Incerto (as of now)

If you have a responsible, smart, exteremely knowledgeable teamate looking after your databases, Incerto can't be a replacement for them.
They have Context and Agency which in unparalleled.

>"Otherwise, we would call it "Pilot" instead of Co-Pilot"

![Incerto on 16:30 22 July 2025](/co-pilot-diagram.png)

## Limitations of being a human

There are limitations to being a human : 
- You can't track everything happening in the database.
- You take time to write SQL queires. 
- You can't store all the context you need to solve a problem. 
- You can't master all the DBMS your organisation uses. 

## What is the Hardest thing about DBMS in production ?

Lot of context. A typical organisation uses 3-4 DBMS in tandem. Running different types of workloads. Larger the scale, more the context and thus larger team managing and interacting with it.

>"Real Co-Pilot must maintain all the context, across DBMSes"

## Expertise in DBMS is hard to come by

You need to have worked and solved multiple productions issues to be an expert in DBMS. That is why we often offload it to vendors, with expertise.

>"Real Co-Pilot must be able to solve any production issue, across DBMSes"

## Intelligence is required to optimize and solve unkown problems

We all can agree here ?

>"Real Co-Pilot must be able to optimize and solve unkown problems"

## What does Incerto do ?

>"Incerto has all the context, across DBMSes, and uses AI to help solve problems and complete tasks"

Center of it is a **Context Engine made for Databases**

![Incerto Context Engine Diagram as of 16:30 22 July 2025](/incerto_context_engine.png)

We will keep the details of "Internals of Incerto" for the next blog post. Feel free to reach out to us if you have any questions. 

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