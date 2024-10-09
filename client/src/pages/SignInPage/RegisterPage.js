// client/src/pages/RegisterPage.js
import React, { useState, useContext } from 'react';
import { registerUser } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Создайте соответствующий CSS файл
import { Footer, Header } from '../../components';

const RegisterPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState('');

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage('Пароли не совпадают.');
      return;
    }

    try {
      const data = await registerUser(email, password);
      login(data.token);
      navigate('/'); // Перенаправление на главную страницу после регистрации
    } catch (error) {
      setMessage(error.error || 'Произошла ошибка при регистрации.');
    }
  };

  return (
    <div className="register-page">
      <Header />
      <div className="body-register-container">
        <div className="body-register">
          <form onSubmit={onSubmit} className="register-form">
            <h2>Регистрация</h2>
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

            <label htmlFor="password2">Подтверждение пароля:</label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              required
            />

            <button type="submit">Зарегистрироваться</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
