// client/src/UI/CoursesBanners/CoursesBanners.js
import React from 'react';
import './CoursesBanners.css';
import { CoursesBannerCard } from '../../components';
import { useNavigate } from 'react-router-dom';
 
export const CoursesBanners = ({ recommendation }) => {
  const navigate = useNavigate();
  const handleGoToCourse = (id) => navigate(`/course/${id}`);

  return (
    <div className="curses-banners">
      {recommendation.map((item) => (
        <CoursesBannerCard
          onClick={() => handleGoToCourse(item._id)} // Открываем курс по его ID
          key={`courses-banner-${item._id}`}
          img={item.img} // Используем 'img' вместо 'image'
          title={item.title}
        />
      ))}
    </div>
  );
};
