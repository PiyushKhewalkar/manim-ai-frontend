import React from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { MessageSquare } from 'lucide-react';

const ChatInterface: React.FC = () => {
  return (
    <div className="flex flex-col h-screen"> {/* <--- Use h-screen to occupy full viewport */}
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center">
          <MessageSquare className="mr-2 text-purple-500" size={20} />
          <h1 className="text-lg font-medium">Animation Chat</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Describe the animation you want to create
        </p>
      </div>

      {/* Body: fills all remaining space */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* History: scrolls */}
        <ChatHistory />

        {/* Input */}
        <div className="border-t border-slate-700 p-4 bg-slate-800">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};


export default ChatInterface;
