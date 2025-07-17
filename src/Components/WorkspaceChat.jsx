import React, { useContext, useState } from "react";
import { useParams, Routes, Route, useNavigate} from "react-router-dom";
import MessageContextProvider from "../Context/MessageContext";
import "../Styles/styles.css";
import { ModalInviteUser, UserList, ChannelList, ModalCreateChannel, NewMessage, MessageList } from '../Components/index.js'
import useModal from "../hooks/useModal";
import { Icons } from "../Assets/Icons/Icons.jsx";
import { ProfileContext } from "../Context/ProfileContext.jsx";
import ModalProfileUser from "./ModalProfileUser.jsx";
import { WorkspaceContext } from "../Context/WorkspaceContext.jsx";

const WorkspaceChat = () => {

    const { workspace_id, channel_id, user_id } = useParams()
    const { workspaces } = useContext(WorkspaceContext)
    const { user } = useContext(ProfileContext)
    const {isOpen: isProfileModalOpen,  openModal: openProfileModal, closeModal: closeProfileModal} = useModal()
    const [isModalOpen, setIsModalOpen] = useState(false) //Estado para controlar el modal

    const navigate = useNavigate()

    const goHome = () => {
        navigate('/home')
    }

    return (
    <>
        <div className="sidebar-desktop">
            <div className="sidebar-desktop-item">
                
                <button className="button-item-sidebar-desktop btn-config"> 
                    Icono Slack 
                </button>

                <div className="container-btn-sidebar-desktop btn-config">
                    <button onClick={goHome} className="btn-sidebar-desktop btn-config"> 
                        <i><Icons.Home/></i>
                    </button>
                    <span>Inicio</span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button className="btn-sidebar-desktop btn-config"> 
                        <i><Icons.Messages/></i>
                    </button>
                    <span className="sidebar-text">Mensajes directos</span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button className="btn-sidebar-desktop btn-config"> 
                        <i><Icons.Notification/> </i>
                    </button>
                    <span>Actividad</span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button className="btn-sidebar-desktop btn-config"> 
                    <i><Icons.MoreOptions/> </i>
                    </button>
                    <span>Mas</span>
                </div>

            </div>
            <div>
                <button className="btn-sidebar-desktop btn-config button-plus-sidebar-desktop">
                    <i><Icons.Plus/></i>
                </button>
                <button className="btn-sidebar-desktop btn-config" onClick={openProfileModal}>
                    <img src={user?.profile_avatar_base64 || "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}/>
                </button>
                    {/* Modal para ver perfil */}
                <ModalProfileUser isOpen={isProfileModalOpen} onClose={closeProfileModal} user={user} />
            </div>
        </div>

        <div className="sidebar-workspace">
            <div className="sidebar-item">
                <div className="sidebar-item-header">
                    <button className="btn-config btn-sidebar-header text">
                        <span>{workspace_id.nombre}</span>
                    </button>
                    <button className="btn-config text btn-sidebar-header">
                        <i><Icons.PenNewMsg/></i>
                    </button>
                </div>
                <div className="sidebar-item-header">
                    <button className="btn-config btn-sidebar-header text">
                        <i><Icons.Rocket/></i>
                        <span>Cambiar de plan</span>
                    </button>
                </div>
            </div>
            <div className="sidebar-item">
                <ChannelList/>
                <UserList/>
            </div>
        </div>

        <div className="chat-container">
            {user_id ? (
                // Si es un chat directo, usar DirectMessageProvider
                <DirectMessageProvider user_id={user_id}>
                    <Routes>
                        <Route path="/" element={<MessageList />} />
                    </Routes>
                    <NewMessage />
                </DirectMessageProvider>
            ) : (
                // Si es un canal, usar MessageContextProvider
                <MessageContextProvider workspace_id={workspace_id} channel_id={channel_id}>
                    <Routes>
                        <Route path="/" element={<MessageList />} />
                        <Route path="*" element={<p>Selecciona un canal para empezar a chatear.</p>} />
                    </Routes>
                    <NewMessage />
                </MessageContextProvider>
            )}
        </div>
    </>
    )
}

export default WorkspaceChat