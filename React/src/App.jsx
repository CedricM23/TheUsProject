import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import DatesView from './Views/DatesView/DatesView'
import DateDetailView from './Views/DateDetailView/DateDetailView'
import axios from 'axios'
import AuthService from './services/AuthService'
import { UserContext } from './context/UserContext';
import LoginView from './Views/LoginView/LoginView'
import LogoutView from './Views/LogoutView'
import CreateDateView from './Views/CreateDateView/CreateDateView'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardView from './Views/DashboardView/DashboardView'


  const MainLayout = () => {
    return (
      <>
        <Navbar name="TheUsProject" />
        {/* Outlet tells React Router where to render the child routes */}
        <Outlet />
      </>
    )
  }

function App() {
  const [user, setUser] = useState(() => getTokenFromStorage());

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    // Remove auth data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear auth token from axios
    delete axios.defaults.headers.common['Authorization'];

    // Clear the auth context
    setUser(null);
  }

  // When a user comes back to the app or refreshes the page, check for user/token in local storage and validate it
  function getTokenFromStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      // Set the token in the axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Make asynchronous API request to ensure token is still valid
      AuthService.getUserProfile(user.id)
        .then(() => {
          // Token is still valid, do nothing because user is already set to state
        })
        .catch(() => {
          // Token is not valid, act like user just logged out
          handleLogout();
        });

      // Return the user object, even if it's not validated yet
      return user;
    }
    // no user/token in local storage, return null
    return null;
  }

  return (
    <>
      <title>TheUsProject</title>
      <BrowserRouter>
        <UserContext.Provider value={user}>
          <Routes>
            <Route element={<MainLayout />}>
            <Route path='/' element={ user ? <DashboardView/> : ""} />
            <Route path='/dates' element={<ProtectedRoute>< DatesView /></ProtectedRoute>} />
            <Route path='dates/:id' element={<DateDetailView />} />
            <Route path="/logout" element={<LogoutView onLogout={handleLogout} />} /> 
            <Route path="/dates/new" element={<CreateDateView/>} /> 
            </Route>
            <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
