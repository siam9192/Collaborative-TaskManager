import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import SignupPage from "../components/pages/RegistrationPage";
import IntroPage from "../components/pages/IntroPage";
import TasksPage from "../components/pages/TasksPage";
import EditProfilePage from "../components/pages/EditProfilePage";
import UserApp from "../UserApp";
import ProtectRouted from "../ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            element={
              <ProtectRouted access="authenticated">
                <UserApp />
              </ProtectRouted>
            }
          >
            <Route index element={<HomePage />} />

            <Route path="tasks" element={<TasksPage />} />
            <Route path="edit-profile" element={<EditProfilePage />} />
          </Route>

          {/* Auth routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
          <Route path="intro" element={<IntroPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
