// client/src/routes/AppRoutes.js
import { useRoutes } from "react-router-dom";
import SignInPage from "../pages/SignInPage/SignInPage";
import BaseLayout from "../layout/BaseLayout/BaseLayout";
import HomePage from "../pages/HomePage/HomePage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import CourseViewPage from "../pages/CourseViewPage/CourseViewPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage"; // Подключаем админку
import CategoriesAdminPage from "../pages/AdminPage/CategoriesAdminPage";
import CoursesAdminPage from "../pages/AdminPage/CoursesAdminPage";
import UsersAdminPage from "../pages/AdminPage/UsersAdminPage"; 
function AppRoutes() {
  const routes = useRoutes([
    { path: "/sign-in", element: <SignInPage /> },
    {
      path: "/",
      element: (
        <BaseLayout>
          <HomePage />
        </BaseLayout>
      ),
    },
    {
      path: "/category/:id", // Убедитесь, что параметр называется 'id'
      element: (
        <BaseLayout>
          <CategoryPage />
        </BaseLayout>
      ),
    },
    {
      path: "/course/:id",
      element: (
        <BaseLayout>
          <CourseViewPage />
        </BaseLayout>
      ),
    },
    {
      path: "/profile",
      element: (
        <BaseLayout>
          <ProfilePage />
        </BaseLayout>
      ),
    },
    // Пути для админки
    {
      path: "/admin",
      element: <AdminPage />,
      children: [
        { path: "categories", element: <CategoriesAdminPage /> },
        { path: "courses", element: <CoursesAdminPage /> },
        { path: "users", element: <UsersAdminPage /> },
      ],
    },
  ]);

  return routes;
}

export default AppRoutes;
