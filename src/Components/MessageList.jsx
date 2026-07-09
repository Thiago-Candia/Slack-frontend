import React, { useContext, useEffect, useRef } from "react"
import { MessageContext } from "../Context/MessageContext"
import "../Styles/styles.css"
import { DEFAULT_AVATAR_URL } from "../constants/workspace.constants"

const getSender = (message) => {
    if (message?.sender && typeof message.sender === "object") {
        return message.sender
    }

    return {
        _id: message?.sender,
        username: "Usuario"
    }
}

const MessageList = () => {
    const messageContext = useContext(MessageContext) || {}
    const { messages = [], loading, error } = messageContext
    const messageEndRef = useRef(null)

    useEffect(() => {
        if (messages.length > 0) {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    if (loading) {
        return (
            <div className="messages-body">
                <div className="messages-state">Cargando mensajes...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="messages-body">
                <div className="messages-state messages-state--error">{error}</div>
            </div>
        )
    }

    if (!Array.isArray(messages) || messages.length === 0) {
        return (
            <div className="messages-body">
                <div className="messages-state">
                    <h2>No hay mensajes todavía</h2>
                    <p>Envía el primer mensaje para iniciar la conversación.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="messages-body">
            <div className="messages-list-box">
                {messages.map((message, index) => {
                    const sender = getSender(message)
                    const previousSender = getSender(messages[index - 1])
                    const isSameSenderAsPrevious = previousSender?._id && previousSender._id === sender?._id
                    const senderName = sender?.username || sender?.email || "Usuario"
                    const avatar = sender?.profile_avatar_base64 || DEFAULT_AVATAR_URL

                    return (
                        <article className="message-item" key={message._id || `${sender?._id || "message"}-${index}`}>
                            <div className="message-sub_item message-avatar-container">
                                {!isSameSenderAsPrevious ? (
                                    <img className="message-avatar" src={avatar} alt={senderName} />
                                ) : (
                                    <div className="message-avatar-empty" />
                                )}
                            </div>
                            <div className="message-sub_item">
                                {!isSameSenderAsPrevious && (
                                    <div className="message-sender">
                                        <span>{senderName}</span>
                                    </div>
                                )}
                                <div className="message-content">
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        </article>
                    )
                })}
                <div ref={messageEndRef} />
            </div>
        </div>
    )
}

export default MessageList
