import Link from 'next/link';
import React from 'react';
import { getSidebarTree } from '@/lib/docs';

export default function DocsHomePage() {
  const groups = getSidebarTree();
  return (
    <main className="prose prose-invert max-w-none">
      <div className="bg-gradient-to-b from-zinc-900 to-black rounded-xl border border-zinc-800 p-8">
        <h1>Welcome</h1>
        <p>Learn about our platform and how to get started. Browse concepts, guides, integrations, and more.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {groups.map((group) => (
          <div key={group.category} className="rounded-lg border border-zinc-800 p-5 bg-zinc-950">
            <h3 className="m-0">{group.category}</h3>
            <ul className="mt-3">
              {group.items.slice(0, 5).map((item) => (
                <li key={item.slug} className="my-2">
                  <Link className="no-underline hover:underline" href={item.slug}>{item.sidebarTitle}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link className="text-sm text-zinc-300 hover:underline" href={group.items[0]?.slug || '#'}>Open {group.category}</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 