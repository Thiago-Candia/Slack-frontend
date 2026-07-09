import React, { createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useApiRequest } from "../hooks/useApiRequest"
import { channelService } from "../services/channel.service"

export const ChannelContext = createContext()

const getStoredChannels = (workspaceId) => {
    if (!workspaceId) {
        return []
    }

    try {
        const savedChannels = localStorage.getItem(`channels_${workspaceId}`)
        return savedChannels ? JSON.parse(savedChannels) : []
    }
    catch {
        return []
    }
}

const ChannelContextProvider = ({ children }) => {
    const { workspace_id } = useParams()
    const [channels, setChannels] = useState(() => getStoredChannels(workspace_id))
    const [loading, setLoading] = useState(Boolean(workspace_id))
    const { responseApiState, execute: getChannels } = useApiRequest(channelService.getByWorkspace)

    useEffect(() => {
        const fetchWorkspaceChannels = async () => {
            if (!workspace_id) {
                setChannels([])
                setLoading(false)
                return
            }

            setLoading(true)
            await getChannels(workspace_id)
            setLoading(false)
        }

        fetchWorkspaceChannels()
    }, [workspace_id, getChannels])

    useEffect(() => {
        if (responseApiState.data?.payload?.channels) {
            const nextChannels = responseApiState.data.payload.channels
            setChannels(nextChannels)
            localStorage.setItem(`channels_${workspace_id}`, JSON.stringify(nextChannels))
        }
    }, [responseApiState.data, workspace_id])

    return (
        <ChannelContext.Provider value={{
            channels,
            setChannels,
            loading,
            error: responseApiState.error?.message || null
        }}>
            {children}
        </ChannelContext.Provider>
    )
}

export default ChannelContextProvider
