import React, { createContext, useState, useContext } from "react"
import { ChannelContext } from "./ChannelContext"
import { useApiRequest } from "../hooks/useApiRequest"
import ENVIROMENT from "../config/enviroment"
import { useParams } from "react-router-dom"

export const CreateChannel = createContext()

export const CreateChannelContextProvider = ({ children }) => {

    const [isCreatingChannel, setIsCreatingChannel] = useState(false)
    const { workspace_id } = useParams()
    const [error, setError] = useState(null)
    const { channels, setChannels } = useContext(ChannelContext)
    const { postRequest } = useApiRequest(ENVIROMENT.URL_API + `/api/channels/${workspace_id}`)

    const createChannel = async (channel_name) => {
        setIsCreatingChannel(true)
        setError(null)

        try {
            const token = localStorage.getItem("authorization_token");
            if (!token) {
                throw new Error("No hay token disponible");
            }

            const response = await postRequest({ name: channel_name }, token)

            if (response?.payload?.new_channel) {
                const updatedChannels = ([...channels, response.payload.new_channel])
                setChannels(updatedChannels)
                localStorage.setItem(`channels_${workspace_id}`, JSON.stringify(updatedChannels))
            }
        } 
        catch (error) {
            setError(error.message);
        } 
        finally {
            setIsCreatingChannel(false);
        }
    }

    return (
        <CreateChannel.Provider value={{ createChannel, isCreatingChannel, error }}>
            {children}
        </CreateChannel.Provider>
    )
}
