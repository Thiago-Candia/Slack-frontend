import React, { createContext, useState, useContext } from "react"
import { ChannelContext } from "./ChannelContext"
import { useApiRequest } from "../hooks/useApiRequest"
import { useParams } from "react-router-dom"
import { channelService } from "../services/channel.service"

export const CreateChannel = createContext()

export const CreateChannelContextProvider = ({ children }) => {

    const [isCreatingChannel, setIsCreatingChannel] = useState(false)
    const { workspace_id } = useParams()
    const [error, setError] = useState(null)
    const { channels, setChannels } = useContext(ChannelContext)
    const { execute: createChannelRequest } = useApiRequest(channelService.create, { throwOnError: true })

    const createChannel = async (channel_name) => {
        setIsCreatingChannel(true)
        setError(null)

        try {
            const response = await createChannelRequest(workspace_id, channel_name)

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
