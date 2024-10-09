// client/src/UI/RecentCourses/RecentCourses.js
import React from "react";
import "./RecentCourses.css";
import { RecentCoursesCard } from "../../components";
import { useNavigate } from "react-router-dom";

export const RecentCourses = ({ recentCourses }) => {
  const navigate = useNavigate();

  // Функция для навигации к курсу по его ID
  const handleGoToCourse = (id) => navigate(`/course/${id}`);

  return (
    <div className="recent-courses">
      <div className="recent-courses-title">Сўнгги курслар</div>
      <div className="recent-courses-items-container">
        {recentCourses.map((course) => (
          <RecentCoursesCard
            onClick={() => handleGoToCourse(course._id)}
            key={`recent-courses-${course._id}`}
            title={course.title}
            img={course.image}
          />
        ))}
      </div>
    </div>
  );
};
