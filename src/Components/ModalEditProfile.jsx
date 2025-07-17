import React, { useState, useContext, useRef, useEffect } from 'react';
import { ProfileContext } from '../Context/ProfileContext';
import { UpdateProfileContext } from '../Context/UpdateProfileContext';
import { useForm } from '../hooks/useForm';
import '../Styles/styles.css';

const ModalEditProfile = ({ isOpen, onClose }) => {

    if (!isOpen) return null

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


    const handleSave = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await updateProfile({
                username: formState.username,
                profile_avatar_base64: formState.profile_avatar_base64
            })
            if (response?.payload?.user) {
                const updateUser = response.payload.user
                localStorage.setItem('user', JSON.stringify(updateUser))
                setUser(updateUser)
            }
            onClose()
        } 
        catch (error) {
            console.log('Error al guardar los cambios:', error);
            setError(error.message || 'Error al actualizar el perfil');
        } 
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="modal-edit-profile">
            <div className="modal-edit-profile-container">
                <h2 className="text">Editar Perfil</h2>
                <div className="modal-edit-profile-item">
                    <label className="text">Nombre de usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="modal-edit-profile-item">
                    <div 
                        className="modal-edit-profile-item-avatar" 
                        onClick={() => fileInputRef.current.click()}
                        style={{ cursor: 'pointer' }}
                    >
                        <img 
                            src={avatarPreview || "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"} 
                            alt="Avatar"
                        />
                    </div>
                    <label className="text modal-edit-profile-item-label">Subir avatar</label>
                    <input
                        type="file"
                        name="profile_avatar_base64"
                        ref={fileInputRef}
                        onChange={(e) => {
                            const file = e.target.files[0]
                            const reader = new FileReader()
                            reader.onloadend = () => {
                                handleChangeInput({
                                    target: {
                                        name: 'profile_avatar_base64',
                                        value: reader.result
                                    }
                                })
                            }
                            if(file) reader.readAsDataURL(file)
                        }}
                        style={{ display: 'none' }}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="modal-edit-profile-buttons">
                    <button onClick={onClose} className="btn-config btn-cancel">
                        <span className="text">Cancelar</span>
                    </button>
                    <button onClick={handleSave} className="btn-config btn-save" disabled={isLoading}>
                        <span className="text">{isLoading ? 'Guardando...' : 'Guardar cambios'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEditProfile
