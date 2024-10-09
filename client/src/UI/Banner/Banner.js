import React from "react";
import "./Banner.css";
import Image from "../../assets/img/image-header.png";
import { useNavigate } from "react-router-dom";

export const Banner = () => {
  const navigate = useNavigate();
  const handleGoToSignIn = () => navigate("/sign-in");
  return (
    <div className="banner">
      <div className="banner-left-side">
        <div className="banner-title">Ҳар қандай фан бўйича онлайн курслар</div>
        <div className="banner-button" onClick={handleGoToSignIn}>
          Рўйхатдан ўтиш
        </div>
      </div>
      <div className="banner-right-side">
        <div className="banner-image-container">
          <img src={Image} alt="" />
        </div>
      </div>
    </div>
  );
};
