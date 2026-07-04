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
            if (channel_id) {
                await getMessages(channel_id)
            }
        }
        fetchMessages()
    }, [channel_id, getMessages])

    useEffect(() => {
        if (responseApiState.data?.payload?.messages) {
            setMessages((prevState)=> [...responseApiState.data.payload.messages])
        }
    }, [responseApiState.data])

    const addMessage = (new_message) => {
        console.log("Nuevo mensaje agregado:", new_message)
        setMessages((prevMessages) => [...prevMessages, new_message])
        console.log("Mensajes actualizados:", messages)
    }

    return (
        <MessageContext.Provider value={{ messages, setMessages, addMessage}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider
