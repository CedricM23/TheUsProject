import { useState, useEffect } from 'react'
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
import MediaDetailview from './Views/MediaDetailView/MediaDetailView'
import SearchResultsView from './Views/SearchResultsView/SearchResultsView'
import FavoritesView from './Views/FavoritesView/FavoritesView'
import BookmarksView from './Views/BookmarksView/BookmarksView'
import ListView from './Views/ListView/ListView'
import UpdateDateView from './Views/UpdateDateView/UpdateDateView'
import ProfileView from './Views/ProfileView/ProfileView'

const MainLayout = () => {
  return (
    <>
      <Navbar name="TheUsProject" />
      <Outlet />
    </>
  )
}

function App() {
  // 1. Synchronously load the user from local storage FIRST
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return JSON.parse(storedUser);
    }
    return null;
  });

  // 2. Validate the token in the background using useEffect
  useEffect(() => {
    if (user) {
      AuthService.getUserProfile(user.id)
        .then(() => {
          // Token is valid, do nothing
        })
        .catch((error) => {
          // Only log the user out if the token is explicitly rejected (401)
          // This prevents CORS or server downtime from wiping your local storage
          if (error.response && error.response.status === 401) {
            handleLogout();
          } else {
            console.error("Profile check failed, but session was kept:", error.message);
          }
        });
    }
  }, []); // The empty array ensures this check only runs once when the app mounts

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }

  return (
    <>
      <title>TheUsProject</title>
      <BrowserRouter>
        <UserContext.Provider value={user}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={user ? <DashboardView /> : <DashboardView />} />
              <Route path='/dates' element={<ProtectedRoute><DatesView /></ProtectedRoute>} />
              <Route path='dates/:id' element={<DateDetailView />} />
              <Route path="/logout" element={<LogoutView onLogout={handleLogout} />} />
              <Route path="/:id/:type" element={< MediaDetailview />}/>
              <Route path="/dates/new" element={<CreateDateView />} />
              <Route path="/search" element={<SearchResultsView />} />
              <Route path='/favorites' element={<FavoritesView/>} />
              <Route path='/watchlist' element={<BookmarksView/>} />
              <Route path='/lists' element={<ListView/>} />
              <Route path='/dates/edit/:id' element={<UpdateDateView/>} />
              <Route path='/profile' element={<ProfileView/>} />
            </Route>
            <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App