import React, { useContext, useState } from "react"
import { useSendMessage } from "../Context/MessageSendContext"
import { MessageContext } from "../Context/MessageContext"
import "../Styles/styles.css"
import { Icons } from "../Assets/Icons/Icons"

const NewMessage = () => {

    const { sendMessage, isSending, error } = useSendMessage()
    const { addMessage } = useContext(MessageContext)
    const [newMessage, setNewMessage] = useState("") 

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
            try {
                const sentMessage = await sendMessage(newMessage.trim())
                console.log("Mensaje enviado:", sentMessage)
                if(sentMessage){
                    addMessage(sentMessage)
                }
                setNewMessage("")
            } 
            catch(error) {
                console.log("Error enviando mensaje:", error)
            }
        }
    }
    return (
        <div className="new-message-container">
            <div className="new-message-item">
                <button className="btn-config">
                    <i>
                        <Icons.Bold/>
                    </i>
                </button>
                <button className="btn-config">
                    <i>
                        <Icons.Italic/>
                    </i>
                </button>
                <button className="btn-config">
                    <i>
                        <Icons.Bold/>
                    </i>
                </button>
                <div className="separator">|</div>
                <button className="btn-config">
                    <i>
                        <Icons.Link/>
                    </i>
                </button>
                <button className="btn-config">
                    <i>
                        <Icons.ListNumber/>
                    </i>
                </button>
                <button className="btn-config">
                    <i>
                        <Icons.UnorderedList/>
                    </i>
                </button>
                <button className="btn-config">
                    <i>
                        <Icons.ListBlock/>
                    </i>
                </button>
                <button className="btn-config">
                    <i>
                        <Icons.Code/>
                    </i>
                </button>
                <button className="btn-config">
                    <i>
                        <Icons.CodeBlock/>
                    </i>
                </button>
            </div>
            <div className="new-message-item">
                <form className="new-message-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        disabled={isSending}
                    />
                    <button type="submit" disabled={isSending} className="btn-config btn-send-message" >
                        <i><Icons.SendMessage/></i>
                    </button>
                </form>
                {error && <p>{error}</p>}
            </div>
            <div className="new-message-item">
            <button className="btn-config">
                <i>
                    <Icons.Plus/>
                </i>
            </button>
            <button className="btn-config">
                <i>
                    <Icons.TextAa/>
                </i>
            </button>
            <button className="btn-config">
                <i>
                    <Icons.Emoji/>
                </i>
            </button>
            <button className="btn-config">
                <i>
                    <Icons.Mention/>
                </i>
            </button>
            <div className="separator">|</div>
            <button className="btn-config">
                <i>
                    <Icons.Video/>
                </i>
            </button>
            <button className="btn-config">
                <i>
                    <Icons.Audio/>
                </i>
            </button>
            <div className="separator">|</div>
            <button className="btn-config">
                <i>
                    <Icons.DirectAcces/>
                </i>
            </button>
            </div>
        </div>
    )
}

export default NewMessage