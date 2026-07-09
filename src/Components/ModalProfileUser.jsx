import React, { useContext, useEffect } from 'react'
import { ProfileContext } from '../Context/ProfileContext'
import { Icons } from '../Assets/Icons/Icons'
import { getFormattedDateMMHHDDMM } from '../Helpers/Date.js'
import useModal from '../hooks/useModal.jsx'
import '../Styles/styles.css'
import ModalEditProfile from './ModalEditProfile.jsx'
import { DEFAULT_AVATAR_URL } from '../constants/workspace.constants.js'

const ModalProfileUser = ({ isOpen, onClose }) => {
    const { user } = useContext(ProfileContext)
    const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal(false)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const username = user?.username || 'Usuario'
    const email = user?.email || 'Sin correo registrado'

    return (
        <div className="modal-profile-overlay" role="dialog" aria-modal="true" aria-labelledby="profile-title">
            <div className="modal-profile">
                <div className="modal-profile-header">
                    <h2 className="modal-title text" id="profile-title">Perfil</h2>
                    <button type="button" onClick={onClose} className="btn-close-modal-profile" aria-label="Cerrar">X</button>
                </div>
                <div className="user-info">
                    <div className="avatar-user">
                        <img 
                            src={user?.profile_avatar_base64 || DEFAULT_AVATAR_URL} 
                            alt={username} 
                        />
                    </div>
                    <div className="modal-profile-info">
                        <div className="modal-profile-info-item">
                            <h3 className="text">{username}</h3>
                            <button type="button" className="btn-config btn-edit-profile" onClick={openEditModal}>
                                <span className="text-edit">Editar</span>
                            </button>
                        </div>
                        <div className="modal-profile-info-item">
                            <Icons.Plus/>
                            <span>Agregar pronunciación del nombre</span>
                        </div>
                        <div className="modal-profile-info-item text">
                            Disponible
                        </div>
                        <div className="modal-profile-info-item text">
                            <Icons.History/>
                            <span>{getFormattedDateMMHHDDMM()} hora local</span>
                        </div>
                        <div className="modal-profile-info-item">
                            <button type="button" className="btn-edit-status btn-config" disabled>
                                <span className="text">Establecer un estado</span>
                            </button>
                            <button type="button" className="btn-edit-status btn-config" disabled>
                                <span className="text">Ver como</span>
                            </button>
                            <button type="button" className="btn-edit-status btn-config" aria-label="Más opciones" disabled>
                                <i className="text">
                                    <Icons.MoreOptionsVertical/> 
                                </i>
                            </button>
                        </div>
                        <div className="modal-profile-info-item text">
                            <div className="modal-profile-info-item-contact">
                                <span>Información de contacto</span>
                                <button type="button" className="btn-config" disabled>
                                    <span className="text-edit">Editar</span>
                                </button>
                            </div>
                            <div className="modal-profile-info-item-contact">
                                <div className="modal-profile-email">
                                    <i><Icons.Mail/></i>
                                </div>
                                <div className="modal-profile-email">
                                    <span>Dirección de correo electrónico</span>
                                    <span>{email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalEditProfile isOpen={isEditOpen} onClose={closeEditModal} />
        </div>
    )
}

export default ModalProfileUser
