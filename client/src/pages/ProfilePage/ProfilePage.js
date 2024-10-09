import React, { useState, useEffect, useContext } from "react";
import "./ProfilePage.css";
import { RecentCoursesCard } from "../../components";
import { useNavigate } from "react-router-dom";
import MyCoursesIcon from "../../assets/svg/my-courses.svg";
import LikesIcon from "../../assets/svg/like.svg";
import SettingsIcon from "../../assets/svg/settings.svg";
import ExitIcon from "../../assets/svg/exit.svg";
import { AuthContext } from "../../context/AuthContext"; // Импортируем контекст аутентификации
import { getCourseById } from "../../api"; // Импортируем API для получения курсов по ID

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Получаем данные пользователя и функцию выхода
  const [activeMenu, setActiveMenu] = useState("myCourses"); // Состояние для активного меню
  const [myCoursesData, setMyCoursesData] = useState([]); // Состояние для данных приобретенных курсов
  const [likedCoursesData, setLikedCoursesData] = useState([]); // Состояние для данных лайкнутых курсов

  // Обработчики переключения меню
  const handleMenuClick = (menu) => {
    if (menu === "logout") {
      logout();
      navigate("/sign-in");
    } else {
      setActiveMenu(menu);
    }
  };

  const handleGoToCourse = (id) => navigate(`/course/${id}`);

  // Функция для загрузки данных приобретенных курсов
  useEffect(() => {
    if (user && user.courses) {
      const fetchMyCourses = async () => {
        const coursesData = await Promise.all(
          user.courses.map((courseId) => getCourseById(courseId))
        );
        setMyCoursesData(coursesData);
      };
      fetchMyCourses();
    }
  }, [user]);

  // Функция для загрузки данных лайкнутых курсов
  useEffect(() => {
    if (user && user.likes) {
      const fetchLikedCourses = async () => {
        const coursesData = await Promise.all(
          user.likes.map((courseId) => getCourseById(courseId))
        );
        setLikedCoursesData(coursesData);
      };

      fetchLikedCourses();
    }
  }, [user]);

  return (
    <div className="profile-page">
      <div className="profile-page-left-side">
        {[
          { icon: MyCoursesIcon, title: "Мои курсы", key: "myCourses" },
          { icon: LikesIcon, title: "Лайки", key: "likes" },
          { icon: SettingsIcon, title: "Настройки", key: "settings" },
          { icon: ExitIcon, title: "Выход", key: "logout" },
        ].map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onClick={() => handleMenuClick(item.key)}
            style={{
              fontWeight: activeMenu === item.key ? "bold" : "normal",
              backgroundColor: activeMenu === item.key ? "rgb(255 255 255)" : "transparent",
              cursor: "pointer",
            }}
          >
            <img src={item.icon} alt={item.title} />
            <div
              style={{
                color: item.key === "logout" ? "#FF4A4A" : "black",
                marginLeft: "10px",
              }}
              className="menu-item-title"
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
      <div className="profile-page-right-side">
        {activeMenu === "myCourses" && (
          <>
            <h2>Мои Курсы</h2>
            {myCoursesData.length === 0 ? (
              <p>У вас пока нет приобретенных курсов.</p>
            ) : (
              myCoursesData.map((course) => (
                <RecentCoursesCard
                  key={course._id}
                  img={course.image || ''} // Используйте изображение курса, если доступно
                  title={course.title || 'Без названия'}
                  onClick={() => handleGoToCourse(course._id)}
                />
              ))
            )}
          </>
        )}

        {activeMenu === "likes" && (
          <>
            <h2>Лайки</h2>
            {likedCoursesData.length === 0 ? (
              <p>У вас пока нет лайкнутых курсов.</p>
            ) : (
              likedCoursesData.map((course) => (
                <RecentCoursesCard
                  key={course._id}
                  img={course.image || ''}
                  title={course.title || 'Без названия'}
                  onClick={() => handleGoToCourse(course._id)}
                />
              ))
            )}
          </>
        )}

        {activeMenu === "settings" && (
          <div>
            <h2>Настройки</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
