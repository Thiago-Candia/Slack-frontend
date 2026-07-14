import React from "react"
import { Icons } from "../Assets/Icons/Icons"
import ChannelList from "./ChannelList"
import UserList from "./UserList"

const WorkspaceSidebar = ({ workspace, loading, error, isMobileOpen, onMobileClose }) => {
    const workspaceName = workspace?.name?.trim()

    return (
        <aside
            id="workspace-navigation"
            className={`workspace-sidebar ${isMobileOpen ? "workspace-sidebar--mobile-open" : ""}`}
            aria-label="Navegacion del workspace"
            onClick={onMobileClose}
        >
            <div className="workspace-sidebar__header">
                <div className="workspace-sidebar__header-row">
                    <button
                        type="button"
                        className="workspace-sidebar__title-button"
                        title={workspaceName || "Workspace"}
                        disabled={!workspaceName}
                    >
                        <span>{loading && !workspaceName ? "Cargando..." : workspaceName || "Workspace no encontrado"}</span>
                    </button>
                    <button
                        type="button"
                        className="workspace-sidebar__icon-button"
                        aria-label="Nuevo mensaje"
                        disabled
                    >
                        <i><Icons.PenNewMsg/></i>
                    </button>
                </div>
                {error && <p className="workspace-sidebar__status workspace-sidebar__status--error">{error}</p>}
                <div className="workspace-sidebar__header-row">
                    <button type="button" className="workspace-sidebar__plan-button" disabled>
                        <i><Icons.Rocket/></i>
                        <span>Cambiar de plan</span>
                    </button>
                </div>
            </div>
            <div className="workspace-sidebar__content">
                <ChannelList/>
                <UserList/>
            </div>
        </aside>
    )
}

export default WorkspaceSidebar
