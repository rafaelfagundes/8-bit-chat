"use client";
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);
  const [showOptions, setShowOptions] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleClearMessages = () => {
    setMessages([]);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.metaKey) {
        handleSubmit(e);
      }
      else if (e.key === 'Enter' && e.ctrlKey) {
        handleSubmit(e);
      }
      else if (e.key === 'Escape') {
        setShowOptions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });


  const handleSubmit = async (e: React.FormEvent | KeyboardEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);

    // // Add initial bot message
    const botMessage: Message = {
      id: Date.now() + 1,
      content: '',
      isBot: true
    };

    setMessages(prev => [...prev, botMessage]);
    try {
      setIsLoading(true);
      setShowCopy(false);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      setIsLoading(false);

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          const message = line.replace('data: ', '');
          if (message === '[DONE]') {
            setShowCopy(true);
            break;
          }

          try {
            const parsed = JSON.parse(message);

            setMessages(prev => prev.map(msg =>
              msg.id === botMessage.id
                ? { ...msg, content: msg.content + parsed.content }
                : msg
            ));
          } catch (err) {
            console.error('Error parsing message:', err);
          }
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setMessages(prev => prev.map(msg =>
        msg.id === botMessage.id
          ? { ...msg, content: 'Error: Unable to get response' }
          : msg
      ));
    }

    setInput('');
  };

  return (
    <div className='nes-container is-rounded bg-white max-w-4xl text-black w-full'
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        transition: 'transform 0.5s',
        margin: '0 auto',
      }}
    >
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
      {showOptions && <div className="nes-container with-title is-rounded">
        <h1 className="title">OPTIONS</h1>
        <div className='nes-container with-title mt-8'>
          <p className="title">Window Size</p>
          <div className='flex flex-row space-x-4'>
            <button className={`nes-btn ${scale === 0.5 ? "is-success" : "is-secondary"}`} onClick={() => setScale(0.5)}>Small</button>
            <button className={`nes-btn ${scale === 0.75 ? "is-success" : "is-secondary"}`} onClick={() => setScale(0.75)}>Default</button>
            <button className={`nes-btn ${scale === 1 ? "is-success" : "is-secondary"}`} onClick={() => setScale(1)}>Large</button>
          </div>
        </div>
        <hr className='h-1 bg-black my-4' />
        <div className='flex flex-row justify-end'>
          <button className="nes-btn is-primary" onClick={() => setShowOptions(false)}>Close</button>
        </div>

      </div>}
      {!showOptions && <>
        <div>
          <section className="message-list overflow-y-scroll min-h-[65vh] max-h-[85vh] pb-8 ">
            {messages.map((message) => {
              if (message.isBot) {
                return <BotMessage showCopy={showCopy} key={message.id} content={message.content} />;
              }
              else {
                return <UserMessage key={message.id} content={message.content} />;
              }
            })}
            {isLoading ? <section className="message -left">
              <div className="nes-balloon from-left">
                <p className="animate-bounce">...</p>
              </div>
            </section> : <></>}
            <div ref={messagesEndRef} />
            {messages.length > 0 && <div className="flex flex-row items-center justify-center">
              <div className="mt-8 space-x-3 cursor-pointer" onClick={handleClearMessages}>
                <i className="nes-icon close is-small"></i>
                <span className="nes-text">Clear Messages</span>
              </div>
            </div>}
          </section>
        </div>

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
      </>
      }
    </div>
  )
}


function UserMessage({ content }: { content: string }) {
  if (!content) return null;
  return (
    <section className="message flex flex-row w-full justify-end">
      <div className="nes-balloon from-right bg-blue-200 before:bg-blue-200 after:bg-blue-200 max-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </section>
  );
}


function BotMessage({ content, showCopy = false }: { content: string, showCopy: boolean }) {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard:', text);
    }, (err) => {
      console.error('Error copying text to clipboard:', err);
    });
  }

  if (!content) return null;
  return (
    <section className="message -left">
      <div className="nes-balloon from-left max-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={`${showCopy ? "mb-8" : ""}`}>{content}</ReactMarkdown>
        {showCopy && <button type="submit" className="nes-btn is-success absolute right-0 bottom-1 text-xs" onClick={() => copyText(content)}>Copy</button>}
      </div>
    </section>
  );
}

export default ChatBot
