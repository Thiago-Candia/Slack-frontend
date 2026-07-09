import React from "react"

const WorkspaceProfileMenu = ({ isOpen, onOpenProfile, onLogout }) => {
    return (
        <ul className={`profile-menu ${isOpen ? "active" : ""}`} role="menu">
            <li role="none">
                <button type="button" className="profile-menu__item" role="menuitem" disabled>
                    Actualiza tu estado
                </button>
            </li>
            <li role="none">
                <button type="button" className="profile-menu__item" role="menuitem" disabled>
                    Cambiar a ausente
                </button>
            </li>
            <li role="none">
                <button type="button" className="profile-menu__item" role="menuitem" disabled>
                    Pausar las notificaciones
                </button>
            </li>
            <li className="profile-menu__divider" role="separator"></li>
            <li role="none">
                <button type="button" className="profile-menu__item" role="menuitem" onClick={onOpenProfile}>
                    Perfil
                </button>
            </li>
            <li role="none">
                <button type="button" className="profile-menu__item" role="menuitem" disabled>
                    Preferencias
                </button>
            </li>
            <li className="profile-menu__divider" role="separator"></li>
            <li role="none">
                <button type="button" className="profile-menu__item" role="menuitem" onClick={onLogout}>
                    Cerrar sesión
                </button>
            </li>
        </ul>
    )
}

export default WorkspaceProfileMenu
