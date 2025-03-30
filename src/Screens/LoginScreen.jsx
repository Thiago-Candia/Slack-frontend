import React, { useContext, useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import ENVIROMENT from '../config/enviroment'
import { useApiRequest } from '../hooks/useApiRequest'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import '../Styles/styles.css'
import { WorkspaceContext } from '../Context/WorkspaceContext'

const LoginScreen = () => {

  const { login } = useContext(AuthContext);

  const { loadWorkspaces } = useContext(WorkspaceContext)

  const navigate = useNavigate()

  const initialFormState = { email: '', password: '' }

  useForm(initialFormState)

  const { formState, handleChangeInput } = useForm(initialFormState)
  const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/login')

  useEffect(() => {
    if (responseApiState.data?.payload?.authorization_token) {
      login(responseApiState.data.payload.authorization_token)

      loadWorkspaces().then(() => {
        navigate('/home')
      })
    }
  }, [responseApiState]) 

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    await postRequest(formState)
  }

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Iniciar sesión</h1>
        <form className="login-form" onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="email" className='login-label'>Email </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@example.com"
              value={formState.email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label htmlFor="password" className='login-label'>Contraseña </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={formState.password}
              onChange={handleChangeInput}
            />
          </div>
          {responseApiState.error && <span className="error-message">{responseApiState.error.message}</span>}
          {responseApiState.loading ? <p>Cargando...</p> : <button className="login-button" type="submit">Iniciar sesión</button>}
        </form>

        <div className="login-links">
          <Link to="/reset-password">
            Olvidé mi contraseña
          </Link>
        </div>
        <div className="login-links">
          <span>No tienes cuenta? 
            <Link to="/register" className='sign-in__link'>
              Regístrate
            </Link>
          </span>
        </div>
      </div>
    </div>

  )
}

export default LoginScreen
