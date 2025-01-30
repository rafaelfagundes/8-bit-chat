interface ClearMessagesButtonProps {
  handleClearMessages: () => void;
}

export function ClearMessagesButton({
  handleClearMessages,
}: ClearMessagesButtonProps) {
  return (
    <div className="flex flex-row items-center justify-center mb-10">
      <div className="mt-4 space-x-3 nes-pointer" onClick={handleClearMessages}>
        <i className="nes-icon close is-small"></i>
        <span className="nes-text text-xs">
          Clear Messages (Cmd+K or Ctrl+K)
        </span>
      </div>
    </div>
  );
}
