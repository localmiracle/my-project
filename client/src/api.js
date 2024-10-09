// client/src/api.js
import axios from 'axios';

// Получение базового URL из переменных окружения или по умолчанию
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Создание экземпляра axios с базовым URL
const api = axios.create({
  baseURL: API_URL,
  // Не устанавливайте заголовок 'Content-Type' для multipart/form-data, axios сам установит нужные границы
});

// Обработчик ошибок
const handleError = (error) => {
  if (error.response) {
    // Сервер ответил статусом, отличным от 2xx
    console.error('API Error:', error.response.data);
    return Promise.reject(error.response.data);
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    console.error('No response received:', error.request);
    return Promise.reject({ error: 'Нет ответа от сервера' });
  } else {
    // Произошла ошибка при настройке запроса
    console.error('Error setting up request:', error.message);
    return Promise.reject({ error: 'Ошибка при настройке запроса' });
  }
};

// Получение курсов по категории
export const getCoursesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/courses/category/${categoryId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Курсы API

export const getCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Добавление нового курса
export const addCourse = async (courseData) => {
  try {
    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('price', courseData.price);
    formData.append('categories', JSON.stringify(courseData.categories)); // Обязательно
    formData.append('image', courseData.image);
    if (courseData.pdf) {
      formData.append('pdf', courseData.pdf);
    }
    formData.append('recommendation', JSON.stringify(courseData.recommendation || []));

    const response = await api.post('/courses', formData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Обновление курса
export const updateCourse = async (id, courseData) => {
  try {
    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('price', courseData.price);
    formData.append('categories', JSON.stringify(courseData.categories)); // Обязательно
    if (courseData.image) {
      formData.append('image', courseData.image);
    }
    if (courseData.pdf) {
      formData.append('pdf', courseData.pdf);
    }
    formData.append('recommendation', JSON.stringify(courseData.recommendation || []));

    const response = await api.put(`/courses/${id}`, formData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


// Категории API (без изменений)

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addCategory = async (name) => {
  try {
    const response = await api.post('/categories', { name });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateCategory = async (id, name) => {
  try {
    const response = await api.put(`/categories/${id}`, { name });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Курсы API




// Удаление курса (без изменений)
export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Регистрация пользователя
export const registerUser = async (email, password) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Авторизация пользователя
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Получение текущего пользователя
export const getCurrentUser = async (token) => {
  try {
    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
// Функции API для пользователей
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
// Получение профиля текущего пользователя
export const getUserProfile = async (token) => {
  try {
    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Лайк курса
export const likeCourse = async (token, courseId) => {
  try {
    const response = await api.post(
      `/auth/like/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Удаление лайка курса
export const unlikeCourse = async (token, courseId) => {
  try {
    const response = await api.delete(`/auth/like/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};



// Добавление нового пользователя
export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Обновление данных пользователя
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Удаление пользователя
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Обновление настроек пользователя
export const updateUserSettings = async (token, settings) => {
  try {
    const response = await api.put('/auth/settings', settings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export default api;
