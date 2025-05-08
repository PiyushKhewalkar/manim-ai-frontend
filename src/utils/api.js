import axios from "axios";

const BASE_URL = "http://localhost:5500"

export const getAllScenes = async() => {
    try {
        const scenes = await axios.get(`${BASE_URL}/scene`)

        console.log(scenes.data)

        return scenes.data

    } catch (error) {
        console.error("Error getting Scenes: ", error)
    }
}

export const getScene = async(id) => {
    try {
        const scene = await axios.get(`${BASE_URL}/scene/${id}`)

        console.log(scene)

        return scene

    } catch (error) {
        console.error("Error getting Scenes: ", error)
    }
}

export const generateScene = async(userPrompt) => {
    try {
        const scene = await axios.post(`${BASE_URL}/scene/generate`, {userPrompt: userPrompt})

        console.log(scene.data)

        return scene.data

    } catch (error) {
        console.error("Error getting Scenes: ", error)
    }
}

export const regenerateScene = async(id, userPrompt) => {
    try {
        const scene = await axios.put(`${BASE_URL}/scene/regenerate/${id}`, {userPrompt: userPrompt})

        console.log(scene.data)

        return scene.data

    } catch (error) {
        console.error("Error getting Scenes: ", error)
    }
}