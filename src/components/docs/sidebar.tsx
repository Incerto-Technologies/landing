import Link from 'next/link';
import { getSidebarTree } from '@/lib/docs';
import React from 'react';

export default function DocsSidebar() {
  const groups = getSidebarTree();

  return (
    <aside className="hidden md:block w-64 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-4">
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.category}>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-2">
              {group.category}
            </div>
            <nav className="grid">
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="px-3 py-2 rounded-md text-sm text-zinc-300 hover:text-white hover:bg-zinc-900/60"
                >
                  {item.sidebarTitle}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
} 