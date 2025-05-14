import React, { createContext, useContext, useState } from 'react';
import { generateScene, regenerateScene, launchVideo } from '../utils/api';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Scene {
  order: number;
  sceneId: string;
  fileUrl: string;
}

interface AnimationContextType {
  messages: Message[];
  currentVideo: string | null;
  isLoading: boolean;
  videoId: string | null;
  scenes: Scene[];
  currentSceneIndex: number;
  sendMessage: (message: string) => Promise<void>;
  createNewVideo: (name: string) => Promise<void>;
  addNewScene: () => Promise<void>;
}

const AnimationContext = createContext<AnimationContextType>({
  messages: [],
  currentVideo: null,
  isLoading: false,
  videoId: null,
  scenes: [],
  currentSceneIndex: 0,
  sendMessage: async () => {},
  createNewVideo: async () => {},
  addNewScene: async () => {},
});

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const createNewVideo = async (name: string) => {
    try {
      const response = await launchVideo(name);
      setVideoId(response.newVideo._id);
      setScenes([]);
      setMessages([]);
      setCurrentVideo(null);
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  const addNewScene = async () => {
    if (!videoId) return;
    
    setMessages([]);
    setCurrentVideo(null);
    const newIndex = scenes.length;
    setCurrentSceneIndex(newIndex);
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!videoId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let response;
      const currentScene = scenes[currentSceneIndex];

      if (!currentScene) {
        response = await generateScene(videoId, content);
        const newScene: Scene = {
          order: scenes.length + 1,
          sceneId: response.newScene._id,
          fileUrl: response.fileUrl,
        };
        setScenes((prev) => [...prev, newScene]);
      } else {
        response = await regenerateScene(currentScene.sceneId, videoId, content);
        const updatedScenes = [...scenes];
        updatedScenes[currentSceneIndex] = {
          ...currentScene,
          fileUrl: response.fileUrl,
        };
        setScenes(updatedScenes);
      }

      const aiResponse: Message = {
        id: crypto.randomUUID(),
        content: currentScene 
          ? response.foundScene.chatHistory[response.foundScene.chatHistory.length - 1].assistant
          : response.newScene.chatHistory[response.newScene.chatHistory.length - 1].assistant,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setCurrentVideo(response.fileUrl);
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: `Error: ${error?.message || 'Something went wrong'}`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AnimationContextType = {
    messages,
    currentVideo,
    isLoading,
    videoId,
    scenes,
    currentSceneIndex,
    sendMessage,
    createNewVideo,
    addNewScene,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};