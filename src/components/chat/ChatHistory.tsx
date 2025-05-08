import React from 'react';
import ChatMessage from './ChatMessage';
import { useAnimation } from '../../context/AnimationContext';

const ChatHistory: React.FC = () => {
  const { messages } = useAnimation();
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Delay scroll until after DOM updates
    const timeout = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto px-4 py-6 space-y-6">
      {messages.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          <p className="mb-2 text-lg">Welcome to Manim AI Animator</p>
          <p className="text-sm max-w-xs mx-auto">
            Describe the math animation you want to create, and I'll generate it for you.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        ))
      )}
      <div ref={chatEndRef} />
    </div>
  );
};


export default ChatHistory;