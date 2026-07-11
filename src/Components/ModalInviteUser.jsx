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
        <section className="invite-user-modal" role="dialog" aria-modal="true" aria-labelledby="invite-user-title">
            <div className="invite-user-modal__dialog">
                <h2 className="invite-user-modal__title" id="invite-user-title">Invitar usuario</h2>
                <div className="invite-user-modal__actions">
                    <button className="invite-user-modal__submit-button" type="button" onClick={handleGenerateInviteLink} disabled={isInviting}>
                        {isInviting ? "Generando..." : "Generar invitacion"}
                    </button>
                    <button type="button" onClick={onClose} className="invite-user-modal__close-button" aria-label="Cerrar">X</button>
                </div>
                {error && <p className="invite-user-modal__error">{error}</p>}
                {inviteLink && (
                    <div className="invite-user-modal__link-box">
                        <h3>Copiar enlace de invitacion</h3>
                        <button type="button" onClick={handleCopyLink} className="invite-user-modal__copy-button">
                            {inviteLink}
                        </button>
                        {copyStatus && <p className="invite-user-modal__copy-status">{copyStatus}</p>}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ModalInviteUser
