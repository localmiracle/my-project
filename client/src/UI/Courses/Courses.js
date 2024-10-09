// client/src/UI/Courses/Courses.js
import React from "react";
import "./Courses.css";
import { CoursesCard } from "../../components";
import { useNavigate } from "react-router-dom";

export const Courses = ({ categories }) => {
  const navigate = useNavigate();

  const handleGoToCategory = (id) => navigate(`/category/${id}`);
  
  return (
    <div className="curses">
      <div className="curses-title">Все курсы</div>
      <div className="curses-categories">
        {categories.map((item) => (
          <CoursesCard
            key={`courses-card-${item._id}`}
            title={item.name}
            onClick={() => handleGoToCategory(item._id)}
          />
        ))}
      </div>
    </div>
  );
};
