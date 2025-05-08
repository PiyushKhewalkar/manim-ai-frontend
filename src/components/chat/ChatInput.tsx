import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAnimation } from '../../context/AnimationContext';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [duration, setDuration] = useState(2);
  const { sendMessage, isLoading } = useAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-x-2">
      <div className='flex w-full justify-between space-x-5'>
      <div className="relative w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your animation..."
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-200 placeholder-slate-400"
          disabled={isLoading}
        />
      </div>

      <button 
        type="submit" 
        className={`p-3 rounded-lg ${isLoading ? 'bg-slate-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} transition-colors duration-200`}
        disabled={isLoading}
      >
        <Send size={20} className={isLoading ? 'text-slate-500' : 'text-white'} />
      </button>
      </div>
    </form>
  );
};

export default ChatInput;