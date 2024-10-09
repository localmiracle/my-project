// client/src/pages/AdminPage/UsersAdminPage.js
import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser, getCourses } from '../../api';
import './UsersAdminPage.css';

const UsersAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    courses: [],
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    email: '',
    password: '',
    courses: [],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      console.log('Полученные пользователи:', data); // Логируем данные пользователей
      setUsers(data);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
      setMessage(error.error || 'Ошибка при загрузке пользователей.');
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      console.log('Полученные курсы:', data); // Логируем данные курсов
      setCourses(data);
    } catch (error) {
      console.error('Ошибка при загрузке курсов:', error);
      setMessage(error.error || 'Ошибка при загрузке курсов.');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { email, password, courses } = newUser;
    if (!email || !password) {
      setMessage('Email и пароль обязательны для заполнения.');
      return;
    }

    try {
      const data = await addUser({ email, password, courses });
      setMessage(data.message || 'Пользователь успешно добавлен.');
      setNewUser({ email: '', password: '', courses: [] });
      fetchUsers();
    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
      setMessage(error.error || 'Ошибка при добавлении пользователя.');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedUser({
      email: user.email,
      password: '',
      courses: user.courses ? user.courses.map((course) => (course ? course._id : '')) : [],
    });
  };

  const handleUpdateUser = async (id) => {
    const { password, courses } = editedUser;
    try {
      const data = await updateUser(id, { password, courses });
      setMessage(data.message || 'Пользователь успешно обновлен.');
      setEditingUser(null);
      setEditedUser({ email: '', password: '', courses: [] });
      fetchUsers();
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      setMessage(error.error || 'Ошибка при обновлении пользователя.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) return;
    try {
      const data = await deleteUser(id);
      setMessage(data.message || 'Пользователь успешно удален.');
      fetchUsers();
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      setMessage(error.error || 'Ошибка при удалении пользователя.');
    }
  };

  const handleCourseSelect = (e, setFunction) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFunction(selectedOptions);
  };

  return (
    <div className="users-admin-page">
      <h2>Управление пользователями</h2>

      <form onSubmit={handleAddUser} className="add-user-form">
        <label>Email пользователя:</label>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />

        <label>Пароль пользователя:</label>
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />

        <label>Курсы пользователя:</label>
        <select
          multiple
          value={newUser.courses}
          onChange={(e) => handleCourseSelect(e, (selected) => setNewUser({ ...newUser, courses: selected }))}
        >
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <button type="submit">Добавить пользователя</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h3>Список пользователей</h3>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            {editingUser && editingUser._id === user._id ? (
              <>
                <label>Изменить пароль:</label>
                <input
                  type="password"
                  placeholder="Новый пароль"
                  value={editedUser.password}
                  onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
                />
                <label>Курсы:</label>
                <select
                  multiple
                  value={editedUser.courses}
                  onChange={(e) => handleCourseSelect(e, (selected) => setEditedUser({ ...editedUser, courses: selected }))}
                >
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleUpdateUser(user._id)}>Сохранить</button>
                <button onClick={() => setEditingUser(null)}>Отмена</button>
              </>
            ) : (
              <>
                <p><strong>Email:</strong> {user.email}</p>
                <p>
                  <strong>Курсы:</strong>{' '}
                  {user.courses && user.courses.length > 0
                    ? user.courses
                        .map((course) => (course && course.title ? course.title : 'Название не указано'))
                        .join(', ')
                    : 'Нет курсов'}
                </p>
                <button onClick={() => handleEditUser(user)}>Редактировать</button>
                <button onClick={() => handleDeleteUser(user._id)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersAdminPage;
