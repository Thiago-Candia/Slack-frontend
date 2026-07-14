import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Icons } from "../Assets/Icons/Icons"
import { WorkspaceContext } from "../Context/WorkspaceContext"
import { ChannelContext } from "../Context/ChannelContext"

const WorkspaceChatHeader = ({ isSidebarOpen, onToggleSidebar }) => {
    const navigate = useNavigate()
    const { workspace_id, channel_id, user_id } = useParams()
    const { workspaces } = useContext(WorkspaceContext)
    const { channels } = useContext(ChannelContext)

    const currentWorkspace = workspaces.find((workspace) => workspace._id === workspace_id)
    const currentChannel = channels.find((channel) => channel._id === channel_id)
    const searchTarget = currentChannel?.name || currentWorkspace?.name || "este workspace"
    const searchPlaceholder = user_id ? "Buscar en mensajes directos" : `Buscar en ${searchTarget}`

    return (
        <header className="workspace-topbar">
            <div className="workspace-topbar__content">
                <div className="workspace-topbar__navigation">
                    <button
                        type="button"
                        className="workspace-topbar__icon-button workspace-topbar__sidebar-button"
                        onClick={onToggleSidebar}
                        aria-label="Mostrar navegacion del workspace"
                        aria-controls="workspace-navigation"
                        aria-expanded={isSidebarOpen}
                    >
                        <Icons.MoreOptions />
                    </button>
                    <button type="button" onClick={() => navigate(-1)} className="workspace-topbar__icon-button" aria-label="Volver">
                        <Icons.ArrowBack />
                    </button>
                    <button type="button" onClick={() => navigate(1)} className="workspace-topbar__icon-button" aria-label="Avanzar">
                        <Icons.ArrowForward />
                    </button>
                    <button type="button" className="workspace-topbar__icon-button" aria-label="Historial" disabled>
                        <Icons.History />
                    </button>
                </div>
                <label className="workspace-topbar__search">
                    <span className="workspace-topbar__search-label">Buscar</span>
                    <input type="text" placeholder={searchPlaceholder} disabled />
                    <Icons.Search className="workspace-topbar__search-icon" />
                </label>
                <div className="workspace-topbar__actions">
                    <button type="button" className="workspace-topbar__trial-button" disabled>
                        <Icons.Slack />
                        <span>Version de prueba de Pro de Slack</span>
                    </button>
                    <button type="button" className="workspace-topbar__icon-button" aria-label="Ayuda" disabled>
                        <Icons.Help />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default WorkspaceChatHeader
