// client/src/pages/AdminPage/CategoriesAdminPage.js
import React, { useState, useEffect } from 'react';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../api';
import './CategoriesAdminPage.css'; // Импортируем стили

const CategoriesAdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setMessage(error.error || 'Не удалось загрузить категории.');
      console.error('Ошибка при получении категорий:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setMessage('Название категории не может быть пустым.');
      return;
    }
    try {
      const data = await addCategory(newCategory.trim());
      setMessage(data.message);
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      setMessage(error.error || 'Произошла ошибка при добавлении категории.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту категорию?')) return;
    try {
      const data = await deleteCategory(id);
      setMessage(data.message);
      fetchCategories();
    } catch (error) {
      setMessage(error.error || 'Не удалось удалить категорию.');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditedName(category.name);
  };

  const handleUpdate = async (id) => {
    if (!editedName.trim()) {
      setMessage('Название категории не может быть пустым.');
      return;
    }
    try {
      const data = await updateCategory(id, editedName.trim());
      setMessage(data.message);
      setEditingCategory(null);
      setEditedName('');
      fetchCategories();
    } catch (error) {
      setMessage(error.error || 'Произошла ошибка при обновлении категории.');
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditedName('');
  };

  return (
    <div className="categories-admin-page">
      <h2>Управление категориями</h2>

      {/* Форма добавления новой категории */}
      <form onSubmit={handleAddCategory} className="add-category-form">
        <label htmlFor="category">Новая категория:</label>
        <input
          type="text"
          id="category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>

      {message && <p className="message">{message}</p>}

      {/* Список существующих категорий */}
      <h3>Существующие категории:</h3>
      <ul className="categories-list">
        {categories.map((cat) => (
          <li key={cat._id} className="category-item">
            {editingCategory && editingCategory._id === cat._id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => handleUpdate(cat._id)}>Сохранить</button>
                <button onClick={handleCancelEdit}>Отмена</button>
              </>
            ) : (
              <>
                <h4>{cat.name}</h4>
                <div className="category-actions">
                  <button onClick={() => handleEdit(cat)}>Редактировать</button>
                  <button onClick={() => handleDelete(cat._id)}>Удалить</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesAdminPage;
