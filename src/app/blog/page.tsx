import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Real Co-Pilot for Databases | Incerto",
  description: "Learn about Incerto's AI-powered database co-pilot technology. Discover how our agentic AI works alongside human database administrators to solve complex database problems efficiently.",
  keywords: "database co-pilot, AI database assistant, database automation, database management blog, incerto blog, database AI technology",
  openGraph: {
    title: "Blog - Real Co-Pilot for Databases | Incerto",
    description: "Learn about Incerto's AI-powered database co-pilot technology and how it works alongside human administrators.",
    type: "website",
    url: "https://incerto.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Real Co-Pilot for Databases | Incerto",
    description: "Learn about Incerto's AI-powered database co-pilot technology and how it works alongside human administrators.",
  },
};

const markdown = `
# What is Real Co-Pilot for Databases

![Database Diagram](/co-pilot-diagram.png)

## Human's can't be replaced by Incerto

If you have a responsible, smart, exteremely knowledgeable teamate looking after your databases, Incerto can't be a replacement for them.
They have Context and Agency which in unparalleled.

We would have names it "Pilot" instead otherwise. 

`;

export default function BlogPage() {
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
