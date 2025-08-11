"use client";

import React from 'react';
import { DocHeading } from '@/lib/docs';

export default function DocsToc({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-full sticky top-24 self-start">
      <div className="rounded-xl bg-zinc-950/60 p-4 w-fit">
        <div className="text-xs uppercase tracking-wider text-zinc-400 mb-3 px-1">On this page</div>
        <nav className="flex flex-col text-sm">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`px-2 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeId === h.id ? 'text-white bg-zinc-900' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
              style={{ marginLeft: (h.level - 1) * 12 }}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
} 