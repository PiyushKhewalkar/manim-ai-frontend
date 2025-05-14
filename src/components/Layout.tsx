import React, { useState } from 'react';
import ChatInterface from './chat/ChatInterface';
import VideoPlayer from './video/VideoPlayer';
import { useAnimation } from '../context/AnimationContext';
import { Plus } from 'lucide-react';

const Layout: React.FC = () => {
  const { videoId, createNewVideo } = useAnimation();
  const [showNameInput, setShowNameInput] = useState(false);
  const [videoName, setVideoName] = useState('');

  const handleCreateVideo = () => {
    if (videoName.trim()) {
      createNewVideo(videoName);
      setShowNameInput(false);
      setVideoName('');
    }
  };

  if (!videoId) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          {showNameInput ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center">Create New Video</h2>
              <input
                type="text"
                value={videoName}
                onChange={(e) => setVideoName(e.target.value)}
                placeholder="Enter video name..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleCreateVideo}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNameInput(false)}
                  className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNameInput(true)}
              className="w-full p-6 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700 hover:border-purple-500 transition-colors flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                <Plus size={32} />
              </div>
              <span className="text-lg font-medium">Create New Video</span>
              <p className="text-sm text-slate-400 text-center">
                Start by creating a new video project
              </p>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-slate-100">
      <div className="w-full md:w-[30%] border-r border-slate-700">
        <ChatInterface />
      </div>
      <div className="w-full md:w-[70%] flex flex-col">
        <VideoPlayer />
      </div>
    </div>
  );
};

export default Layout;