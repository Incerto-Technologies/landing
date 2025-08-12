import React from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { getAllDocs, getDocBySlug, slugify } from '@/lib/docs';
import DocsToc from '@/components/docs/toc';

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const docs = getAllDocs();
  return docs.map((d) => ({ slug: d.slugParts }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolved = await params;
  const page = getDocBySlug(resolved.slug);
  if (!page) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0">
      <article className="bg-zinc-950/70 rounded-xl p-4 md:p-6 shadow-sm text-[0.95rem] leading-7">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, children, ...props }) => {
              const id = slugify(String(children));
              return <h1 id={id} className="text-[1.875rem] md:text-[2rem] font-bold tracking-tight text-white mb-5 scroll-mt-20" {...props}>{children}</h1>;
            },
            h2: ({ node, children, ...props }) => {
              const id = slugify(String(children));
              return <h2 id={id} className="text-[1.25rem] md:text-[1.375rem] font-semibold text-white mt-9 mb-3 scroll-mt-20" {...props}>{children}</h2>;
            },
            h3: ({ node, children, ...props }) => {
              const id = slugify(String(children));
              return <h3 id={id} className="text-[1.125rem] font-semibold text-white mt-7 mb-2.5 scroll-mt-20" {...props}>{children}</h3>;
            },
            p: ({ node, ...props }) => <p className="text-zinc-300 mb-3" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1.5 text-zinc-300 mb-3" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1.5 text-zinc-300 mb-3" {...props} />,
            li: ({ node, ...props }) => <li className="marker:text-zinc-500" {...props} />,
            hr: () => <hr className="my-7 border-zinc-800" />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-5" {...props} />
            ),
            table: ({node, ...props}) => (
              <div className="my-5 overflow-x-auto rounded-lg">
                <table className="min-w-full divide-y divide-zinc-800 text-[0.95rem] text-zinc-300" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => (
              <thead className="bg-zinc-900/50" {...props} />
            ),
            tbody: ({node, ...props}) => (
              <tbody className="divide-y divide-zinc-800" {...props} />
            ),
            tr: ({node, ...props}) => (
              <tr className="hover:bg-zinc-900/40" {...props} />
            ),
            th: ({node, ...props}) => (
              <th className="px-4 py-2.5 text-left font-semibold text-zinc-200" {...props} />
            ),
            td: ({node, ...props}) => (
              <td className="px-4 py-2.5 align-top" {...props} />
            ),
            img: ({node, ...props}) => (
              <figure className="my-7">
                <div className="relative w-full overflow-hidden rounded-lg shadow">
                  <Image src={props.src || ''} alt={props.alt || ''} width={1200} height={630} className="w-full h-auto object-cover" />
                </div>
                {props.alt && (
                  <figcaption className="text-xs text-zinc-400 mt-2">{props.alt}</figcaption>
                )}
              </figure>
            ),
            code: ({node, className, children, ...props}) => {
              const isInline = !className;
              if (isInline) {
                return <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-[0.875rem] font-mono text-zinc-200" {...props}>{children}</code>;
              }
              return (
                <pre className="bg-[#0b0b0b] p-4 rounded-lg overflow-x-auto my-6">
                  <code className="text-[0.9rem] font-mono text-zinc-200" {...props}>{children}</code>
                </pre>
              );
            },
            a: ({ node, ...props }) => (
              <a className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:text-white" {...props} />
            ),
          }}
        >
          {page.content}
        </ReactMarkdown>
      </article>
      <DocsToc headings={page.headings} />
    </div>
  );
} 