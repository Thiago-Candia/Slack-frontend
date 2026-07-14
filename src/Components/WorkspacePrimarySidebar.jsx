import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icons } from "../Assets/Icons/Icons"
import { AuthContext } from "../Context/AuthContext"
import { WorkspaceContext } from "../Context/WorkspaceContext"
import useModal from "../hooks/useModal"
import ModalProfileUser from "./ModalProfileUser"
import WorkspaceProfileMenu from "./WorkspaceProfileMenu"
import { DEFAULT_AVATAR_URL } from "../constants/workspace.constants"

const WorkspacePrimarySidebar = () => {
    const navigate = useNavigate()
    const { logout: logoutAuth } = useContext(AuthContext)
    const { logout: logoutWorkspace, user } = useContext(WorkspaceContext)
    const { isOpen: isProfileModalOpen, openModal: openProfileModal, closeModal: closeProfileModal } = useModal()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    const handleLogout = () => {
        logoutAuth()
        logoutWorkspace()
        navigate("/login")
    }

    const handleOpenProfile = () => {
        setIsProfileMenuOpen(false)
        openProfileModal()
    }

    const navigationItems = [
        { label: "Inicio", Icon: Icons.Home, onClick: () => navigate("/home") },
        { label: "Mensajes directos", Icon: Icons.Messages, disabled: true },
        { label: "Actividad", Icon: Icons.Notification, disabled: true },
        { label: "Mas", Icon: Icons.MoreOptions, disabled: true }
    ]

    return (
        <aside className="workspace-primary-sidebar" aria-label="Navegacion principal del workspace">
            <div className="workspace-primary-sidebar__nav">
                <button type="button" className="workspace-primary-sidebar__logo-button" aria-label="Slack">
                    <Icons.Slack/>
                </button>

                {navigationItems.map(({ label, Icon, onClick, disabled }) => (
                    <div key={label} className="workspace-primary-sidebar__nav-item">
                        <button
                            type="button"
                            onClick={onClick}
                            className="workspace-primary-sidebar__button"
                            aria-label={label}
                            disabled={disabled}
                        >
                            <i><Icon/></i>
                        </button>
                        <span className="workspace-primary-sidebar__label">{label}</span>
                    </div>
                ))}
            </div>

            <div className="workspace-primary-sidebar__profile">
                <button
                    type="button"
                    className="workspace-primary-sidebar__button workspace-primary-sidebar__button--create"
                    aria-label="Crear"
                    disabled
                >
                    <i><Icons.Plus/></i>
                </button>

                <button
                    type="button"
                    className="workspace-primary-sidebar__profile-trigger"
                    onClick={() => setIsProfileMenuOpen((prevState) => !prevState)}
                    aria-expanded={isProfileMenuOpen}
                    aria-label="Abrir menu de perfil"
                >
                    <img
                        className="workspace-primary-sidebar__avatar"
                        src={user?.profile_avatar_base64 || DEFAULT_AVATAR_URL}
                        alt={user?.username || "Usuario"}
                    />
                </button>
                <WorkspaceProfileMenu
                    isOpen={isProfileMenuOpen}
                    onOpenProfile={handleOpenProfile}
                    onLogout={handleLogout}
                />
                <ModalProfileUser isOpen={isProfileModalOpen} onClose={closeProfileModal} />
            </div>
        </aside>
    )
}

export default WorkspacePrimarySidebar
