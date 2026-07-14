import React, { useContext, useEffect } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import { Icons } from '../Assets/Icons/Icons'
import { getFormattedDateMMHHDDMM } from '../Helpers/Date.js'
import useModal from '../hooks/useModal.jsx'
import '../Styles/styles.css'
import ModalEditProfile from './ModalEditProfile.jsx'
import { DEFAULT_AVATAR_URL } from '../constants/workspace.constants.js'

const ModalProfileUser = ({ isOpen, onClose }) => {
    const { user } = useContext(WorkspaceContext)
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
        <div className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title">
            <div className="profile-modal__dialog">
                <div className="profile-modal__header">
                    <h2 className="profile-modal__title" id="profile-title">Perfil</h2>
                    <button type="button" onClick={onClose} className="profile-modal__close-button" aria-label="Cerrar">X</button>
                </div>

                <div className="profile-modal__layout">
                    <div className="profile-modal__avatar-frame">
                        <img
                            className="profile-modal__avatar"
                            src={user?.profile_avatar_base64 || DEFAULT_AVATAR_URL}
                            alt={username}
                        />
                    </div>

                    <div className="profile-modal__content">
                        <div className="profile-modal__identity-row">
                            <h3 className="profile-modal__username">{username}</h3>
                            <button type="button" className="profile-modal__link-button" onClick={openEditModal}>
                                Editar
                            </button>
                        </div>

                        <div className="profile-modal__pronunciation">
                            <Icons.Plus/>
                            <span>Agregar pronunciacion del nombre</span>
                        </div>

                        <p className="profile-modal__availability">Disponible</p>

                        <div className="profile-modal__local-time">
                            <Icons.History/>
                            <span>{getFormattedDateMMHHDDMM()} hora local</span>
                        </div>

                        <div className="profile-modal__status-actions">
                            <button type="button" className="profile-modal__status-button" disabled>
                                Establecer un estado
                            </button>
                            <button type="button" className="profile-modal__status-button" disabled>
                                Ver como
                            </button>
                            <button type="button" className="profile-modal__status-button profile-modal__status-button--icon" aria-label="Mas opciones" disabled>
                                <Icons.MoreOptionsVertical/>
                            </button>
                        </div>

                        <section className="profile-modal__contact" aria-label="Informacion de contacto">
                            <div className="profile-modal__contact-header">
                                <h4>Informacion de contacto</h4>
                                <button type="button" className="profile-modal__link-button" disabled>
                                    Editar
                                </button>
                            </div>
                            <div className="profile-modal__email-row">
                                <span className="profile-modal__email-icon">
                                    <Icons.Mail/>
                                </span>
                                <div className="profile-modal__email-copy">
                                    <span>Direccion de correo electronico</span>
                                    <a href={`mailto:${email}`}>{email}</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <ModalEditProfile isOpen={isEditOpen} onClose={closeEditModal} />
        </div>
    )
}

export default ModalProfileUser
