interface ChatOptionsProps {
  scale: number;
  setScale: (scale: number) => void;
  setShowOptions: (showOptions: boolean) => void;
}

export function ChatOptions({
  scale,
  setScale,
  setShowOptions,
}: ChatOptionsProps) {
  return (
    <div className="flex flex-col h-full justify-between w-full pt-8 pb-[72px]">
      <div className="w-full h-full overflow-y-scroll overflow-x-hidden pr-2">
        <div className="nes-container with-title is-rounded bg-white w-full">
          <h1 className="title uppercase">options</h1>
          <div className="nes-container with-title bg-gray-100">
            <p className="title">Window Size</p>
            <div className="flex flex-row space-x-4">
              <button
                className={`nes-btn ${
                  scale === 0.5 ? "is-success" : "is-secondary"
                }`}
                onClick={() => setScale(0.5)}
              >
                Tiny
              </button>
              <button
                className={`nes-btn ${
                  scale === 0.75 ? "is-success" : "is-secondary"
                }`}
                onClick={() => setScale(0.75)}
              >
                Small
              </button>
              <button
                className={`nes-btn ${
                  scale === 1 ? "is-success" : "is-secondary"
                }`}
                onClick={() => setScale(1)}
              >
                Default
              </button>
            </div>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="nes-container with-title is-rounded bg-white w-full">
          <h1 className="title uppercase">acknowledgements</h1>
          <div className="lists">
            <ul className="nes-list is-circle">
              <li className="nes-text is-primary">
                <a href="https://nostalgic-css.github.io/NES.css/">
                  NES.css Framework
                </a>
              </li>
              <li className="nes-text is-primary">
                <a href="https://fonts.google.com/specimen/Press+Start+2P">
                  Press Start 2P Font
                </a>
              </li>
              <li className="nes-text is-primary">
                <a href="https://www.vecteezy.com/free-vector/game">
                  Game Vectors by Vecteezy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="nes-container with-title is-rounded bg-white w-full">
          <h1 className="title uppercase">about</h1>
          <p className="nes-text">
            8-bit Chat is a fun retro-styled chat powered by AI. Built with
            React and TypeScript, it showcases a classic gaming look using
            NES.css and custom fonts, allowing users to converse in an
            old-school interface.
            <br />
            <br />
            Created by{" "}
            <a
              className="nes-text is-primary"
              href="https://www.rafaelfagundes.com"
            >
              Rafael Fagundes
            </a>
            .
          </p>
        </div>
      </div>
      <div className="w-full self-end">
        <hr className="h-1 bg-black my-4 w-full" />
        <div className="flex flex-row justify-end w-full">
          <button
            className="nes-btn is-primary"
            onClick={() => setShowOptions(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
