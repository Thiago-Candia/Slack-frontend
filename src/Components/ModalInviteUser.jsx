import React, { useContext, useState } from "react"
import { InviteUserContext } from "../Context/InviteUserContext"

const ModalInviteUser = ({ isOpen, onClose }) => {

    const { inviteUser, isInviting, error } = useContext(InviteUserContext)
    const [userId, setUserId] = useState("")
    const [inviteLink, setInviteLink] = useState("")

    if (!isOpen) return null;

    const handleGenerateInviteLink = async () => {
        const response = await inviteUser()
        if(response?.invite_link){
            setInviteLink(response.invite_link)
        }
    }

    const handleCopyLink = async () => {
        try {
            if (inviteLink) {
                await navigator.clipboard.writeText(inviteLink)
                alert("Enlace copiado al portapapeles")
            }
        }
        catch(error){
            console.error("Error al copiar el enlace:", error);
        }
    }

    return (
        <section className="modal-container__invite-user">
            <div className="modal__invite-user">
                <h2 className="modal-title__invite-user">Invitar Usuario</h2>
                    <div>
                        <button className="btn-modal-invite-user" type="submit" onClick={handleGenerateInviteLink} disabled={isInviting}>
                            {isInviting ? "Generando..." : "Invitar"}
                        </button>
                        <button type="button" onClick={onClose} className="btn-modal-close">X</button>
                    </div>
                {inviteLink && ( 
                    <div className="invite-link">
                        <h3>Copiar enlace de invitación</h3>
                        <button onClick={handleCopyLink} className="btn-copy-link" >
                            {inviteLink}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ModalInviteUser
