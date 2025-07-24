import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">{post.date}</p>
        </div>
        
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
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
            table: ({node, ...props}) => (
              <div className="my-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-border" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => (
              <thead className="bg-muted" {...props} />
            ),
            tbody: ({node, ...props}) => (
              <tbody className="divide-y divide-border" {...props} />
            ),
            tr: ({node, ...props}) => (
              <tr className="text-foreground" {...props} />
            ),
            th: ({node, ...props}) => (
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
            ),
            td: ({node, ...props}) => (
              <td className="px-4 py-3 text-sm" {...props} />
            ),
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
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
