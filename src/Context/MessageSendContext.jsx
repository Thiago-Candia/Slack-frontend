import React, { createContext, useContext, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { useParams } from "react-router-dom";
import { channelService } from "../services/channel.service";

export const MessageSendContext = createContext();

export const MessageSendContextProvider = ({ children }) => {

    const { channel_id } = useParams()
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)
    const { execute: sendMessageRequest } = useApiRequest(channelService.sendMessage, { throwOnError: true })

const sendMessage = async (new_message) => {
        setIsSending(true)
        setError(null)
        console.log("Enviando mensaje:", channel_id)
        if(!channel_id) {
            console.log("No se proporcionó un channel_id válido.")
            return
        }
        try {
            const response = await sendMessageRequest(channel_id, new_message)
            if (response?.payload?.new_message) {
                return response.payload.new_message
            }
        } 
        catch (error) {
            console.error("Error enviando mensaje:", error)
            setError(error.message)
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



