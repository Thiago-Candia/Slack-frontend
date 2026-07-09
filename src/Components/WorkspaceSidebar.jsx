import React from "react"
import { Icons } from "../Assets/Icons/Icons"
import ChannelList from "./ChannelList"
import UserList from "./UserList"

const WorkspaceSidebar = ({ workspace, loading, error }) => {
    const workspaceName = workspace?.name?.trim()

    return (
        <aside className="sidebar-workspace" aria-label="Navegación del workspace">
            <div className="sidebar-item sidebar-item--header">
                <div className="sidebar-item-header">
                    <button type="button" className="btn-config btn-sidebar-header text" title={workspaceName || "Workspace"} disabled={!workspaceName}>
                        <span>{loading && !workspaceName ? "Cargando..." : workspaceName || "Workspace no encontrado"}</span>
                    </button>
                    <button type="button" className="btn-config text btn-sidebar-header" aria-label="Nuevo mensaje" disabled>
                        <i><Icons.PenNewMsg/></i>
                    </button>
                </div>
                {error && <p className="sidebar-status sidebar-status--error">{error}</p>}
                <div className="sidebar-item-header">
                    <button type="button" className="btn-config btn-sidebar-header text workspace-plan-button" disabled>
                        <i><Icons.Rocket/></i>
                        <span>Cambiar de plan</span>
                    </button>
                </div>
            </div>
            <div className="sidebar-item sidebar-item--scroll">
                <ChannelList/>
                <UserList/>
            </div>
        </aside>
    )
}

export default WorkspaceSidebar
