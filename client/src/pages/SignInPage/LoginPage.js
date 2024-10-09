// client/src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { loginUser } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Создайте соответствующий CSS файл
import { Footer, Header } from '../../components';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      login(data.token);
      navigate('/'); // Перенаправление на главную страницу после логина
    } catch (error) {
      setMessage(error.error || 'Произошла ошибка при авторизации.');
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="body-login-container">
        <div className="body-login">
          <form onSubmit={onSubmit} className="login-form">
            <h2>Авторизация</h2>
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

            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
