import React, { useContext, useEffect, useState } from "react"
import { InviteUserContext } from "../Context/InviteUserContext"

const ModalInviteUser = ({ isOpen, onClose }) => {
    const { inviteUser, isInviting, error } = useContext(InviteUserContext)
    const [inviteLink, setInviteLink] = useState("")
    const [copyStatus, setCopyStatus] = useState("")

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleGenerateInviteLink = async () => {
        setCopyStatus("")
        const response = await inviteUser()

        if(response?.invite_link){
            setInviteLink(response.invite_link)
        }
    }

    const handleCopyLink = async () => {
        if (!inviteLink) {
            return
        }

        try {
            await navigator.clipboard.writeText(inviteLink)
            setCopyStatus("Enlace copiado al portapapeles.")
        }
        catch {
            setCopyStatus("No se pudo copiar el enlace.")
        }
    }

    return (
        <section className="modal-container__invite-user" role="dialog" aria-modal="true" aria-labelledby="invite-user-title">
            <div className="modal__invite-user">
                <h2 className="modal-title__invite-user" id="invite-user-title">Invitar usuario</h2>
                <div className="modal-actions">
                    <button className="btn-modal-invite-user" type="button" onClick={handleGenerateInviteLink} disabled={isInviting}>
                        {isInviting ? "Generando..." : "Generar invitación"}
                    </button>
                    <button type="button" onClick={onClose} className="btn-modal-close" aria-label="Cerrar">X</button>
                </div>
                {error && <p className="modal-error">{error}</p>}
                {inviteLink && ( 
                    <div className="invite-link">
                        <h3>Copiar enlace de invitación</h3>
                        <button type="button" onClick={handleCopyLink} className="btn-copy-link">
                            {inviteLink}
                        </button>
                        {copyStatus && <p>{copyStatus}</p>}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ModalInviteUser
