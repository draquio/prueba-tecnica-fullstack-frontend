import React, { useState } from "react";
import { Auth } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import "./Login.scss";
import { LoginIcon } from "../icons/Icons";
import Alert from "../alerts/Alert";
import { useNavigate } from "react-router-dom";
export const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("123");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const loginForm = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage("Correo y contraseña son obligatorios");
      return;
    } else {
      setMessage("");
      try {
        const authController = new Auth();
        const response = await authController.login({
          email: email,
          password: password,
        });
        authController.setAccessToken(response.access);
        authController.setRefreshToken(response.refresh);
        login(response.access);
        navigate("/");
      } catch (error) {
        setMessage(error.msg);
      }
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form className="login">
        <div className="login_icon">
          <LoginIcon />
        </div>
        <div className="login_block">
          <label>Email</label>
          <input
            type="email"
            placeholder="Mail@tumail.com"
            onChange={handleEmailChange}
            required
            defaultValue="admin@admin.com"
          />
        </div>
        <div className="login_block">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="***************"
            onChange={handlePasswordChange}
            defaultValue="123"
            required
          />
        </div>
        <button className="btn btn_delete" onClick={loginForm}>
          Login
        </button>
        {message ? (
          <Alert message={message} type={"error"} close={setMessage} />
        ) : (
          ""
        )}
      </form>
      <div className="logininfo">
        <h3>Usuarios para probar</h3>
        <div className="logininfo_item">
          <span>Usuario: admin@admin.com</span>
          <span>Password: 123</span>
        </div>
        <div className="logininfo_item">
          <span>Usuario: usuario2@user.com</span>
          <span>Password: 321</span>
        </div>
      </div>
    </>
  );
};
