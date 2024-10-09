// client/src/pages/CategoryPage/CategoryPage.js
import React, { useEffect, useState } from 'react';
import './CategoryPage.css';
import ChevronLeft from "../../assets/svg/chevron-left.svg";
import { CoursesBanners, RecentCourses } from "../../UI";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getCourses } from '../../api';

const CategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoHome = () => navigate('/');

  const [categoryName, setCategoryName] = useState('');
  const [recommendation, setRecommendation] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchCategoryName();
      fetchCategoryCourses();
    }
  }, [id]);

  const fetchCategoryName = async () => {
    try {
      const categories = await getCategories();
      const category = categories.find((cat) => cat._id === id);
      if (category) {
        setCategoryName(category.name);
      } else {
        setError('Категория не найдена');
      }
    } catch (error) {
      setError(error.error || 'Ошибка при получении категории.');
      console.error('Ошибка при получении категории:', error);
    }
  };

  const fetchCategoryCourses = async () => {
    try {
      const allCourses = await getCourses();
      // Фильтруем курсы по текущей категории
      const categoryCourses = allCourses.filter(
        (course) =>
          course.categories &&
          course.categories.some((cat) => cat._id === id)
      );
      // Сортируем курсы по дате создания
      const sortedCourses = categoryCourses.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      // Берём последние 4 курса для рекомендаций
      const lastFour = sortedCourses.slice(0, 4);
      setRecommendation(
        lastFour.map((course) => ({
          img: course.image,
          title: course.title,
          _id: course._id,
        }))
      );
      // Берём последние 4 курса для "Недавних курсов"
      const recent = sortedCourses.slice(0, 4);
      setRecentCourses(recent);
    } catch (error) {
      setError(error.error || 'Ошибка при получении курсов.');
      console.error('Ошибка при получении курсов:', error);
    }
  };

  return (
    <div className="category-page">
      <div className="back-home" onClick={handleGoHome}>
        <img src={ChevronLeft} alt="Назад" />
        Все курсы
      </div>
      <div className="category-page-title">{categoryName || 'Загрузка...'}</div>
      {error && <p className="error-message">{error}</p>}
      <CoursesBanners recommendation={recommendation} />
      <RecentCourses recentCourses={recentCourses} />
    </div>
  );
};

export default CategoryPage;
