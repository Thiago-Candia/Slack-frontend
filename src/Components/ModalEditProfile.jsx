import React, { useState, useContext, useRef, useEffect } from 'react'
import { ProfileContext } from '../Context/ProfileContext'
import { UpdateProfileContext } from '../Context/UpdateProfileContext'
import { useForm } from '../hooks/useForm'
import '../Styles/styles.css'
import { DEFAULT_AVATAR_URL } from '../constants/workspace.constants'

const ModalEditProfile = ({ isOpen, onClose }) => {
    const { updateProfile } = useContext(UpdateProfileContext)
    const { user, setUser } = useContext(ProfileContext)
    const fileInputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(user?.profile_avatar_base64 || '')
    const { formState, handleChangeInput } = useForm({
        username: user?.username || '',
        profile_avatar_base64: user?.profile_avatar_base64 || ''
    })

    useEffect(() => {
        if(formState.profile_avatar_base64){
            setAvatarPreview(formState.profile_avatar_base64)
        }
    }, [formState.profile_avatar_base64])

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

    const handleSave = async () => {
        const username = formState.username.trim()

        if (!username) {
            setError('Ingresa un nombre de usuario.')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await updateProfile({
                username,
                profile_avatar_base64: formState.profile_avatar_base64
            })

            if (response?.payload?.user) {
                const updatedUser = response.payload.user
                localStorage.setItem('user', JSON.stringify(updatedUser))
                setUser(updatedUser)
            }

            onClose()
        } 
        catch (error) {
            setError(error.message || 'Error al actualizar el perfil')
        } 
        finally {
            setIsLoading(false)
        }
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files[0]

        if (!file) {
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            handleChangeInput({
                target: {
                    name: 'profile_avatar_base64',
                    value: reader.result
                }
            })
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="modal-edit-profile" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
            <div className="modal-edit-profile-container">
                <h2 className="text" id="edit-profile-title">Editar perfil</h2>
                <div className="modal-edit-profile-item">
                    <label className="text" htmlFor="edit-profile-username">Nombre de usuario</label>
                    <input
                        id="edit-profile-username"
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="modal-edit-profile-item">
                    <button
                        type="button"
                        className="modal-edit-profile-item-avatar"
                        onClick={() => fileInputRef.current.click()}
                        aria-label="Cambiar avatar"
                    >
                        <img 
                            src={avatarPreview || DEFAULT_AVATAR_URL} 
                            alt="Avatar"
                        />
                    </button>
                    <label className="text modal-edit-profile-item-label" htmlFor="edit-profile-avatar">Subir avatar</label>
                    <input
                        id="edit-profile-avatar"
                        type="file"
                        name="profile_avatar_base64"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        className="visually-hidden-input"
                        accept="image/*"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="modal-edit-profile-buttons">
                    <button type="button" onClick={onClose} className="btn-config btn-cancel">
                        <span className="text">Cancelar</span>
                    </button>
                    <button type="button" onClick={handleSave} className="btn-config btn-save" disabled={isLoading}>
                        <span className="text">{isLoading ? 'Guardando...' : 'Guardar cambios'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEditProfile
