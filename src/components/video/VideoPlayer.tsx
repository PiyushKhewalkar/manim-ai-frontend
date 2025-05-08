import React from 'react';
import { useAnimation } from '../../context/AnimationContext';
import { Play, FastForward, Rewind, Pause } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const { currentVideo, isLoading } = useAnimation();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="mb-4">
        <h2 className="text-xl font-medium">Manim Animation</h2>
        <p className="text-sm text-slate-400">Generated animation will appear here</p>
      </div>

      <div className="flex-grow flex items-center justify-center bg-slate-800 rounded-lg overflow-hidden relative md:min-h-[75vh]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-slate-600 border-t-purple-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Generating animation...</p>
          </div>
        ) : currentVideo ? (
          <video 
            ref={videoRef}
            className="max-h-full max-w-full aspect-video" 
            src={currentVideo} 
            controls={false}
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <div className="text-center p-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center">
              <Play size={40} className="text-slate-500 ml-2" />
            </div>
            <p className="text-slate-400 max-w-md">
              Enter a prompt in the chat to generate a Manim animation.
            </p>
          </div>
        )}
      </div>

      {currentVideo && (
        <div className="mt-4 flex justify-center space-x-4">
          <button 
            onClick={handleRewind}
            className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <Rewind size={20} />
          </button>
          <button 
            onClick={handlePlayPause}
            className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            onClick={handleFastForward}
            className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <FastForward size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;