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
        <section className="create-channel-modal" role="dialog" aria-modal="true" aria-labelledby="create-channel-title">
            <div className="create-channel-modal__dialog">
                <h2 className="create-channel-modal__title" id="create-channel-title">Crear canal</h2>
                <form onSubmit={handleCreateChannel} className="create-channel-modal__form">
                    <input
                        ref={inputRef}
                        className="create-channel-modal__input"
                        type="text"
                        value={channelName}
                        onChange={(e) => {
                            setChannelName(e.target.value)
                            setValidationError("")
                        }}
                        placeholder="Nombre del canal"
                        aria-invalid={Boolean(validationError || error)}
                    />
                    {(validationError || error) && <p className="create-channel-modal__error">{validationError || error}</p>}
                    <div className="create-channel-modal__actions">
                        <button type="button" className="create-channel-modal__close-button" onClick={onClose} aria-label="Cerrar">
                            X
                        </button>
                        <button type="submit" disabled={isCreatingChannel} className="create-channel-modal__submit-button">
                            {isCreatingChannel ? "Creando..." : "Crear canal"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ModalCreateChannel
