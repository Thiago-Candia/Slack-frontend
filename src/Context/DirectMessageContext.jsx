import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import { directMessageService } from "../services";
import { MessageContext } from "./MessageContext";
import { WorkspaceContext } from "./WorkspaceContext";

export const DirectMessageContext = createContext();

const DirectMessageProvider = ({ children }) => {
    const { user_id } = useParams()
    const { user, workspaces } = useContext(WorkspaceContext)
    const [messages, setMessages] = useState([])
    const { responseApiState, execute: getDirectMessages } = useApiRequest(directMessageService.getByUser)

    const receiver = workspaces
        .flatMap((workspace) => workspace.members || [])
        .find((member) => member._id === user_id)

    const normalizeSender = useCallback((sender) => {
        const senderId = sender?._id || sender

        if (senderId === user?._id) {
            return user
        }

        if (senderId === receiver?._id) {
            return receiver
        }

        return sender && typeof sender === "object" ? sender : { _id: senderId, username: "Usuario" }
    }, [receiver, user])

    const normalizeMessage = useCallback((message) => ({
        ...message,
        sender: normalizeSender(message.sender)
    }), [normalizeSender])

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user_id) {
                setMessages([])
                return
            }

            await getDirectMessages(user_id)
        }

        fetchMessages()
    }, [user_id, getDirectMessages])

    useEffect(() => {
        if (responseApiState.data?.payload?.messages) {
            setMessages(responseApiState.data.payload.messages.map(normalizeMessage))
        }
    }, [normalizeMessage, responseApiState.data])

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, normalizeMessage(newMessage)])
    }

    const contextValue = {
        messages,
        setMessages,
        addMessage,
        loading: responseApiState.loading,
        error: responseApiState.error?.message || null
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
