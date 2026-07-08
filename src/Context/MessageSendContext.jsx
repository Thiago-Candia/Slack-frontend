import React, { createContext, useContext, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { useParams } from "react-router-dom";
import { channelService } from "../services/channel.service";
import { directMessageService } from "../services/directMessage.service";

export const MessageSendContext = createContext();

export const MessageSendContextProvider = ({ children }) => {

    const { channel_id, user_id } = useParams()
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)
    const { execute: sendMessageRequest } = useApiRequest(channelService.sendMessage, { throwOnError: true })
    const { execute: sendDirectMessageRequest } = useApiRequest(directMessageService.send, { throwOnError: true })

    const sendMessage = async (new_message) => {
        setIsSending(true)
        setError(null)
        try {
            if (user_id) {
                const response = await sendDirectMessageRequest(user_id, new_message)
                return response?.payload?.new_message || response?.message || null
            }
            if(!channel_id) {
                setError("No hay una conversacion seleccionada.")
                return null
            }
            const response = await sendMessageRequest(channel_id, new_message)
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
