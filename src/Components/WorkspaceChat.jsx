import React, { useContext, useState } from "react";
import { useParams, Routes, Route, useNavigate} from "react-router-dom";
import MessageContextProvider from "../Context/MessageContext";
import "../Styles/styles.css";
import { UserList, ChannelList, NewMessage, MessageList } from '../Components/index.js'
import useModal from "../hooks/useModal";
import { Icons } from "../Assets/Icons/Icons.jsx";
import { ProfileContext } from "../Context/ProfileContext.jsx";
import ModalProfileUser from "./ModalProfileUser.jsx";
import DirectMessageProvider from "../Context/DirectMessageContext.jsx";

const WorkspaceChat = () => {

    const { workspace_id, channel_id, user_id } = useParams()

    const { user } = useContext(ProfileContext)

    const {isOpen: isProfileModalOpen,  openModal: openProfileModal, closeModal: closeProfileModal} = useModal()

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    const navigate = useNavigate()

    const goHome = () => {
        navigate('/home')
    }

    return (
    <>
        <div className="sidebar-desktop">
            <div className="sidebar-desktop-item">
                <button className="button-item-sidebar-desktop btn-config"> 
                    <Icons.Slack/>
                </button>

                <div className="container-btn-sidebar-desktop btn-config">
                    <button onClick={goHome} className="btn-sidebar-desktop btn-config"> 
                        <i>
                            <Icons.Home/>
                        </i>
                    </button>
                    <span>
                        Inicio
                    </span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button className="btn-sidebar-desktop btn-config"> 
                        <i>
                            <Icons.Messages/>
                        </i>
                    </button>
                    <span className="sidebar-text">Mensajes directos</span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button className="btn-sidebar-desktop btn-config"> 
                        <i>
                            <Icons.Notification/>
                        </i>
                    </button>
                    <span>
                        Actividad
                    </span>
                </div>

                <div className="container-btn-sidebar-desktop">
                    <button className="btn-sidebar-desktop btn-config"> 
                        <i>
                            <Icons.MoreOptions/> 
                        </i>
                    </button>
                    <span>
                        Mas
                    </span>
                </div>

            </div>
            <div>
                <button className="btn-sidebar-desktop btn-config button-plus-sidebar-desktop">
                    <i>
                        <Icons.Plus/>
                    </i>
                </button>

                <button className="btn-sidebar-desktop btn-config" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                    <img src={user?.profile_avatar_base64 || "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"}/>
                    
                </button>
                    <ul className={`profile-menu ${isProfileMenuOpen ? 'active' : ''}`}>
                        <li className="li-profile-menu">Actualiza tu estado</li>
                        <li className="li-profile-menu">Cambiar a ausente</li>
                        <li className="li-profile-menu">Pausar las notificaciones</li>
                        <hr />
                        <li className="li-profile-menu" onClick={openProfileModal}>
                            <button className="btn-config text">
                                <span className="">
                                    Perfil
                                </span>
                            </button>
                        </li>
                        <li className="li-profile-menu"> Preferencias</li>
                        <hr />
                        <li className="li-profile-menu">Cerrar sesion</li>
                    </ul>
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
                <DirectMessageProvider>
                    <Routes>
                        <Route path="/" element={<MessageList />} />
                    </Routes>
                    <NewMessage />
                </DirectMessageProvider>
            ) : (
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
