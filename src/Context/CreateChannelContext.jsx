import React, { createContext, useState, useContext } from "react"
import { ChannelContext } from "./ChannelContext"
import { useApiRequest } from "../hooks/useApiRequest"
import { useParams } from "react-router-dom"
import { channelService } from "../services"
import { getChannelsStorageKey, setStoredJson } from "../utils/storage.utils"

export const CreateChannel = createContext()

export const CreateChannelContextProvider = ({ children }) => {
    const [isCreatingChannel, setIsCreatingChannel] = useState(false)
    const { workspace_id } = useParams()
    const [error, setError] = useState(null)
    const { channels, setChannels } = useContext(ChannelContext)
    const { execute: createChannelRequest } = useApiRequest(channelService.create, { throwOnError: true })

    const createChannel = async (channelName) => {
        const normalizedName = channelName.trim()

        if (!normalizedName) {
            setError("Ingresa un nombre para el canal.")
            return null
        }

        setIsCreatingChannel(true)
        setError(null)

        try {
            const response = await createChannelRequest(workspace_id, normalizedName)

            if (response?.payload?.new_channel) {
                const updatedChannels = [...channels, response.payload.new_channel]
                setChannels(updatedChannels)
                setStoredJson(getChannelsStorageKey(workspace_id), updatedChannels)
            }

            return response
        } 
        catch (error) {
            setError(error.message)
            return null
        } 
        finally {
            setIsCreatingChannel(false)
        }
    }

    return (
        <CreateChannel.Provider value={{ createChannel, isCreatingChannel, error }}>
            {children}
        </CreateChannel.Provider>
    )
}
