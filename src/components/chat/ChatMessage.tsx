import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, timestamp }) => {
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        flex max-w-[80%] 
        ${isUser 
          ? 'bg-purple-600 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg' 
          : 'bg-slate-800 text-slate-100 rounded-tr-lg rounded-br-lg rounded-bl-lg'
        }
      `}>
        <div className={`
          p-2 flex items-start
          ${isUser ? 'order-2' : 'order-1'}
        `}>
          {isUser ? (
            <User size={18} className="text-purple-300" />
          ) : (
            <Bot size={18} className="text-green-400" />
          )}
        </div>
        <div className="p-3">
          <p className="text-sm">{message}</p>
          <p className="text-xs text-slate-400 mt-1">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;