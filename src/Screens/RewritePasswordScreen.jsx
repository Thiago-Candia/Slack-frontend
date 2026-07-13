import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../services";
import { useApiRequest } from "../hooks/useApiRequest";
import { useForm } from "../hooks/useForm";
import "../Styles/styles.css";

const RewritePasswordScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("reset_token");
  const [validationError, setValidationError] = useState("");
  const { formState, handleChangeInput } = useForm({ password: "" });
  const { responseApiState, execute: rewritePasswordRequest } = useApiRequest(authService.rewritePassword);

  useEffect(() => {
    if (!resetToken) {
      navigate("/reset-password", { replace: true });
    }
  }, [navigate, resetToken]);

  useEffect(() => {
    if (responseApiState.data) {
      navigate("/login", { replace: true });
    }
  }, [navigate, responseApiState.data]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (formState.password.length < 8) {
      setValidationError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setValidationError("");
    await rewritePasswordRequest({ password: formState.password, reset_token: resetToken });
  };

  const handlePasswordChange = (event) => {
    handleChangeInput(event);
    setValidationError("");
  };

  const responseError = responseApiState.error?.message;

  return (
    <div id="rewrite-password-screen">
      <div className="rewrite-password-container">
        <h1>Recupera tu contrase&ntilde;a</h1>
        <form onSubmit={handleSubmitForm} noValidate>
          <div>
            <label htmlFor="password">Nueva contrase&ntilde;a</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Nueva contrase&ntilde;a"
              value={formState.password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              aria-invalid={Boolean(validationError)}
              aria-describedby={validationError ? "rewrite-password-error" : undefined}
            />
          </div>
          {(validationError || responseError) && <p id="rewrite-password-error">{validationError || responseError}</p>}
          <button type="submit" disabled={responseApiState.loading}>
            {responseApiState.loading ? "Guardando..." : "Establecer nueva contrase&ntilde;a"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RewritePasswordScreen;
