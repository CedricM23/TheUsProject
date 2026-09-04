import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import Notification from '../../components/Notification/Notification'

export default function LoginView({ onLogin }) {

  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  // Setup state for the registration data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    AuthService.login({ username, password })
      .then((response) => {
        // Grab the user and token
        const user = response.data.user;
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Add the login data to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Use the callback to add user to state
        onLogin(user);

        // Navigate to the home page
        navigate('/');
      })
      .catch((error) => {
        // Check for a response message, but display a default if that doesn't exist
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message: message });
      });
  }

  return (
    <>
      <div className='m-10' onSubmit={handleSubmit}>
        <div>
          Login
        </div>
        <Notification notification={notification} clearNotification={() => setNotification(null)} />
        <form className='flex flex-col gap-2 w-100'>
          <input type="text" id="username" value={username} size="50" required autoFocus autoComplete="username" onChange={event => setUsername(event.target.value)} className='border'/>
          <input type="password" id="password" value={password} size="50" required onChange={event => setPassword(event.target.value)} className='border'/>
          <button type="submit" className='btn'>Sign in</button>
        </form>
      </div >
    </>
  );
}
