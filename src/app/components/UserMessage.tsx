import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function UserMessage({ content }: { content: string }) {
  if (!content) return null;
  return (
    <section className="flex flex-row justify-end w-full">
      <div className="nes-balloon from-right bg-blue-200 before:bg-blue-200 after:bg-blue-200 max-w-[95%]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </section>
  );
}
