import React from 'react'
import ENVIROMENT from '../config/enviroment'
import { useApiRequest } from '../hooks/useApiRequest'
import { useForm } from '../hooks/useForm'
import { Link } from 'react-router-dom'
import '../Styles/styles.css'

const RegisterScreen = () => {
  const formInitialState = {
    username: '',
    password: '',
    email: '',
    profile_img_base64: ''
  }

  const { formState, handleChangeInput } = useForm(formInitialState)

  const { responseApiState, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/register')

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    console.log(formState)
    await postRequest(formState)
  }

  return (
    <div className='register-screen'>
      <div className='register-container'>
        <h1>Crear cuenta</h1>
        <form className='form-register' onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="username">Nombre de usuario </label>
            <input 
              type="text" 
              placeholder='Joe Doe' 
              id='username' 
              name='username' 
              value={formState.username}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label htmlFor="email">Email </label>
            <input 
              type="email" 
              placeholder='joedoe@gmail.com' 
              id='email' 
              name='email' 
              value={formState.email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              placeholder='********' 
              id='password' 
              name='password' 
              value={formState.password}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label htmlFor="profile_avatar_base64">Imagen de perfil</label>
            <input
              type="file" 
              id='profile_avatar_base64'
              name='profile_avatar_base64'
              onChange={handleChangeInput}
            />
          </div>
          {
            formState.profile_img_base64 &&
            <img src={formState.profile_img_base64}/>
          }
          {responseApiState.error && <span className="error-message">{responseApiState.error}</span>}
          {responseApiState.loading ? (
            <p>Cargando...</p>
          ) : (
            <div className='register-btn-container'>
              <button className='register-btn btn-config' type='submit'> 
                <span>Registrarse </span>
              </button>
            </div>
          )}
        </form>
        <div className="register-links">
          <span>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link> </span>
        </div>
      </div>
    </div>

  )
}

export default RegisterScreen
