interface ChatInputProps {
  input: string;
  setInput: (s: string) => void;
  handleSubmit: (e: React.FormEvent | KeyboardEvent) => void;
  showOptions: boolean;
  setShowOptions: (b: boolean) => void;
}

export function ChatInput({
  input,
  setInput,
  handleSubmit,
  showOptions,
  setShowOptions
}: ChatInputProps) {
  return (
    <div className="w-full px-2 pt-1">
      <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-x-4">
        <div className='w-full'>
          <textarea id="textareaField" className="nes-textarea h-28 text-sm" placeholder="Enter your message here... " value={input} onChange={(e) => setInput(e.target.value)} ></textarea>
        </div>
        <div className='flex flex-col space-y-4'>
          <button type="submit" className="nes-btn is-primary mb-6 sm:mb-0 text-sm">Send</button>
          <button type="submit" className="nes-btn is-secondary hidden sm:block text-sm" onClick={() => setShowOptions(!showOptions)}>Options</button>
        </div>
      </form>
      <p className='nes-text is-primary text-xs mt-2 ml-1 hidden sm:block'>
        Send with Cmd+Enter or Ctrl+Enter
      </p>
    </div>
  )
}
