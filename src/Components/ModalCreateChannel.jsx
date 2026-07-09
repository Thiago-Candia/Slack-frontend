import React, { useContext, useEffect, useRef, useState } from "react"
import { CreateChannel } from "../Context/CreateChannelContext"

const ModalCreateChannel = ({ isOpen, onClose }) => {
    const { createChannel, isCreatingChannel, error } = useContext(CreateChannel)
    const [channelName, setChannelName] = useState("")
    const [validationError, setValidationError] = useState("")
    const inputRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            setValidationError("")
            setTimeout(() => inputRef.current?.focus(), 0)
        }
    }, [isOpen])

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

    if (!isOpen) {
        return null
    }

    const handleCreateChannel = async (e) => {
        e.preventDefault()
        const normalizedName = channelName.trim()

        if (!normalizedName) {
            setValidationError("Ingresa un nombre para el canal.")
            return
        }

        const response = await createChannel(normalizedName)

        if (response) {
            setChannelName("")
            onClose()
        }
    }

    return (
        <section className="modal-container__create-channel" role="dialog" aria-modal="true" aria-labelledby="create-channel-title">
            <div className="modal__create-channel">
                <h2 className="modal-title__create-channel" id="create-channel-title">Crear canal</h2>
                <form onSubmit={handleCreateChannel} className="modal-form__create-channel">
                    <input
                        ref={inputRef}
                        type="text"
                        value={channelName}
                        onChange={(e) => {
                            setChannelName(e.target.value)
                            setValidationError("")
                        }}
                        placeholder="Nombre del canal"
                        aria-invalid={Boolean(validationError || error)}
                    />
                    {(validationError || error) && <p className="modal-error">{validationError || error}</p>}
                    <div className="modal-actions">
                        <button type="button" className="btn-modal-close" onClick={onClose} aria-label="Cerrar">
                            X
                        </button>
                        <button type="submit" disabled={isCreatingChannel} className="btn-modal-create-channel">
                            {isCreatingChannel ? "Creando..." : "Crear canal"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ModalCreateChannel
