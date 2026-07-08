import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";
import { useApiRequest } from "../hooks/useApiRequest";
import { directMessageService } from "../services/directMessage.service";
import { MessageContext } from "./MessageContext";
import { WorkspaceContext } from "./WorkspaceContext";

export const DirectMessageContext = createContext();

const DirectMessageProvider = ({ children }) => {

    const { user_id } = useParams()
    const { user } = useContext(ProfileContext)
    const { workspaces } = useContext(WorkspaceContext)
    const [messages, setMessages] = useState([])

    const { responseApiState, execute: getDirectMessages } = useApiRequest(directMessageService.getByUser)

    const receiver = workspaces
        .flatMap((workspace) => workspace.members || [])
        .find((member) => member._id === user_id)

    const normalizeSender = (sender) => {
        const senderId = sender?._id || sender
        if (senderId === user?._id) {
            return user
        }
        if (senderId === receiver?._id) {
            return receiver
        }
        return sender && typeof sender === "object" ? sender : { _id: senderId, username: "Usuario" }
    }

    const normalizeMessage = (message) => ({
        ...message,
        sender: normalizeSender(message.sender)
    })

    useEffect(() => {
        if (!user_id) return
        const fetchMessages = async () => {
            await getDirectMessages(user_id)
        }
        fetchMessages()
    }, [user_id, getDirectMessages])

    useEffect(() => {
        if (responseApiState.data?.payload?.messages) {
            setMessages(responseApiState.data.payload.messages.map(normalizeMessage))
        }
    }, [responseApiState.data])

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, normalizeMessage(newMessage)])
    }

    const contextValue = {
        messages,
        setMessages,
        addMessage
    }

    return (
        <DirectMessageContext.Provider value={contextValue}>
            <MessageContext.Provider value={contextValue}>
                {children}
            </MessageContext.Provider>
        </DirectMessageContext.Provider>
    )
}

export default DirectMessageProvider
