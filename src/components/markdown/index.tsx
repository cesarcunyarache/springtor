import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import { CodeBlock } from "./markdown-codeblock"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownView({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-full h-auto rounded-md" />,
        code: CodeBlock,
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        link: ({ children, href }) => (
          <a
            href={href}
            className="text-primary hover:text-primary/80 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3 mt-6 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold mb-3 mt-5 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-bold mb-2 mt-4 first:mt-0">{children}</h3>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-primary hover:text-primary/80 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground my-3 bg-muted/20 py-2 rounded-r">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3 rounded border border-border">
            <table className="min-w-full">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr className="border-b border-border last:border-b-0">{children}</tr>
        ),
        th: ({ children }) => <th className="px-3 py-2 text-left font-semibold">{children}</th>,
        td: ({ children }) => <td className="px-3 py-2">{children}</td>,
        hr: () => <hr className="my-6 border-t border-border/50" />
      }}
    >
      {content}
    </ReactMarkdown>
  )
}