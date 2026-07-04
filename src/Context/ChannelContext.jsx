import React, { createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useApiRequest } from "../hooks/useApiRequest"
import { channelService } from "../services/channel.service"

export const ChannelContext = createContext()

const ChannelContextProvider = ({ children }) => {

    const { workspace_id } = useParams()

    const [channels, setChannels] = useState(() => {
        const savedChannels = localStorage.getItem(`channels_${workspace_id}`);
        return savedChannels ? JSON.parse(savedChannels) : []
    })

    const [loading, setLoading] = useState(true)
    const { responseApiState, execute: getChannels } = useApiRequest(channelService.getByWorkspace)

    useEffect(() => {
        const fetchWorkspaceChannels = async () => {
            setLoading(true)
            await getChannels(workspace_id)
            setLoading(false)
        }
        fetchWorkspaceChannels()
    }, [workspace_id, getChannels]) 


    useEffect(() => {
        if (responseApiState.data && responseApiState.data.payload) {
            const savedChannels = responseApiState.data.payload.channels;
            setChannels(savedChannels)
            localStorage.setItem(`channels_${workspace_id}`, JSON.stringify(savedChannels))
        }
    }, [responseApiState.data, workspace_id])

    return (
        <ChannelContext.Provider value={{ channels, setChannels, loading}}>
            {children}
        </ChannelContext.Provider>
    )
}


export default ChannelContextProvider




