import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";
import { useApiRequest } from "../hooks/useApiRequest";
import { directMessageService } from "../services/directMessage.service";

export const DirectMessageContext = createContext();

const DirectMessageProvider = ({ children }) => {

    const { user_id } = useParams()
    const { user } = useContext(ProfileContext)
    const [messages, setMessages] = useState([])

    const { responseApiState, execute: getDirectMessages } = useApiRequest(directMessageService.getByUser)
    const { execute: sendDirectMessageRequest } = useApiRequest(directMessageService.send)

    useEffect(() => {
        if (!user_id) return
        const fetchMessages = async () => {
            await getDirectMessages(user_id)
        }
        fetchMessages()
    }, [user_id, getDirectMessages])

    useEffect(() => {
        if (responseApiState.data?.payload?.messages) {
            setMessages(responseApiState.data.payload.messages)
        }
    }, [responseApiState.data])

    const sendDirectMessage = async (content) => {
        if (!user_id || !content) return
        await sendDirectMessageRequest(user_id, content)
        setMessages((prev) => [...prev, { sender: user._id, receiver: user_id, content }])
    }

    return (
        <DirectMessageContext.Provider value={{ messages, sendDirectMessage }}>
            {children}
        </DirectMessageContext.Provider>
    )
}

export default DirectMessageProvider
