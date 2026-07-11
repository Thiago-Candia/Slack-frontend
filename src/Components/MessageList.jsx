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
            <div className="message-list">
                <div className="message-list__state">Cargando mensajes...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="message-list">
                <div className="message-list__state message-list__state--error">{error}</div>
            </div>
        )
    }

    if (!Array.isArray(messages) || messages.length === 0) {
        return (
            <div className="message-list">
                <div className="message-list__state">
                    <h2>No hay mensajes todavia</h2>
                    <p>Envia el primer mensaje para iniciar la conversacion.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="message-list">
            <div className="message-list__items">
                {messages.map((message, index) => {
                    const sender = getSender(message)
                    const previousSender = getSender(messages[index - 1])
                    const isSameSenderAsPrevious = previousSender?._id && previousSender._id === sender?._id
                    const senderName = sender?.username || sender?.email || "Usuario"
                    const avatar = sender?.profile_avatar_base64 || DEFAULT_AVATAR_URL

                    return (
                        <article className="message" key={message._id || `${sender?._id || "message"}-${index}`}>
                            <div className="message__avatar-slot">
                                {!isSameSenderAsPrevious ? (
                                    <img className="message__avatar" src={avatar} alt={senderName} />
                                ) : (
                                    <div className="message__avatar-placeholder" />
                                )}
                            </div>
                            <div className="message__body">
                                {!isSameSenderAsPrevious && (
                                    <div className="message__sender">
                                        <span>{senderName}</span>
                                    </div>
                                )}
                                <div className="message__content">
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
