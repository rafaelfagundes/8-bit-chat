import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LoadingBaloon } from "./LoadingBaloon";
import { useState } from "react";

export function BotMessage({ content, showCopy = false }: { content: string, showCopy: boolean }) {
  const [showThinking, setShowThinking] = useState(false);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard:', text);
    }, (err) => {
      console.error('Error copying text to clipboard:', err);
    });
  }

  const extractThinking = (content: string) => {
    const startThinking = content.includes("<think>");
    const endThinking = content.includes("</think>");

    if (startThinking && endThinking) {
      const thinking = content.substring(content.indexOf("<think>") + 7, content.indexOf("</think>"));
      const newContent = content.replace(`<think>${thinking}</think>`, '');
      return { thinking, newContent };
    }

    return { thinking: '', newContent: content };
  }

  if (!content) return null;

  const startThinking = content.includes("<think>");
  const endThinking = content.includes("</think>");

  if (startThinking && !endThinking) {
    return <LoadingBaloon message="Thinking..." />;
  }

  const { thinking, newContent } = extractThinking(content);

  return (
    <section className="message -left max-w-[95%]">
      <div className="nes-balloon from-left max-w-full">
        {thinking !== "" && (
          <>
            {!showThinking && <button className="nes-btn is-warning w-60 text-xs" onClick={() => setShowThinking(true)}>Show Thinking</button>}
            {showThinking && <div className="nes-container is-rounded bg-gray-200">
              <button className="nes-btn is-warning w-60 text-xs" onClick={() => setShowThinking(false)}>Hide Thinking</button>
              <ReactMarkdown className="pt-4" remarkPlugins={[remarkGfm]}>{thinking}</ReactMarkdown>
            </div>}
            <div className="h-6"></div>
          </>
        )}

        <ReactMarkdown remarkPlugins={[remarkGfm]} className={`${showCopy ? "mb-10" : ""}`}>{newContent}</ReactMarkdown>
        {showCopy && <button type="submit" className="nes-btn is-success absolute -right-2 -bottom-1 text-xs" onClick={() => copyText(newContent)}>Copy</button>}
      </div>
    </section>
  );
}

