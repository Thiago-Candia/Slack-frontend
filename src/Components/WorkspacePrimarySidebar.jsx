import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icons } from "../Assets/Icons/Icons"
import { ProfileContext } from "../Context/ProfileContext"
import { AuthContext } from "../Context/AuthContext"
import { WorkspaceContext } from "../Context/WorkspaceContext"
import useModal from "../hooks/useModal"
import ModalProfileUser from "./ModalProfileUser"
import WorkspaceProfileMenu from "./WorkspaceProfileMenu"
import { DEFAULT_AVATAR_URL } from "../constants/workspace.constants"

const WorkspacePrimarySidebar = () => {
    const navigate = useNavigate()
    const { user } = useContext(ProfileContext)
    const { logout: logoutAuth } = useContext(AuthContext)
    const { logout: logoutWorkspace } = useContext(WorkspaceContext)
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

    return (
        <aside className="sidebar-desktop" aria-label="Navegación principal del workspace">
            <div className="sidebar-desktop-item">
                <button type="button" className="button-item-sidebar-desktop btn-config" aria-label="Slack">
                    <Icons.Slack/>
                </button>

                <div className="container-btn-sidebar-desktop">
                    <button type="button" onClick={() => navigate("/home")} className="btn-sidebar-desktop btn-config" aria-label="Inicio">
                        <i><Icons.Home/></i>
                    </button>
                    <span>Inicio</span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button type="button" className="btn-sidebar-desktop btn-config" aria-label="Mensajes directos" disabled>
                        <i><Icons.Messages/></i>
                    </button>
                    <span className="sidebar-text">Mensajes directos</span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button type="button" className="btn-sidebar-desktop btn-config" aria-label="Actividad" disabled>
                        <i><Icons.Notification/></i>
                    </button>
                    <span>Actividad</span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button type="button" className="btn-sidebar-desktop btn-config" aria-label="Más opciones" disabled>
                        <i><Icons.MoreOptions/></i>
                    </button>
                    <span>Más</span>
                </div>
            </div>

            <div className="workspace-profile-anchor">
                <button type="button" className="btn-sidebar-desktop btn-config button-plus-sidebar-desktop" aria-label="Crear" disabled>
                    <i><Icons.Plus/></i>
                </button>

                <button
                    type="button"
                    className="btn-sidebar-desktop btn-config workspace-profile-trigger"
                    onClick={() => setIsProfileMenuOpen((prevState) => !prevState)}
                    aria-expanded={isProfileMenuOpen}
                    aria-label="Abrir menú de perfil"
                >
                    <img
                        className="workspace-avatar"
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
