// client/src/pages/HomePage/HomePage.js
import React, { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import {
  Banner,
  Courses,
  CoursesBanners,
  RecentCourses,
  Recommendations,
} from "../../UI";
import Microphone from "../../assets/img/microphone.jpeg";
import Cow from "../../assets/img/cow.jpeg";
import Guitar from "../../assets/img/guitar.jpeg";
import { getCategories, getCourses } from '../../api';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const isAuth = !!user;
  const [categories, setCategories] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchRecentCourses(); // Получаем реальные курсы
    // Здесь вы можете добавить другие вызовы API для рекомендаций и последних курсов
    setRecommendation([
      {
        img: Microphone,
        title: "Қандай қилиб кулгили ҳазил қилишни ўрганиш керак",
      },
      { img: Cow, title: "Сигирни қандай қилиб тўғри соғиш керак" },
      { img: Guitar, title: "Консерт учун тўғри гитарани қандай танлаш мумкин" },
      {
        img: Microphone,
        title: "Қандай қилиб кулгили ҳазил қилишни ўрганиш керак",
      },
    ]);
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setError(error.error || 'Ошибка при получении категорий.');
      console.error('Ошибка при получении категорий:', error);
    }
  };

  const fetchRecentCourses = async () => {
    try {
      const data = await getCourses();
      console.log("Полученные курсы:", data); // Для отладки
      setRecentCourses(data.slice(0, 10)); // Берём первые 10 курсов
    } catch (error) {
      setError(error.error || 'Ошибка при получении курсов.');
      console.error('Ошибка при получении курсов:', error);
    }
  };

  return (
    <div className="home-page">
      {!isAuth && <Banner />}
      <div
        className="home-page-content"
        style={{ marginTop: isAuth ? "28px" : "0" }}
      >
        {error && <p className="error-message">{error}</p>}
        <Courses categories={categories} />

        <Recommendations recommendation={recommendation}/>

        <CoursesBanners recommendation={recommendation} />

        <RecentCourses recentCourses={recentCourses} />
      </div>
    </div>
  );
};

export default HomePage;
