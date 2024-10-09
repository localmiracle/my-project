// client/src/components/CoursesCard/CoursesCard.js
import React from "react";
import "./CoursesCard.css";

export const CoursesCard = ({ title, onClick }) => {
  return (
    <div
      className="curses-categories-item"
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default CoursesCard;
