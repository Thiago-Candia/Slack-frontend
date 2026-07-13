import React, { useState } from 'react'
import { useApiRequest } from '../hooks/useApiRequest'
import { useForm } from '../hooks/useForm'
import { Link } from 'react-router-dom'
import { authService } from '../services'
import '../Styles/styles.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const getEmailError = (email) => {
    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
        return 'Ingresa tu correo electrónico.'
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
        return 'Ingresa un correo electrónico válido.'
    }

    return ''
}

const ResetPasswordScreen = () => {

    const initialFormState = {
        email: ''
    }

    const {formState, handleChangeInput} = useForm(initialFormState)
    const [hasTouchedEmail, setHasTouchedEmail] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const {responseApiState, execute: resetPasswordRequest} = useApiRequest(authService.resetPassword)
    const emailError = getEmailError(formState.email)
    const shouldShowEmailError = Boolean(emailError) && (hasTouchedEmail || hasSubmitted)
    const responseError = responseApiState.error?.message || responseApiState.error
    const isSubmitDisabled = responseApiState.loading

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if (emailError) {
            return
        }

        await resetPasswordRequest({
            email: formState.email.trim()
        })
    }

    return (
        <main className="reset-password-screen">
            <section className="reset-password-card" aria-labelledby="reset-password-title">
                <div className="reset-password-heading">
                    <p className="reset-password-kicker">Recupera tu cuenta</p>
                    <h1 id="reset-password-title">Restablece tu contrase&ntilde;a</h1>
                    <p className="reset-password-description">
                        Te enviaremos un enlace para crear una nueva contrase&ntilde;a.
                    </p>
                </div>

                <form className="reset-password-form" onSubmit={handleSubmitForm} noValidate>
                    <div className="reset-password-field">
                        <label htmlFor="email">Correo electr&oacute;nico</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="nombre@correo.com"
                            value={formState.email} 
                            onChange={handleChangeInput}
                            onBlur={() => setHasTouchedEmail(true)}
                            aria-invalid={shouldShowEmailError}
                            aria-describedby={shouldShowEmailError ? 'reset-password-email-error' : undefined}
                        />
                        {shouldShowEmailError && (
                            <p className="reset-password-message reset-password-message--error" id="reset-password-email-error">
                                {emailError}
                            </p>
                        )}
                    </div>

                    {responseError && (
                        <p className="reset-password-message reset-password-message--error">
                            {responseError}
                        </p>
                    )}

                    {responseApiState.data && (
                        <p className="reset-password-message reset-password-message--success">
                            Se ha enviado un correo para restablecer tu contrase&ntilde;a.
                        </p>
                    )}

                    <button className="reset-password-button" type="submit" disabled={isSubmitDisabled}>
                        {responseApiState.loading ? 'Enviando...' : 'Enviar enlace'}
                    </button>

                    <div className="reset-password-links">
                        <Link to="/login">Volver a iniciar sesi&oacute;n</Link>
                        <span>
                            A&uacute;n no tienes cuenta?
                            <Link to="/register">Reg&iacute;strate</Link>
                        </span>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default ResetPasswordScreen
