import React, { createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ENVIROMENT from "../config/enviroment"
import { useApiRequest } from "../hooks/useApiRequest"

export const ChannelContext = createContext()

const ChannelContextProvider = ({ children }) => {

    const { workspace_id } = useParams()

    const [channels, setChannels] = useState(() => {
        const savedChannels = localStorage.getItem(`channels_${workspace_id}`);
        return savedChannels ? JSON.parse(savedChannels) : []
    })

    const [loading, setLoading] = useState(true)
    const { responseApiState, getRequest } = useApiRequest(`${ENVIROMENT.URL_API}/api/channels/${workspace_id}/channels`)

    useEffect(() => {
        const fetchWorkspaceChannels = async () => {
            const token = localStorage.getItem("authorization_token");
            await getRequest({
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }
        fetchWorkspaceChannels()
    }, [workspace_id]) 


    useEffect(() => {
        if (responseApiState.data && responseApiState.data.payload) {
            const savedChannels = responseApiState.data.payload.channels;
            setChannels(savedChannels)
            localStorage.setItem(`channels_${workspace_id}`, JSON.stringify(savedChannels))
        }
    }, [responseApiState.data])

    return (
        <ChannelContext.Provider value={{ channels, setChannels, loading}}>
            {children}
        </ChannelContext.Provider>
    )
}


export default ChannelContextProvider




