import React,{ createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useApiRequest } from "../hooks/useApiRequest"
import { channelService } from "../services/channel.service"

export const MessageContext = createContext()

const MessageContextProvider = ({ children }) => {
    const { channel_id } = useParams()
    const [messages, setMessages] = useState([])
    const { responseApiState, execute: getMessages} = useApiRequest(channelService.getMessages)

    useEffect(() => {
        const fetchMessages = async () => {
            if (!channel_id) {
                setMessages([])
                return
            }

            await getMessages(channel_id)
        }

        fetchMessages()
    }, [channel_id, getMessages])

    useEffect(() => {
        if (responseApiState.data?.payload?.messages) {
            setMessages(responseApiState.data.payload.messages)
        }
    }, [responseApiState.data])

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    return (
        <MessageContext.Provider value={{
            messages,
            setMessages,
            addMessage,
            loading: responseApiState.loading,
            error: responseApiState.error?.message || null
        }}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider
