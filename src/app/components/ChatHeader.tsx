export function ChatHeader() {
  return (
    <div className="flex flex-row items-center justify-between w-full -mt-4">
      <div className='flex flex-row items-center space-x-3'>
        <i className="nes-icon star is-medium"></i>
        <h1 className='pt-2'>
          8-bit Chat
        </h1>
      </div>
      <a href="https://github.com/rafaelfagundes/8-bit-chat" target="_blank" rel="noreferrer">
        <i className="nes-icon github is-medium"></i>
      </a>
    </div>
  )
}
