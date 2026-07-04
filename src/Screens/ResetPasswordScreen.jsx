import React from 'react'
import { useApiRequest } from '../hooks/useApiRequest'
import { useForm } from '../hooks/useForm'
import { Link } from 'react-router-dom'
import { authService } from '../services/auth.service'

const ResetPasswordScreen = () => {

    const initialFormState = {
        email: ''
    }

    const {formState, handleChangeInput} = useForm(initialFormState)

    const {responseApiState, execute: resetPasswordRequest} = useApiRequest(authService.resetPassword)

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        await resetPasswordRequest(formState)
    }


    return (
        <div>
            <h1>Restablece tu contraseña</h1>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <label htmlFor="email"> Email con el que te registraste </label>
                    <input 
                        type="email"
                        name='email'
                        id='email'
                        value={formState.email} 
                        onChange={handleChangeInput}
                    />
                </div>

                {responseApiState.error && <p>{responseApiState.error.message}</p>}

                {responseApiState.loading
                    ? <p>Cargando...</p>
                    : (
                        responseApiState.data 
                        ? <span>Se ha enviado un correo para restablecer tu contraseña</span>
                        : <button>Restablecer contraseña</button>
                    )
                }

                <div>
                    <div>
                    <Link to={'/login'}>
                        Ya tengo cuenta
                    </Link>
                    </div>
                    <div>
                    <span>
                        Aun no tienes una cuenta 
                        <Link to={'/register'}>
                            registrate
                        </Link>
                    </span>  
                    </div>
                </div>

            </form>
        </div>
    )
}

export default ResetPasswordScreen
