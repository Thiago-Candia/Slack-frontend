import React, { useContext, useEffect, useRef } from "react"
import { MessageContext } from "../Context/MessageContext"
import "../Styles/styles.css"
import { ProfileContext } from "../Context/ProfileContext"

const MessageList = () => {

    const { messages } = useContext(MessageContext)
    const messageEndRef = useRef(null)
    const { user } = useContext(ProfileContext)

    useEffect(() => {
        // Hace scroll automático hasta el último mensaje
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="messages-body">
            <div className="messages-list-box">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div className="message-item" key={message._id}>
                            <div className="message-sub_item message-avatar-container">
                                <img className="message-avatar" src={user?.profile_avatar_base64 || "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}/>
                            </div>
                            <div className="message-sub_item">
                                <div className="message-sender">
                                    <span>{message.sender.username}</span>
                                    {/* <span>{message.created_at}</span> */}
                                </div>
                                <div className="message-content">
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay mensajes</p>
                )}
                {/* Referencia para mantener el scroll abajo */}
                <div ref={messageEndRef} />
            </div>
        </div>
    )
}

export default MessageList