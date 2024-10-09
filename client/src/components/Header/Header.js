// client/src/pages/SignInPage/Header.js
import React, { useContext, useEffect, useState } from "react";
import Search from "../../assets/svg/Subtract.svg";
import "./Header.css";
import User from "../../assets/svg/User.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../../assets/svg/logo.svg";
export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const isAuth = !!user; // Преобразуем объект пользователя в булево значение

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleGoToHome = () => navigate("/");
  const handleGoToSignIn = () => navigate("/sign-in");
  const handleGoToProfile = () => navigate("/profile");
  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="header-sign-in">
      <div className="header-sign-in-container">
        {isMobile ? (
          <>
            <div className="logo-btn-container">
              <div
                className="header-sign-in-logo-container"
                onClick={handleGoToHome}
              >
                <img className="header-sign-in-logo" src={Logo} alt="logo" />
              </div>
              {isAuth ? (
                <div className="user-menu">
                  <img
                    onClick={handleGoToProfile}
                    className="user-profile-icon"
                    src={User}
                    alt="User Profile"
                  />
                </div>
              ) : (
                <div className="sign-in-button" onClick={handleGoToSignIn}>
                  Рўйхатдан ўтиш
                </div>
              )}
            </div>

            <div className="search-container">
              <img className="input-icon" src={Search} alt="Search Icon" />
              <input
                className="search-container-input"
                placeholder="курсни қидиринг…"
                type="text"
              />
            </div>
          </>
        ) : (
          <>
            <div
              className="header-sign-in-logo-container"
              onClick={handleGoToHome}
            >
              <img className="header-sign-in-logo" src={Logo} alt="logo" />
              <div className="search-container">
              <img className="input-icon" src={Search} alt="Search Icon" />
              <input
                className="search-container-input"
                placeholder="курсни қидиринг…"
                type="text"
              />
            </div>
            </div>
            
            {isAuth ? (
              <div className="user-menu">
                <img
                  onClick={handleGoToProfile}
                  className="user-profile-icon"
                  src={User}
                  alt="User Profile"
                />
              </div>
            ) : (
              <div className="sign-in-button" onClick={handleGoToSignIn}>
                Рўйхатдан ўтиш
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
