import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import Notification from '../../components/Notification/Notification'

export default function LoginView({ onLogin }) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    AuthService.login({ username, password })
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        onLogin(user);

        navigate('/');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message: message });
      });
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <div className="card bg-base-100 shadow-xl border border-zinc-800">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-6 justify-center">Welcome Back</h2>

          <Notification notification={notification} clearNotification={() => setNotification(null)} />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Username</span></label>
              <input
                type="text"
                id="username"
                value={username}
                required
                autoFocus
                autoComplete="username"
                onChange={event => setUsername(event.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Password</span></label>
              <input
                type="password"
                id="password"
                value={password}
                required
                onChange={event => setPassword(event.target.value)}
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Sign in
              </button>
            </div>
            
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account yet?{' '}
              <Link to="/signup" className="link link-primary font-bold">
                Create one!
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}