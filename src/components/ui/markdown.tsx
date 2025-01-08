import MarkdownPreview from "@uiw/react-markdown-preview";

export default function AppMarkdownViewer({ value }: { value: string }) {
  return (
    <MarkdownPreview
      source={value}
      style={{
        background: "var(--background)",
        color: "var(--primary-foreground)",
      }}
      components={{
        code: () => {
          return <></>;
        },
        ul: ({ children }) => {
          return <ul className="list-disc">{children}</ul>;
        },
        ol: ({ children }) => {
          return <ol className="list-decimal">{children}</ol>;
        },
        li: ({ children }) => {
          return <li>{children}</li>;
        },
        h1: ({ children }) => {
          return <h1 className="text-2xl font-bold">{children}</h1>;
        },
        h2: ({ children }) => {
          return <h2 className="text-xl font-bold">{children}</h2>;
        },
        h3: ({ children }) => {
          return <h3 className="text-lg font-bold">{children}</h3>;
        },
        h4: ({ children }) => {
          return <h4 className="text-base font-bold">{children}</h4>;
        },
        h5: ({ children }) => {
          return <h5 className="text-sm font-bold">{children}</h5>;
        },
      }}
    />
  );
}
