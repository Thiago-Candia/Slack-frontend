import React, { createContext, useContext, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { useParams } from "react-router-dom";
import { channelService, directMessageService } from "../services";

export const MessageSendContext = createContext();

export const MessageSendContextProvider = ({ children }) => {
    const { channel_id, user_id } = useParams()
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)
    const { execute: sendMessageRequest } = useApiRequest(channelService.sendMessage, { throwOnError: true })
    const { execute: sendDirectMessageRequest } = useApiRequest(directMessageService.send, { throwOnError: true })

    const sendMessage = async (newMessage) => {
        setIsSending(true)
        setError(null)

        try {
            if (user_id) {
                const response = await sendDirectMessageRequest(user_id, newMessage)
                return response?.payload?.new_message || null
            }

            if(!channel_id) {
                setError("No hay una conversación seleccionada.")
                return null
            }

            const response = await sendMessageRequest(channel_id, newMessage)
            return response?.payload?.new_message || null
        } 
        catch (error) {
            setError(error.message)
            return null
        } 
        finally {
            setIsSending(false)
        }
    }

    return (
        <MessageSendContext.Provider value={{ sendMessage, isSending, error }}>
            {children}
        </MessageSendContext.Provider>
    )
}

export const useSendMessage = () => {
    return useContext(MessageSendContext)
}
