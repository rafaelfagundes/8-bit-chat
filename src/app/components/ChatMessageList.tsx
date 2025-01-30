import { useEffect, useRef } from "react";
import { BotMessage } from "./BotMessage";
import { ClearMessagesButton } from "./ClearMessagesButton";
import { LoadingBaloon } from "./LoadingBaloon";
import { UserMessage } from "./UserMessage";

export interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  showCopy: boolean;
  handleClearMessages: () => void;
}

export function ChatMessageList({
  messages,
  isLoading,
  showCopy,
  handleClearMessages,
}: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="message-list overflow-y-scroll flex flex-col h-full px-1">
      {messages.map((message) => {
        if (message.isBot) {
          return (
            <BotMessage
              showCopy={showCopy}
              key={message.id}
              content={message.content}
            />
          );
        } else {
          return <UserMessage key={message.id} content={message.content} />;
        }
      })}
      {isLoading && <LoadingBaloon />}
      <div ref={messagesEndRef} />
      {messages.length > 0 && (
        <ClearMessagesButton handleClearMessages={handleClearMessages} />
      )}
    </section>
  );
}
