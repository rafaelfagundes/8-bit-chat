interface ClearMessagesButtonProps {
  handleClearMessages: () => void;
}

export function ClearMessagesButton({ handleClearMessages }: ClearMessagesButtonProps) {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="mt-8 space-x-3 cursor-pointer" onClick={handleClearMessages}>
        <i className="nes-icon close is-small"></i>
        <span className="nes-text">Clear Messages</span>
      </div>
    </div>
  )
}
