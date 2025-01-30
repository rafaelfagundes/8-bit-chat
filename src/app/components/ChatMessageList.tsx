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
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  showCopy: boolean;
  handleClearMessages: () => void;
}


export function ChatMessageList({

  messages,
  isLoading,
  messagesEndRef,
  showCopy,
  handleClearMessages
}: ChatMessageListProps) {
  return (
    <div>
      <section className="message-list overflow-y-scroll  max-h-[85vh] pb-8">
        {messages.map((message) => {
          if (message.isBot) {
            return <BotMessage showCopy={showCopy} key={message.id} content={message.content} />;
          }
          else {
            return <UserMessage key={message.id} content={message.content} />;
          }
        })}
        {isLoading && <LoadingBaloon />}
        <div ref={messagesEndRef} />
        {messages.length > 0 && <ClearMessagesButton handleClearMessages={handleClearMessages} />}
      </section>
    </div>
  )
}
