import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function UserMessage({ content }: { content: string }) {
  if (!content) return null;
  return (
    <section className="message flex flex-row w-full justify-end max-w-[95%]">
      <div className="nes-balloon from-right bg-blue-200 before:bg-blue-200 after:bg-blue-200 max-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </section>
  );
}
