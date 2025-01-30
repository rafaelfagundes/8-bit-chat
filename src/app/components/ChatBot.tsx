"use client";
import React, { useEffect, useRef, useState } from 'react'
import { ChatOptions } from './ChatOptions';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { ChatMessageList, Message } from './ChatMessageList';
import { ChatEmpty } from './ChatEmpty';

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const setQuestion = (question: string) => {
    handleSubmit(null, question);
  }

  const handleSubmit = async (e: React.FormEvent | KeyboardEvent | null, question?: string) => {
    if (e) {
      e.preventDefault();
    }

    const finalInput = question || input;

    if (!finalInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: finalInput,
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
        body: JSON.stringify({ message: finalInput }),
      });
      setIsLoading(false);

      if (!response.body) throw new Error('No response body');

      if (response.status === 413) {
        setMessages(prev => prev.map(msg =>
          msg.id === botMessage.id
            ? { ...msg, content: 'Error: Message too long' }
            : msg
        ));
        return;
      }

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
    <div className=''>
      <div className='hidden sm:block w-screen h-screen'>
        {/* <div className='max-w-5xl text-black max-h-screen bg-gray-200' */}
        <div className='flex flex-col text-black justify-center items-center h-full'
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.5s',
            margin: '0 auto',
          }}
        >
          <div className='nes-container is-rounded bg-gray-200 h-full flex flex-col justify-between max-h-[95vh] max-w-[1000px] w-full'>
            {showOptions &&
              (
                <div>
                  <ChatHeader />
                  <div className="h-12"></div>
                  <ChatOptions
                    scale={scale}
                    setScale={setScale}
                    setShowOptions={setShowOptions}
                  />
                </div>
              )}
            {!showOptions && <ChatHeader />}
            {messages.length === 0 && !showOptions && <ChatEmpty setQuestion={setQuestion} />}
            {!showOptions && <>
              {messages.length > 0 && <ChatMessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} showCopy={showCopy} handleClearMessages={handleClearMessages} />}
              <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} setShowOptions={setShowOptions} showOptions={showOptions} />
            </>
            }
          </div>
        </div>
      </div>
      <div className="block sm:hidden bg-gray-200 w-screen h-screen">
        <div className='flex flex-col text-black bg-gray-200 justify-between h-full'>
          <ChatHeader />
          {messages.length === 0 && !showOptions && <ChatEmpty setQuestion={setQuestion} />}
          {!showOptions && <>
            {messages.length > 0 && <ChatMessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} showCopy={showCopy} handleClearMessages={handleClearMessages} />}
            <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} setShowOptions={setShowOptions} showOptions={showOptions} />
          </>
          }
        </div>
      </div>
    </div>
  )
}

export default ChatBot
