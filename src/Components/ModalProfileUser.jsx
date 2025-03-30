import React, { useContext, useState } from 'react'
import { ProfileContext } from '../Context/ProfileContext'
import { Icons } from '../Assets/Icons/Icons'
import { getFormattedDateMMHHDDMM } from '../Helpers/Date.js'
import useModal from '../hooks/useModal.jsx'
import '../Styles/styles.css'
import ModalEditProfile from './ModalEditProfile.jsx'

const ModalProfileUser = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    const { user } = useContext(ProfileContext)
    const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal(false)
    console.log(user)

    return (
        <div className='modal-profile-overlay'>
            <div className='modal-profile'>
                <div className='modal-profile-header'>
                    <h2 className='modal-title text'>Perfil</h2>
                    <button onClick={onClose} className='btn-close-modal-profile'>X</button>
                </div>
                <div className='user-info'>
                    <div className='avatar-user'>
                        <img 
                            src={user?.profile_avatar_base64 || "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"} 
                            alt="Foto de perfil" 
                        />
                    </div>
                    <div className='modal-profile-info'>
                        <div className='modal-profile-info-item'>
                            <h3 className='text'>{user?.username}</h3>
                            <button className='btn-config btn-edit-profile' onClick={openEditModal}>
                                <span className='text-edit'>
                                    Editar
                                </span>
                            </button>
                        </div>
                        <div className='modal-profile-info-item'>
                            <Icons.Plus/>
                            <span> Agregar pronunciación del nombre</span>
                        </div>
                        <div className='modal-profile-info-item text'>
                            Disponible
                        </div>
                        <div className='modal-profile-info-item text'>
                            <Icons.History/>
                            <span>{getFormattedDateMMHHDDMM()} hora local</span>
                        </div>
                        <div className='modal-profile-info-item'>
                            <button className='btn-edit-status btn-config'>
                                <span className='text'>Establecer un estado</span>
                            </button>
                            <button className='btn-edit-status btn-config'>
                                <span className='text'>Ver como</span>
                            </button>
                            <button className='btn-edit-status btn-config'>
                                <i className='text'>
                                    <Icons.MoreOptionsVertical/> 
                                </i>
                            </button>
                        </div>
                        <div className='modal-profile-info-item text'>
                            <div className='modal-profile-info-item-contact'>
                                <span>Información de contacto</span>
                                <button className='btn-config'>
                                    <span className='text-edit'>Editar</span>
                                </button>
                            </div>
                            <div className='modal-profile-info-item-contact'>
                                <div className='modal-profile-email'>
                                    <i>
                                        <Icons.Mail/>
                                    </i>
                                </div>
                                <div className='modal-profile-email'>
                                    <span>Dirección de correo electrónico</span>
                                    <span>{user?.email}</span>
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
