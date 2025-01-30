export function ChatHeader() {
  return (
    <div className="p-2 px-3 sm:pb-4 sm:px-0 sm:pt-0 flex flex-row items-center justify-between w-full bg-gray-300 sm:bg-transparent border-b-4 border-black">
      <div className='flex flex-row items-center space-x-3'>
        <i className="nes-icon star is-medium"></i>
        <h1 className='pt-2 text-md text-xl sm:text-3xl'>
          8-bit Chat
        </h1>
      </div>
      <a href="https://github.com/rafaelfagundes/8-bit-chat" target="_blank" rel="noreferrer">
        <i className="nes-icon github is-medium top-1"></i>
      </a>
    </div>
  )
}
