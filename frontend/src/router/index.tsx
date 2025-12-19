import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import IntroPage from "../components/pages/IntroPage";
import TasksPage from "../components/pages/TasksPage";
import EditProfilePage from "../components/pages/EditProfilePage";
import UserApp from "../UserApp";
import ProtectRoute from "../ProtectedRoute";
import RegistrationPage from "../components/pages/RegistrationPage";

function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            element={
              <ProtectRoute access="authenticated">
                <UserApp />
              </ProtectRoute>
            }
          >
            <Route index element={<HomePage />} />

            <Route path="tasks" element={<TasksPage />} />
            <Route path="edit-profile" element={<EditProfilePage />} />
          </Route>

          {/* Auth routes */}
          <Route path="login" element={<ProtectRoute access="guest" ><LoginPage /></ProtectRoute>} />
          <Route path="register" element={<ProtectRoute access="guest"><RegistrationPage/></ProtectRoute>} />
          <Route path="intro" element={<ProtectRoute access="guest"><IntroPage /></ProtectRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
