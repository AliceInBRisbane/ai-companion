import { ChatRequestOptions } from 'ai';
import { ChangeEvent, ElementRef, FormEvent } from 'react';
import { Companion } from '@prisma/client';
import { ChatMessage, ChatMessageProps } from './chat-message';
import { useState, useEffect ,useRef} from 'react';

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const [ fakeLoading, setFakeLoading ] = useState(
    messages.length === 0 ? true : false
  );

  const ScrollRef = useRef<ElementRef<'div'>>(null)

  useEffect(() => {

    ScrollRef.current?.scrollIntoView({behavior: "smooth"})

  },[messages.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  }, [setFakeLoading, messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message)=>{
        return (
          <ChatMessage
            key={message.content}
            role={message.role}
            content={message.content}
            src={companion.src}
          />
        );
      })}
      {isLoading&&(
        <ChatMessage
          role="system"
          src={companion.src}
          isLoading
          
          />
        )}
        <div ref={ScrollRef} />
    </div>
  );
};
