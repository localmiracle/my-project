// client/src/pages/SignInPage/SignInPage.js
import React, { useState, useContext } from "react";
import "./SignInPage.css";
import { Footer, Header } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { registerUser, loginUser } from "../../api";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [message, setMessage] = useState("");

  const { email, password, password2 } = formData;

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ email: "", password: "", password2: "" });
    setMessage("");
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      // Регистрация
      if (password !== password2) {
        setMessage("Пароли не совпадают.");
        return;
      }
      try {
        const data = await registerUser(email, password);
        login(data.token);
        navigate("/profile"); // Перенаправление на страницу профиля после регистрации
      } catch (error) {
        if (error.errors && error.errors.length > 0) {
          setMessage(error.errors.map(err => err.msg).join(", "));
        } else {
          setMessage(error.error || "Произошла ошибка при регистрации.");
        }
      }
    } else {
      // Логин
      try {
        const data = await loginUser(email, password);
        login(data.token);
        navigate("/profile"); // Перенаправление на страницу профиля после логина
      } catch (error) {
        if (error.errors && error.errors.length > 0) {
          setMessage(error.errors.map(err => err.msg).join(", "));
        } else {
          setMessage(error.error || "Произошла ошибка при авторизации.");
        }
      }
    }
  };

  return (
    <div className="sign-in-page">
      <Header />
      <div className="body-sign-in-container">
        <div className="body-sign-in">
          <form onSubmit={onSubmit} className="auth-form">
            <h2>{isRegister ? "Регистрация" : "Авторизация"}</h2>
            {message && <p className="message">{message}</p>}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />

            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
            />

            {isRegister && (
              <>
                <label htmlFor="password2">Подтверждение пароля:</label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  value={password2}
                  onChange={onChange}
                  required
                />
              </>
            )}

            <button type="submit">
              {isRegister ? "Зарегистрироваться" : "Войти"}
            </button>
          </form>
          <div className="toggle-form">
            {isRegister ? (
              <p>
                Уже есть аккаунт?{" "}
                <span className="toggle-link" onClick={toggleForm}>
                  Войти
                </span>
              </p>
            ) : (
              <p>
                Нет аккаунта?{" "}
                <span className="toggle-link" onClick={toggleForm}>
                  Зарегистрироваться
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
