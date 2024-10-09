import React from "react";
import './Footer.css';
import Logo from '../../assets/svg/logo.svg'; // Импортируем логотип

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-btn-container">
        <div className="footer-btn">Пользовательское соглашение</div>
        <div className="footer-btn">Условия подписки</div>
      </div>
      <div className="footer-logo-container">
        <img className="footer-logo" src={Logo} alt="logo" /> {/* Логотип */}
        {/* Добавляем контактную информацию прямо под логотипом */}
        <div className="footer-contact-info">
          <p>8 777 123 45 67</p>
          <p>email@domain.com</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;