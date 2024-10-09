// client/src/UI/RecentCourses/RecentCoursesCard.js
import React from "react";
import PropTypes from "prop-types";
import "./RecentCoursesCard.css";

export const RecentCoursesCard = ({ img, title, onClick }) => {
  return (
    <div className="recent-courses-item" onClick={onClick}>
      <div className="recent-courses-item-img">
        {img ? <img src={img} alt={title} /> : <div className="no-image">No Image</div>}
      </div>
      <div className="recent-courses-item-title">{title}</div>
    </div>
  );
};

// Добавление PropTypes для типизации пропсов
RecentCoursesCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

