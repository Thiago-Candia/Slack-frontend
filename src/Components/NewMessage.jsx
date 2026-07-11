import React, { useRef, useContext, useState } from "react"
import { useSendMessage } from "../Context/MessageSendContext"
import { MessageContext } from "../Context/MessageContext"
import "../Styles/styles.css"
import { Icons } from "../Assets/Icons/Icons"
import { useParams } from "react-router-dom"

const toolbarActions = [
    { label: "Negrita", Icon: Icons.Bold },
    { label: "Cursiva", Icon: Icons.Italic },
    { label: "Enlace", Icon: Icons.Link },
    { label: "Lista numerada", Icon: Icons.ListNumber },
    { label: "Lista", Icon: Icons.UnorderedList },
    { label: "Codigo", Icon: Icons.Code }
]

const NewMessage = () => {
    const { sendMessage, isSending, error } = useSendMessage()
    const { addMessage } = useContext(MessageContext)
    const [newMessage, setNewMessage] = useState("")
    const inputRef = useRef(null)
    const { channel_id, user_id } = useParams()
    const trimmedMessage = newMessage.trim()

    if(!channel_id && !user_id){
        return null
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()

        if (!trimmedMessage || isSending) {
            return
        }

        const sentMessage = await sendMessage(trimmedMessage)

        if(sentMessage){
            addMessage(sentMessage)
            setNewMessage("")
            setTimeout(() => inputRef.current?.focus(), 0)
        }
    }

    return (
        <div className="message-composer">
            <div className="message-composer__toolbar" aria-label="Herramientas de formato">
                {toolbarActions.map(({ label, Icon }) => (
                    <button key={label} type="button" className="message-composer__icon-button" aria-label={label} disabled>
                        <i><Icon/></i>
                    </button>
                ))}
            </div>
            <form className="message-composer__form" onSubmit={handleSendMessage}>
                <input
                    ref={inputRef}
                    className="message-composer__input"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    disabled={isSending}
                />
                <button
                    type="submit"
                    disabled={isSending || !trimmedMessage}
                    className="message-composer__send-button"
                    aria-label="Enviar mensaje"
                >
                    <i><Icons.SendMessage/></i>
                </button>
            </form>
            {error && <p className="message-composer__error">{error}</p>}
        </div>
    )
}

export default NewMessage
