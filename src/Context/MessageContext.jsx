import React, { createContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useApiRequest } from "../hooks/useApiRequest"
import ENVIROMENT from "../config/enviroment"
import { useSendMessage } from "./MessageSendContext"

export const MessageContext = createContext()

const MessageContextProvider = ({ children }) => {

    const { channel_id } = useParams()
    const [messages, setMessages] = useState([])

    const { responseApiState, getRequest} = useApiRequest(
        `${ENVIROMENT.URL_API}/api/channels/${channel_id}/messages`
    )


    useEffect(() => {
        const fetchMessages = async () => {
            if (channel_id) {
                const token = localStorage.getItem("authorization_token");
                await getRequest({
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
        }
        fetchMessages()
    }, [channel_id])

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