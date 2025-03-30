import React, { useContext, useState } from "react"
import { CreateChannel } from "../Context/CreateChannelContext"

const ModalCreateChannel = ({ isOpen, onClose }) => {

    const { createChannel, isCreatingChannel, error } = useContext(CreateChannel)

    const [channelName, setChannelName] = useState("")

    if (!isOpen) {
        return null
    }

    const handleCreateChannel = async (e) => {
        e.preventDefault()
        await createChannel(channelName)
        setChannelName("")
        onClose()
    }

    return (
        <section className="modal-container__create-channel">
            <div className="modal__create-channel">
                <h2 className="modal-title__create-channel">Crear Canal</h2>
                <form onSubmit={handleCreateChannel} className="modal-form__create-channel">
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="Nombre del Canal"
                        required
                    />
                    <button type="submit" disabled={isCreatingChannel} className="btn-modal-create-channel">
                        {isCreatingChannel ? "Cargando..." : "Crear Canal"}
                    </button>
                    <button type="button" className="btn-modal-close" onClick={onClose}>
                        X
                    </button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </section>
    )
}

export default ModalCreateChannel
