"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DocsSearch() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Array<{ id: string; title: string; url: string }>>([]);
  const [items, setItems] = React.useState<Array<{ id: string; title: string; url: string; text: string }>>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const router = useRouter();

  const indexRef = React.useRef<any>();

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const res = await fetch('/api/docs-search', { cache: 'force-cache' });
      const data = await res.json();
      if (!mounted) return;
      setItems(data.items);
      // Dynamic import to ensure this only loads on the client bundle
      const flex = await import('flexsearch');
      const IndexCtor = (flex as any).Index || (flex as any).default?.Index || (flex as any);
      const idx = new IndexCtor({ tokenize: 'forward', preset: 'match', cache: true });
      data.items.forEach((it: any) => {
        idx.add(it.id, `${it.title} ${it.text}`);
      });
      indexRef.current = idx;
    };
    load();
    return () => { mounted = false; };
  }, []);

  React.useEffect(() => {
    const idx = indexRef.current;
    if (!idx || query.trim().length === 0) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }
    const ids: string[] = idx.search(query, { limit: 8 });
    const mapped = ids
      .map((id) => items.find((x) => x.id === id))
      .filter(Boolean)
      .slice(0, 8) as Array<{ id: string; title: string; url: string }>;
    setResults(mapped);
    setSelectedIndex(-1);
  }, [query, items]);

  const handleResultClick = (url: string) => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : results.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex].url);
        }
        break;
      case 'Escape':
        setQuery('');
        setResults([]);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-zinc-900/60 px-3 py-2 rounded-md">
        <Search className="w-4 h-4 text-zinc-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search documentation..."
          className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-500"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-zinc-950 rounded-md shadow-lg max-h-96 overflow-auto">
          {results.map((r, index) => (
            <button
              key={r.id}
              className={`block w-full text-left px-3 py-2 text-sm text-zinc-200 transition-colors ${
                index === selectedIndex ? 'bg-zinc-800' : 'hover:bg-zinc-900'
              }`}
              onClick={() => handleResultClick(r.url)}
            >
              {r.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 