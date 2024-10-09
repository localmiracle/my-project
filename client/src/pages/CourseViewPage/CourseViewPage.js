// client/src/pages/CourseViewPage/CourseViewPage.js
import React, { useEffect, useState } from 'react';
import './CourseViewPage.css';
import { useParams } from 'react-router-dom';
import { getCourseById, getCourses } from '../../api';
import { CurrentCourseCard } from '../../components';
import { CoursesBanners, PaymentModal } from '../../UI';

const CourseViewPage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [similarCourses, setSimilarCourses] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const data = await getCourseById(id);
      setCourseData(data);
      if (data.categories && data.categories.length > 0) {
        // Получаем идентификаторы категорий курса
        const categoryIds = data.categories.map((cat) => cat._id);
        fetchSimilarCourses(categoryIds);
      }
    } catch (error) {
      console.error('Ошибка при получении данных о курсе:', error);
    }
  };

  const fetchSimilarCourses = async (categoryIds) => {
    try {
      const allCourses = await getCourses();
      const filteredCourses = allCourses.filter((course) => {
        // Исключаем текущий курс
        if (course._id === id) return false;
        // Проверяем наличие общих категорий
        const courseCategoryIds = course.categories.map((cat) => cat._id);
        return courseCategoryIds.some((catId) => categoryIds.includes(catId));
      });
      const transformedCourses = filteredCourses.slice(0, 4).map((course) => ({
        img: course.image,
        title: course.title,
        _id: course._id,
      }));
      setSimilarCourses(transformedCourses);
    } catch (error) {
      console.error('Ошибка при поиске похожих курсов:', error);
    }
  };

  return (
    <div className="course-view-page">
      {visibleModal && <PaymentModal setVisibleModal={setVisibleModal} />}
      {courseData ? (
        <>
          <CurrentCourseCard setVisibleModal={setVisibleModal} item={courseData} />
          <div className="course-view-page-body">
            <div className="course-view-page-title">Похожие</div>
            {similarCourses.length > 0 ? (
              <CoursesBanners recommendation={similarCourses} />
            ) : (
              <p>Нет похожих курсов</p>
            )}
          </div>
        </>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default CourseViewPage;
