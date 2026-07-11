import React from "react"

const WorkspaceProfileMenu = ({ isOpen, onOpenProfile, onLogout }) => {
    return (
        <ul className={`workspace-profile-menu ${isOpen ? "workspace-profile-menu--open" : ""}`} role="menu">
            <li role="none">
                <button type="button" className="workspace-profile-menu__item" role="menuitem" disabled>
                    Actualiza tu estado
                </button>
            </li>
            <li role="none">
                <button type="button" className="workspace-profile-menu__item" role="menuitem" disabled>
                    Cambiar a ausente
                </button>
            </li>
            <li role="none">
                <button type="button" className="workspace-profile-menu__item" role="menuitem" disabled>
                    Pausar las notificaciones
                </button>
            </li>
            <li className="workspace-profile-menu__divider" role="separator"></li>
            <li role="none">
                <button type="button" className="workspace-profile-menu__item" role="menuitem" onClick={onOpenProfile}>
                    Perfil
                </button>
            </li>
            <li role="none">
                <button type="button" className="workspace-profile-menu__item" role="menuitem" disabled>
                    Preferencias
                </button>
            </li>
            <li className="workspace-profile-menu__divider" role="separator"></li>
            <li role="none">
                <button type="button" className="workspace-profile-menu__item" role="menuitem" onClick={onLogout}>
                    Cerrar sesion
                </button>
            </li>
        </ul>
    )
}

export default WorkspaceProfileMenu
