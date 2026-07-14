import React, { useState, useContext, useRef, useEffect } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import { useForm } from '../hooks/useForm'
import '../Styles/styles.css'
import { DEFAULT_AVATAR_URL } from '../constants/workspace.constants'

const ModalEditProfile = ({ isOpen, onClose }) => {
    const { user, updateProfile } = useContext(WorkspaceContext)
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
                onClose()
            }
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
        <div className="edit-profile-modal" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
            <div className="edit-profile-modal__dialog">
                <h2 className="edit-profile-modal__title" id="edit-profile-title">Editar perfil</h2>

                <div className="edit-profile-modal__field">
                    <label className="edit-profile-modal__label" htmlFor="edit-profile-username">Nombre de usuario</label>
                    <input
                        id="edit-profile-username"
                        className="edit-profile-modal__input"
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="edit-profile-modal__avatar-field">
                    <button
                        type="button"
                        className="edit-profile-modal__avatar-button"
                        onClick={() => fileInputRef.current.click()}
                        aria-label="Cambiar avatar"
                    >
                        <img
                            src={avatarPreview || DEFAULT_AVATAR_URL}
                            alt="Avatar"
                        />
                    </button>
                    <label className="edit-profile-modal__label" htmlFor="edit-profile-avatar">Subir avatar</label>
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

                {error && <p className="edit-profile-modal__error">{error}</p>}

                <div className="edit-profile-modal__actions">
                    <button type="button" onClick={onClose} className="edit-profile-modal__cancel-button">
                        Cancelar
                    </button>
                    <button type="button" onClick={handleSave} className="edit-profile-modal__save-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEditProfile
