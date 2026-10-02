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
import WelcomePage from './Views/WelcomePage/WelcomePage'
import RegisterView from './Views/RegisterView/RegisterView'
import UpdateUserView from './Views/UpdateUserView/UpdateUserView'
import { Navigate } from 'react-router'
import AdminDashboardView from './Views/AdminDashboardView/AdminDashboardView'
import AboutUsView from './Views/AboutUsView/AboutUsView'
import EditPreferencesView from './Views/EditPreferencesView/EditPreferencesView'
import ForbiddenPage from './Views/ForbiddenPage/ForbiddenPage'

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
  const [statusMessage, setStatusMessage] = useState(false)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return JSON.parse(storedUser);
    }
    return null;
  });

  useEffect(() => {
    AuthService.statuscheck()
      .then((response) => {
        if (response == null) {
          setStatusMessage(true)
        }
      })

    if (user) {
      AuthService.getUserProfile(user.id)
        .then(() => {
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleLogout();
          } else {
            console.error("Profile check failed, but session was kept:", error.message);
          }
        });
    }
  }, []);

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
        {statusMessage &&
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! Server is down for maintenance.</span>
          </div>
        }
        <UserContext.Provider value={user}>
          <Routes>

            <Route path='/welcome' element={user ? <Navigate to="/" /> : <WelcomePage />} />
            <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
            <Route path='/signup' element={<RegisterView />} />
            <Route path='/aboutus' element={<AboutUsView />} />
            <Route path='/access-denied' element={<ForbiddenPage />} />

            <Route element={<MainLayout />}>


              <Route path='/' element={user ? <DashboardView /> : <Navigate to="/welcome" />} />

              <Route path='/dates' element={<ProtectedRoute><DatesView /></ProtectedRoute>} />
              <Route path='dates/:id' element={<DateDetailView />} />
              <Route path="/logout" element={<LogoutView onLogout={handleLogout} />} />
              <Route path="/:id/:type" element={<MediaDetailview />} />
              <Route path="/dates/new" element={<CreateDateView />} />
              <Route path="/search" element={<SearchResultsView />} />
              <Route path='/favorites' element={<FavoritesView />} />
              <Route path='/watchlist' element={<BookmarksView />} />
              <Route path='/lists' element={<ListView />} />
              <Route path='/dates/edit/:id' element={<UpdateDateView />} />
              <Route path='/profile' element={<ProfileView />} />
              <Route path='/user/update' element={<UpdateUserView />} />
              <Route path='/admin' element={<AdminDashboardView />} />
              <Route path='/preferences' element={<EditPreferencesView />} />
            </Route>

          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App