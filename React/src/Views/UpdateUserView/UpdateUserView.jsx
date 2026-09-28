import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/AuthService";

export default function UpdateUserView() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [notification, setNotification] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || "",
                firstName: user.firstName || "",
                lastName: user.lastName || ""
            });
            if (user.imagePath) {
                setImagePreview(user.imagePath);
            }
        }
    }, [user]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsUploading(true);
        setNotification(null);

        let uploadedImagePath = user?.imagePath || null;

        if (imageFile) {
            const uploadData = new FormData();
            uploadData.append('file', imageFile);
            // TODO: Replace with your Cloudinary upload preset and cloud name
            uploadData.append('upload_preset', 'YOUR_UPLOAD_PRESET_HERE');

            try {
                // TODO: Replace 'CLOUD_NAME_HERE' with actual cloud name
                const response = await fetch('https://api.cloudinary.com/v1_1/CLOUD_NAME_HERE/image/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                const data = await response.json();

                if (data.secure_url) {
                    uploadedImagePath = data.secure_url;
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                setIsUploading(false);
                setNotification({ type: 'error', message: 'Failed to upload profile picture.' });
                return;
            }
        }

        try {
            const updatePayload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                imagePath: uploadedImagePath
            };

            await AuthService.updateUser(user.id, updatePayload);
            setNotification({ type: 'success', message: 'Profile updated successfully!' });
        } catch (error) {
            console.error("Backend Error Response:", error.response?.data || error.message);
            setNotification({ type: 'error', message: 'Failed to save profile updates.' });
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl">
            <div className="card bg-base-100 shadow-xl border border-zinc-800">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6">Update Profile</h2>

                    {notification && (
                        <div className={`p-4 rounded-xl mb-4 text-sm font-bold ${notification.type === 'error' ? 'bg-red-900/20 text-red-400 border border-red-900/50' : 'bg-green-900/20 text-green-400 border border-green-900/50'}`}>
                            {notification.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Profile Picture Upload - Updated to match darker/neutral theme */}
                        <div className="flex flex-col items-center justify-center w-full mb-4">
                            <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-zinc-500 bg-base-200 flex items-center justify-center overflow-hidden hover:bg-base-300 transition-colors cursor-pointer shadow-sm group">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-zinc-400 text-xs text-center font-semibold group-hover:text-zinc-300">Add<br />Photo</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* First Name & Last Name Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-bold">First Name</span></label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-bold">Last Name</span></label>
                                <input
                                    type="text"
                                    name="lastName"
                                    place={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold">Email Address</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Action Buttons */}
                        {/* Main Action Buttons */}
                        <div className="form-control mt-6 flex flex-row gap-4 justify-center">
                            <button
                                type="button"
                                className="btn btn-ghost w-50"
                                onClick={() => navigate(-1)} // Goes back to the previous page
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary w-50"
                                disabled={isUploading}
                            >
                                {isUploading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                            </button>
                        </div>

                    </form>

                    {/* Danger Zone / Delete Account */}
                    <div className="mt-8 pt-6 border-t border-zinc-700/20">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Danger Zone</span>
                            <button
                                type="button" // Use type="button" so it doesn't accidentally submit the form
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                        // TODO: Call your delete account service here
                                    }
                                }}
                                className="btn btn-error btn-outline w-full"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
