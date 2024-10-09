// client/src/pages/AdminPage/AdminPage.js
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="categories">Управление категориями</Link>
          </li>
          <li>
            <Link to="courses">Управление курсами</Link>
          </li>
          <li>
            <Link to="users">Управление пользователями</Link> {/* Новая ссылка */}
          </li>
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
