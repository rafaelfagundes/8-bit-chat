interface ChatOptionsProps {
  scale: number;
  setScale: (scale: number) => void;
  setShowOptions: (showOptions: boolean) => void;
}

export function ChatOptions({ scale, setScale, setShowOptions }: ChatOptionsProps) {
  return (
    <div className="nes-container with-title is-rounded bg-white">
      <h1 className="title">OPTIONS</h1>
      <div className='nes-container with-title mt-8 bg-gray-100'>
        <p className="title">Window Size</p>
        <div className='flex flex-row space-x-4'>
          <button className={`nes-btn ${scale === 0.5 ? "is-success" : "is-secondary"}`} onClick={() => setScale(0.5)}>Small</button>
          <button className={`nes-btn ${scale === 1 ? "is-success" : "is-secondary"}`} onClick={() => setScale(1)}>Default</button>
          <button className={`nes-btn ${scale === 1.5 ? "is-success" : "is-secondary"}`} onClick={() => setScale(1.5)}>Large</button>
        </div>
      </div>
      <hr className='h-1 bg-black my-4' />
      <div className='flex flex-row justify-end'>
        <button className="nes-btn is-primary" onClick={() => setShowOptions(false)}>Close</button>
      </div>
    </div>
  )
}
