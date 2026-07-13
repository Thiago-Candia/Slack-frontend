import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services";
import { useApiRequest } from "../hooks/useApiRequest";
import { useForm } from "../hooks/useForm";
import "../Styles/styles.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getValidationErrors = ({ username, email, password }) => {
  const errors = {};

  if (username.trim().length < 3) {
    errors.username = "El nombre de usuario debe tener al menos 3 caracteres.";
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  return errors;
};

const RegisterScreen = () => {
  const { formState, handleChangeInput } = useForm({
    username: "",
    password: "",
    email: "",
    profile_avatar_base64: ""
  });
  const [validationErrors, setValidationErrors] = useState({});
  const { responseApiState, execute: registerRequest } = useApiRequest(authService.register);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const errors = getValidationErrors(formState);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    await registerRequest({
      ...formState,
      username: formState.username.trim(),
      email: formState.email.trim()
    });
  };

  const handleInputChange = (event) => {
    handleChangeInput(event);
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [event.target.name]: undefined
    }));
  };

  const responseError = responseApiState.error?.message;

  return (
    <div className="register-screen">
      <div className="register-container">
        <h1>Crear cuenta</h1>
        <form className="form-register" onSubmit={handleSubmitForm} noValidate>
          <div>
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Joe Doe"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              autoComplete="username"
              aria-invalid={Boolean(validationErrors.username)}
              aria-describedby={validationErrors.username ? "register-username-error" : undefined}
            />
            {validationErrors.username && <p id="register-username-error" className="error-message">{validationErrors.username}</p>}
          </div>
          <div>
            <label htmlFor="email">Correo electr&oacute;nico</label>
            <input
              type="email"
              placeholder="joedoe@gmail.com"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              autoComplete="email"
              aria-invalid={Boolean(validationErrors.email)}
              aria-describedby={validationErrors.email ? "register-email-error" : undefined}
            />
            {validationErrors.email && <p id="register-email-error" className="error-message">{validationErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Contrase&ntilde;a</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              autoComplete="new-password"
              aria-invalid={Boolean(validationErrors.password)}
              aria-describedby={validationErrors.password ? "register-password-error" : undefined}
            />
            {validationErrors.password && <p id="register-password-error" className="error-message">{validationErrors.password}</p>}
          </div>
          <div>
            <label htmlFor="profile_avatar_base64">Imagen de perfil</label>
            <input
              type="file"
              id="profile_avatar_base64"
              name="profile_avatar_base64"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          {formState.profile_avatar_base64 && (
            <img src={formState.profile_avatar_base64} alt="Vista previa del perfil" />
          )}
          {responseError && <p className="error-message">{responseError}</p>}
          {responseApiState.data && <p className="success-message">Cuenta creada correctamente.</p>}
          <div className="register-btn-container">
            <button className="register-btn btn-config" type="submit" disabled={responseApiState.loading}>
              {responseApiState.loading ? "Creando..." : "Registrarse"}
            </button>
          </div>
        </form>
        <div className="register-links">
          <span>&iquest;Ya tienes una cuenta? <Link to="/login">Inicia sesi&oacute;n</Link></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
