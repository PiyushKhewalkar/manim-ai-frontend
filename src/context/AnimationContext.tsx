import React, { createContext, useContext, useState } from 'react';
import { generateScene, regenerateScene } from '../utils/api.js';

// Message type definition
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Context type definition
interface AnimationContextType {
  messages: Message[];
  currentVideo: string | null;
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
}

// Create context with default values
const AnimationContext = createContext<AnimationContextType>({
  messages: [],
  currentVideo: null,
  isLoading: false,
  sendMessage: async () => {},
});

// Custom hook to use the animation context
export const useAnimation = () => useContext(AnimationContext);

// Provider component
export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sceneId, setSceneId] = useState<string | null>(null);

  const sendMessage = async (content: string): Promise<void> => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);

    try {
      let aiResponse: Message;
      let video;


      if (!sceneId) {
        // First message – generate a new scene
        video = await generateScene(userMessage.content);

        console.log("video", video)

        let recentChat = video.newScene.chatHistory[video.newScene.chatHistory.length - 1]

        console.log(video)
        aiResponse = {
          id: crypto.randomUUID(),
          content: recentChat.assistant,
          sender: 'ai',
          timestamp: new Date(),
        };
        setSceneId(video.newScene._id);
      } else {
        // Regenerate an existing scene
        video = await regenerateScene(sceneId, userMessage.content);

        console.log("video", video)
        
        let recentChat = video.foundScene.chatHistory[video.foundScene.chatHistory.length - 1]
        aiResponse = {
          id: crypto.randomUUID(),
          content: recentChat.assistant,
          sender: 'ai',
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setCurrentVideo(video.fileUrl);
    } catch (error: any) {
      console.error('Error generating animation:', error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: `Oops! Something went wrong. ${error?.message || 'Please try again later.'}`,
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
    sendMessage,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
