import React, { useEffect } from 'react'
import { useApiRequest } from '../hooks/useApiRequest'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import '../Styles/styles.css'
import { authService } from '../services/auth.service'

const RewritePasswordScreen = () => {

    const navigate = useNavigate()

        const searchParams = new URLSearchParams(window.location.search)
        const reset_token = searchParams.get('reset_token')

    useEffect(() => {
        if(!reset_token){
            navigate('/')
        }
    })

    const initialFormState = {
        password: ''
    }

    const {formState, handleChangeInput} = useForm(initialFormState)
    const {responseApiState, execute: rewritePasswordRequest} = useApiRequest(authService.rewritePassword)

    useEffect(
        () => {
            if(responseApiState.data){
                navigate('/login')
            }
        },
        [responseApiState]
    )
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        await rewritePasswordRequest({password: formState.password, reset_token}) 
    }

    return (
        <div id='rewrite-password-screen'>
            <div className='rewrite-password-container'>
                <h1>Recupera tu contraseña</h1>
                <form onSubmit={handleSubmitForm}>
                    <div>
                        <label htmlFor="email"> Nueva contraseña </label>
                        <input 
                            type="password"
                            name='password'
                            id='password'
                            placeholder='Nueva contraseña'
                            value={formState.password} 
                            onChange={handleChangeInput}
                        />
                    </div>
                    {responseApiState.error && <p>{responseApiState.error.message}</p>}
                    {responseApiState.loading
                        ? <p>Cargando...</p>
                        : (
                            responseApiState.data 
                            ? <span>Enviado</span>
                            : <button>Establecer nueva contraseña</button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default RewritePasswordScreen
