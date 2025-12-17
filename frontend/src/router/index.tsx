
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import HomePage from '../components/pages/HomePage'
import LoginPage from '../components/pages/LoginPage'
import SignupPage from '../components/pages/SignupPage'
import IntroPage from '../components/pages/IntroPage'
import DashboardLayout from '../components/layout/DashboardLayout'

function Router() {
  return  <BrowserRouter>
      <Routes>
        {/* Parent layout route */}
        <Route path="/" element={<App />}>
          {/* Nested route (index) */}
          <Route
            element={
             
                <DashboardLayout />
              
            }
          >
            <Route index element={<HomePage />} />
     
          
          </Route>

          {/* Auth routes */}
          <Route
            path="login"
            element={
              <LoginPage/>
            }
          />
          <Route
            path="signup"
            element={
              
                <SignupPage />
             
            }
          />
          <Route
            path="intro"
            element={
            
                <IntroPage />
              
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
}

export default Router