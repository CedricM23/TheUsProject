import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification/Notification'

export default function RegisterView() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    let uploadedImagePath = null;

    if (imageFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', imageFile);
      // TODO: Replace with my Cloudinary upload preset and cloud name
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET_HERE'); 

      try {
        // TODO: Replace 'CLOUD_NAME_HERE' with actual cloud name
        const response = await fetch('https://api.cloudinary.com/v1_1/CLOUD_NAME_HERE/image/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        
        if (data.secure_url) {
          uploadedImagePath = data.secure_url;
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        // We removed the `return;` here! 
        // Now, if it fails, uploadedImagePath stays null, and the registration continues.
        console.warn("Failed to upload profile picture, using placeholder instead.", error);
      }
    }

    AuthService.register({ 
        firstName, 
        lastName, 
        email, 
        username, 
        password, 
        confirmPassword,
        role: 'USER',
        // Because uploadedImagePath is null if it fails (or if they didn't upload one), 
        // it will automatically use this default image!
        imagePath: uploadedImagePath || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    })
      .then(() => {
        setIsUploading(false);
        navigate('/login');
      })
      .catch((error) => {
        setIsUploading(false);
        const message = error.response?.data?.message || 'Registration failed.';
        setNotification({ type: 'error', message: message });
      });
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <div className="card bg-base-100 shadow-xl border border-zinc-800">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-2 justify-center">Join Us</h2>
          
          <p className="text-center text-sm mb-6">
            Create an account to start building your digital scrapbook.
          </p>

          <Notification notification={notification} clearNotification={() => setNotification(null)} />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center justify-center w-full mb-2">
              <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-zinc-500 bg-base-200 flex items-center justify-center overflow-hidden hover:bg-base-300 transition-colors cursor-pointer shadow-sm group">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-zinc-400 text-xs text-center font-semibold group-hover:text-zinc-300">Add<br/>Photo</span>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* First Name & Last Name */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="form-control w-full md:w-1/2">
                <label className="label"><span className="label-text font-bold">First Name</span></label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  required
                  autoFocus
                  onChange={event => setFirstName(event.target.value)}
                  className="input input-bordered w-full"
                  placeholder="First name"
                />
              </div>

              <div className="form-control w-full md:w-1/2">
                <label className="label"><span className="label-text font-bold">Last Name</span></label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  required
                  onChange={event => setLastName(event.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Email</span></label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={event => setEmail(event.target.value)}
                className="input input-bordered w-full"
                placeholder="your@email.com"
              />
            </div>

            {/* Username */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Username</span></label>
              <input
                type="text"
                id="username"
                value={username}
                required
                autoComplete="username"
                onChange={event => setUsername(event.target.value)}
                className="input input-bordered w-full"
                placeholder="Choose a username"
              />
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Confirm Password</span></label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                required
                onChange={event => setConfirmPassword(event.target.value)}
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button 
                type="submit" 
                disabled={isUploading}
                className="btn btn-primary w-full"
              >
                {isUploading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            
          </form>

          {/* Bottom Link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary font-bold">
                Sign in!
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}