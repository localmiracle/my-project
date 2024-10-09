// client/src/pages/AdminPage/CoursesAdminPage.js
import React, { useState, useEffect } from 'react';
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getCategories,
} from '../../api';
import './CoursesAdminPage.css';

const CoursesAdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    image: null,
    pdf: null,
    price: '',
    categories: [], // Массив для хранения выбранных категорий
    recommendation: [],
  });
  const [message, setMessage] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    title: '',
    image: null,
    pdf: null,
    price: '',
    categories: [], // Массив для хранения выбранных категорий
    recommendation: [],
  });

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      setMessage(error.error || 'Не удалось загрузить курсы.');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setMessage(error.error || 'Не удалось загрузить категории.');
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const { title, image, pdf, price, categories, recommendation } = newCourse;
    if (!title.trim() || !image || !price || categories.length === 0) {
      setMessage('Все поля обязательны для заполнения.');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      setMessage('Цена должна быть положительным числом.');
      return;
    }

    try {
      const courseData = {
        title: title.trim(),
        image: image,
        pdf: pdf,
        price: priceNumber,
        categories,
        recommendation,
      };
      const data = await addCourse(courseData);
      setMessage(data.message);
      setNewCourse({ title: '', image: null, pdf: null, price: '', categories: [], recommendation: [] });
      fetchCourses();
    } catch (error) {
      setMessage(error.error || 'Произошла ошибка при добавлении курса.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот курс?')) return;
    try {
      const data = await deleteCourse(id);
      setMessage(data.message);
      fetchCourses();
    } catch (error) {
      setMessage(error.error || 'Не удалось удалить курс.');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setEditedCourse({
      title: course.title || '',
      image: null,
      pdf: null,
      price: course.price !== undefined ? course.price.toString() : '',
      categories: course.categories.map((cat) => cat._id) || [],
      recommendation: course.recommendation.map((rec) => rec._id) || [],
    });
  };

  const handleUpdate = async (id) => {
    const { title, image, pdf, price, categories, recommendation } = editedCourse;
    if (!title.trim() || !price || categories.length === 0) {
      setMessage('Все поля обязательны для заполнения.');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      setMessage('Цена должна быть положительным числом.');
      return;
    }

    try {
      const courseData = {
        title: title.trim(),
        image: image,
        pdf: pdf,
        price: priceNumber,
        categories,
        recommendation,
      };
      const data = await updateCourse(id, courseData);
      setMessage(data.message);
      setEditingCourse(null);
      setEditedCourse({ title: '', image: null, pdf: null, price: '', categories: [], recommendation: [] });
      fetchCourses();
    } catch (error) {
      setMessage(error.error || 'Произошла ошибка при обновлении курса.');
    }
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setEditedCourse({ title: '', image: null, pdf: null, price: '', categories: [], recommendation: [] });
  };

  const handleFileChange = (e, setCourse) => {
    const file = e.target.files[0];
    if (file) {
      if (e.target.name === 'image') {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          setMessage('Разрешены только изображения (jpeg, jpg, png, gif).');
          setCourse(prev => ({ ...prev, image: null }));
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setMessage('Размер файла не должен превышать 5MB.');
          setCourse(prev => ({ ...prev, image: null }));
          return;
        }
        setCourse(prev => ({ ...prev, image: file }));
      } else if (e.target.name === 'pdf') {
        if (file.type !== 'application/pdf') {
          setMessage('Разрешены только PDF-файлы.');
          setCourse(prev => ({ ...prev, pdf: null }));
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          setMessage('Размер PDF-файла не должен превышать 10MB.');
          setCourse(prev => ({ ...prev, pdf: null }));
          return;
        }
        setCourse(prev => ({ ...prev, pdf: file }));
      }
    }
  };

  const handleCategoryChange = (e, setCourse) => {
    const options = e.target.options;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(options[i].value);
      }
    }
    setCourse((prev) => ({ ...prev, categories: selectedCategories }));
  };

  return (
    <div className="courses-admin-page">
      <h2>Управление курсами</h2>

      <form onSubmit={handleAddCourse} className="add-course-form">
        <h3>Добавить новый курс</h3>

        <label htmlFor="title">Название курса:</label>
        <input
          type="text"
          id="title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          required
        />

        <label htmlFor="image">Изображение курса:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setNewCourse)}
          required
        />

        <label htmlFor="pdf">PDF-файл курса:</label>
        <input
          type="file"
          id="pdf"
          name="pdf"
          accept="application/pdf"
          onChange={(e) => handleFileChange(e, setNewCourse)}
        />

        <label htmlFor="price">Цена:</label>
        <input
          type="number"
          id="price"
          step="0.01"
          min="0"
          value={newCourse.price}
          onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
          required
        />

        <label htmlFor="categories">Категории:</label>
        <select
          id="categories"
          multiple
          value={newCourse.categories}
          onChange={(e) => handleCategoryChange(e, setNewCourse)}
          required
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Поле для выбора рекомендаций (похожих курсов) */}

        <button type="submit">Добавить курс</button>
      </form>

      {message && <p className="message">{message}</p>}

      {/* Список существующих курсов */}
      <h3>Существующие курсы:</h3>
      <ul className="courses-list">
        {courses.map((course) => (
          <li key={course._id} className="course-item">
            {editingCourse && editingCourse._id === course._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editedCourse.title}
                  onChange={(e) =>
                    setEditedCourse({ ...editedCourse, title: e.target.value })
                  }
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setEditedCourse)}
                />
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e, setEditedCourse)}
                />
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  value={editedCourse.price}
                  onChange={(e) =>
                    setEditedCourse({ ...editedCourse, price: e.target.value })
                  }
                  required
                />
                <select
                  name="categories"
                  multiple
                  value={editedCourse.categories}
                  onChange={(e) =>
                    handleCategoryChange(e, setEditedCourse)
                  }
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {/* Поле для редактирования рекомендаций (похожих курсов) */}

                <button type="button" onClick={() => handleUpdate(course._id)}>Сохранить</button>
                <button type="button" onClick={handleCancelEdit}>Отмена</button>
              </>
            ) : (
              <>
                <h4>{course.title}</h4>
                {course.image && (
                  <img src={course.image} alt={course.title} className="course-image" />
                )}
                {/* Отображаем категории */}
                <p>
                  <strong>Категории:</strong>{' '}
                  {course.categories && course.categories.length > 0
                    ? course.categories.map((cat) => cat.name).join(', ')
                    : 'Нет категорий'}
                </p>
                {/* Отображаем рекомендации (похожие курсы) */}
                {course.recommendation.length > 0 && (
                  <p>
                    <strong>Похожие:</strong>{' '}
                    {course.recommendation.map((rec) => rec.title).join(', ')}
                  </p>
                )}
                <p>
                  <strong>Цена:</strong> {course.price}
                </p>
                {course.pdf && (
                  <p>
                    <strong>PDF:</strong> <a href={course.pdf} target="_blank" rel="noopener noreferrer">Скачать PDF</a>
                  </p>
                )}
                <button type="button" onClick={() => handleEdit(course)}>Редактировать</button>
                <button type="button" onClick={() => handleDelete(course._id)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesAdminPage;
