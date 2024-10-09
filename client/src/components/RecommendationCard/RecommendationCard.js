// client/src/components/RecommendationCard/RecommendationCard.js
import React from "react";
import "./RecommendationCard.css";

export const RecommendationCard = ({ img, title, onClick }) => {
  return (
    <div className="recommendation-item">
      <img 
        className="recommendation-item-img" 
        src={img} 
        alt={title} 
        style={{ objectFit: "cover", width: "100%", height: "350px" }} 
      />
      <div className="recommendation-item-title">{title}</div>
      <div className="recommendation-item-button" onClick={onClick}>
        Юклаш →
      </div>
    </div>
  );
};
