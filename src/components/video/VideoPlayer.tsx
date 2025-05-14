import React from 'react';
import { useAnimation } from '../../context/AnimationContext';
import { Play, FastForward, Rewind, Pause, Plus } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const { 
    currentVideo, 
    isLoading, 
    scenes, 
    currentSceneIndex,
    addNewScene,
    videoId 
  } = useAnimation();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDownload = () => {
    if (!currentVideo) return;
    const link = document.createElement('a');
    link.href = currentVideo;
    link.setAttribute('download', 'manim-animation.mp4');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className='flex justify-between items-center mb-4'>
        <div className="">
          <h2 className="text-xl font-medium">Manim Animation</h2>
          <p className="text-sm text-slate-400">Generated animation will appear here</p>
        </div>
        <div className="space-x-3">
          {videoId && (
            <button 
              onClick={addNewScene}
              className='px-4 py-2 text-white font-bold bg-purple-600 hover:bg-purple-700 rounded-md transition-colors'
            >
              Add Scene
            </button>
          )}
          <button 
            onClick={handleDownload}
            className='px-4 py-2 text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-md transition-colors'
            disabled={!currentVideo}
          >
            Export
          </button>
        </div>
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
            className="max-h-full max-w-full aspect-video scale-100 lg:scale-125" 
            src={currentVideo} 
            controls={false}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
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
        <div className="mt-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full"
            />
            <div className="flex justify-between w-full text-sm text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
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

          {scenes.length > 0 && (
            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-lg font-medium mb-3">Scenes</h3>
              <div className="grid grid-cols-4 gap-3">
                {scenes.map((scene, index) => (
                  <div
                    key={scene.sceneId}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 ${
                      index === currentSceneIndex
                        ? 'border-purple-500'
                        : 'border-transparent'
                    }`}
                  >
                    <video
                      src={scene.fileUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;