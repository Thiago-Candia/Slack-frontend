import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Icons } from "../Assets/Icons/Icons"
import { WorkspaceContext } from "../Context/WorkspaceContext"
import { ChannelContext } from "../Context/ChannelContext"

const WorkspaceChatHeader = () => {
    const navigate = useNavigate()
    const { workspace_id, channel_id, user_id } = useParams()
    const { workspaces } = useContext(WorkspaceContext)
    const { channels } = useContext(ChannelContext)

    const currentWorkspace = workspaces.find((workspace) => workspace._id === workspace_id)
    const currentChannel = channels.find((channel) => channel._id === channel_id)
    const searchTarget = currentChannel?.name || currentWorkspace?.name || "este workspace"
    const searchPlaceholder = user_id ? "Buscar en mensajes directos" : `Buscar en ${searchTarget}`

    return (
        <header className="workspace-header-chat-container">
            <div className="workspace-header-chat-content">
                <div className="workspace-header-chat-content-item nav-buttons">
                    <button type="button" onClick={() => navigate(-1)} className="nav-button" aria-label="Volver">
                        <Icons.ArrowBack />
                    </button>
                    <button type="button" onClick={() => navigate(1)} className="nav-button" aria-label="Avanzar">
                        <Icons.ArrowForward />
                    </button>
                    <button type="button" className="nav-button" aria-label="Historial" disabled>
                        <Icons.History />
                    </button>
                </div>
                <label className="workspace-header-chat-content-item search-bar">
                    <span className="workspace-header-search-label">Buscar</span>
                    <input type="text" placeholder={searchPlaceholder} disabled />
                    <Icons.Search className="search-icon" />
                </label>
                <div className="workspace-header-chat-content-item pro-version">
                    <button type="button" className="pro-button" disabled>
                        <Icons.Slack />
                        <span>Versión de prueba de Pro de Slack</span>
                    </button>
                    <button type="button" className="help-button" aria-label="Ayuda" disabled>
                        <Icons.Help />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default WorkspaceChatHeader
