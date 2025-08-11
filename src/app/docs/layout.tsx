import React from 'react';
import DocsSidebar from '@/components/docs/sidebar';
import DocsSearch from '@/components/docs/search';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-3 py-4">
        <div className="mb-4">
          <div className="rounded-lg bg-zinc-950/60 p-2">
            <DocsSearch />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr] lg:grid-cols-[14rem_minmax(900px,1fr)_18rem] gap-2">
          <DocsSidebar />
          <div className="min-w-0">{children}</div>
          {/* Right column is rendered by the page */}
        </div>
      </div>
    </div>
  );
} 