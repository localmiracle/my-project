import React, { useState, useEffect } from "react";
import "./Recommendations.css";
import { RecommendationCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../api"; // Импортируем API для получения курсов

export const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecentCourses(); // Вызываем функцию для получения курсов
  }, []);

  const fetchRecentCourses = async () => {
    try {
      const data = await getCourses(); // Получаем все курсы
      setRecommendation(data.slice(0, 4)); // Берём последние 4 курса
    } catch (error) {
      setError(error.error || "Ошибка при получении курсов.");
      console.error("Ошибка при получении курсов:", error);
    }
  };

  const handleGoToCourse = (id) => navigate(`/course/${id}`);

  return (
    <div className="recommendation">
      <div className="recommendation-title">Хусусиятли</div>
      {error && <p className="error-message">{error}</p>}
      
      {/* Контейнер для рекомендаций */}
      <div className="recommendation-container">
        {recommendation.map((item, index) => (
          <RecommendationCard
          onClick={() => handleGoToCourse(item._id)}
          key={`recom-${index}`}
          img={item.image} // Используем изображение курса
          title={item.title} // Используем название курса
          style={{ objectFit: "cover", width: "50%", height: "50%" }} // Стили для пропорций изображения
        />
        
        ))}
      </div>
      
      {/* Дотсы (точки для индикатора) 
      <div className="dots-container">
        {recommendation.map((_, index) => (
          <div
            key={`dots-container-${index}`}
            className={`dot ${index === 0 ? "active" : ""}`} // Активный класс для первой точки
            onClick={() => handleGoToCourse(recommendation[index]._id)}
          ></div>
        ))}
      </div>*/}
    </div>
  );
};
