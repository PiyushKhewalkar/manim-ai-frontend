import axios from "axios";

const BASE_URL = "https://manim-ai-backend.onrender.com"

export const getAllVideos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/video`);
        return response.data.videos;
    } catch (error) {
        console.error("Error getting videos:", error);
        throw error;
    }
}

export const launchVideo = async (name) => {
    try {
        const response = await axios.post(`${BASE_URL}/video/launch`, { name });
        return response.data;
    } catch (error) {
        console.error("Error launching video:", error);
        throw error;
    }
}

export const getVideoById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/video/${id}`);
        return response.data.video;
    } catch (error) {
        console.error("Error getting video:", error);
        throw error;
    }
}

export const generateScene = async (videoId, userPrompt) => {
    try {
        const response = await axios.post(`${BASE_URL}/scene/generate/${videoId}`, { userPrompt });
        return response.data;
    } catch (error) {
        console.error("Error generating scene:", error);
        throw error;
    }
}

export const regenerateScene = async (sceneId, videoId, userPrompt) => {
    try {
        const response = await axios.post(`${BASE_URL}/scene/regenerate/${sceneId}/${videoId}`, { userPrompt });
        return response.data;
    } catch (error) {
        console.error("Error regenerating scene:", error);
        throw error;
    }
}

export const produceVideo = async (videoId) => {
    try {
        const response = await axios.get(`${BASE_URL}/video/produce/${videoId}`);
        return response.data;
    } catch (error) {
        console.error("Error producing video:", error);
        throw error;
    }
}