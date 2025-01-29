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
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-row items-start justify-between space-x-4 mt-8">
        <div className='w-full'>
          <textarea id="textareaField" className="nes-textarea h-28" placeholder="Enter your message here... " value={input} onChange={(e) => setInput(e.target.value)} ></textarea>
        </div>
        <div className='flex flex-col space-y-4'>
          <button type="submit" className="nes-btn is-primary">Send</button>
          <button type="submit" className="nes-btn is-secondary" onClick={() => setShowOptions(!showOptions)}>Options</button>
        </div>
      </form>
      <p className='nes-text is-primary text-xs mt-2 ml-1'>
        Send with Cmd+Enter or Ctrl+Enter
      </p>
    </div>
  )
}
