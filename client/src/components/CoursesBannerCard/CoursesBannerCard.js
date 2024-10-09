// client/src/components/CoursesBannerCard/CoursesBannerCard.js
import React from "react";
import "./CoursesBannerCard.css";

export const CoursesBannerCard = ({ title, img, onClick }) => {
  return (
    <div className="curses-banners-item">
      <div className="curses-banners-left-side">
        <div className="curses-banners-item-title">{title}</div>
        <div className="curses-banners-item-button" onClick={onClick}>
          Юклаш →
        </div>
      </div>
      <div className="curses-banners-right-side">
        <div className="curses-banners-img-container">
          <img 
            className="curses-banners-img" 
            src={img} 
            alt={title} 
            style={{ objectFit: "cover", width: "100%",  }} // Инлайновые стили
          />
          <img 
            className="img-blur" 
            src={img} 
            alt={title} 
            style={{ objectFit: "cover", width: "100%",  }} // Инлайновые стили
          />
        </div>
      </div>
    </div>
  );
};
