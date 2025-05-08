import React from 'react';
import ChatInterface from './chat/ChatInterface';
import VideoPlayer from './video/VideoPlayer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-slate-100">
      {/* Chat Interface - Left Side (30%) */}
      <div className="w-full md:w-[30%] border-r border-slate-700">
        <ChatInterface />
      </div>

      {/* Video Player - Right Side (70%) */}

      <div className="w-full md:w-[100%] flex flex-col">
        <VideoPlayer />
      </div>
    </div>
  );
};

export default Layout;