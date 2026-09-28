import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function EditPreferencesView() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [notification, setNotification] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const themeOptions = [
        { name: "light", label: "Classic Light", bg: "bg-white border-2 border-zinc-300" },
        { name: "dark", label: "Midnight Dark", bg: "bg-zinc-900 border-2 border-zinc-700" },
        { name: "cupcake", label: "Cupcake Pink", bg: "bg-pink-200 border-2 border-pink-400" },
        { name: "retro", label: "Retro Warm", bg: "bg-amber-100 border-2 border-amber-400" },
        { name: "synthwave", label: "Synthwave Neon", bg: "bg-purple-900 border-2 border-pink-500" },
        { name: "forest", label: "Forest Green", bg: "bg-emerald-800 border-2 border-emerald-600" },
    ];

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        isPublic: false,
        theme: "light"
    });

    function handleChange(e) {
        const { name, type, checked, value } = e.target;
        setPreferences(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function handleThemeSelect(themeName) {
        setPreferences(prev => ({ ...prev, theme: themeName }));
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSaving(true);
        setNotification(null);

        try {
            // e.g., await AuthService.updatePreferences(user.id, preferences);
            await new Promise(resolve => setTimeout(resolve, 500)); // simulated delay

            setNotification({ type: 'success', message: 'Preferences updated successfully!' });
        } catch (error) {
            console.error("Error saving preferences:", error);
            setNotification({ type: 'error', message: 'Failed to save preferences.' });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl">
            <div className="card bg-base-100 shadow-xl border border-zinc-800">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6">User Preferences</h2>

                    {notification && (
                        <div className={`p-4 rounded-xl mb-4 text-sm font-bold ${notification.type === 'error' ? 'bg-red-900/20 text-red-400 border border-red-900/50' : 'bg-green-900/20 text-green-400 border border-green-900/50'}`}>
                            {notification.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* Email Notifications Toggle */}
                        <div className="form-control flex flex-row items-center justify-between p-4 bg-base-200 rounded-xl border border-zinc-700/20">
                            <div>
                                <span className="label-text font-bold text-base">Email Notifications</span>
                                <p className="text-xs text-zinc-500">Receive reminders for upcoming dates and milestones.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={preferences.emailNotifications}
                                onChange={handleChange}
                                className="toggle toggle-primary"
                            />
                        </div>

                        {/* Profile Visibility Toggle */}
                        <div className="form-control flex flex-row items-center justify-between p-4 bg-base-200 rounded-xl border border-zinc-700/20">
                            <div>
                                <span className="label-text font-bold text-base">Public Scrapbook Profile</span>
                                <p className="text-xs text-zinc-500">Allow invited friends to view your shared date highlights.</p>
                            </div>
                            <input
                                type="checkbox"
                                name="isPublic"
                                checked={preferences.isPublic}
                                onChange={handleChange}
                                className="toggle toggle-primary"
                            />
                        </div>

                        {/* Theme Preference Selection */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold">App Theme Preference</span></label>
                            <select
                                name="theme"
                                value={preferences.theme}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="cupcake">Cupcake (Soft & Sweet)</option>
                            </select>
                        </div>

                        {/* Color picker */}
                        <div className="form-control w-full p-4 bg-base-200 rounded-xl border border-zinc-700/20">
                            <label className="label pt-0"><span className="label-text font-bold text-base">App Accent</span></label>
                            <p className="text-xs text-zinc-500 mb-4">Click a color bubble to instantly change the look and feel of your app.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {themeOptions.map((t) => (
                                    <button
                                        key={t.name}
                                        type="button"
                                        onClick={() => handleThemeSelect(t.name)}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${preferences.theme === t.name
                                                ? 'border-primary ring-2 ring-primary/50 bg-base-100 shadow-md font-bold'
                                                : 'border-zinc-700/20 bg-base-100/50 hover:bg-base-100'
                                            }`}
                                    >
                                        <span className={`w-6 h-6 rounded-full shadow-inner ${t.bg} flex items-center justify-center`}>
                                            {preferences.theme === t.name && (
                                                <span className="w-2 h-2 rounded-full bg-primary-content"></span>
                                            )}
                                        </span>
                                        <span className="text-sm">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Anniversary Date Picker */}
                        <div className="form-control w-full p-4 bg-base-200 rounded-xl border border-zinc-700/20">
                            <label className="label pt-0"><span className="label-text font-bold text-base flex items-center gap-2"><span>📅</span> Anniversary Date</span></label>
                            <p className="text-xs text-zinc-500 mb-3">Set your special day so the app can keep track of your milestone.</p>
                            
                            <div className="relative max-w-sm">
                                <input
                                    type="date"
                                    name="anniversaryDate"
                                    value={preferences.anniversaryDate}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-base-100 font-medium text-base-content cursor-pointer focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-control mt-4 flex flex-row gap-4">
                            <button
                                type="button"
                                className="btn btn-ghost w-1/3"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary w-2/3"
                                disabled={isSaving}
                            >
                                {isSaving ? <span className="loading loading-spinner"></span> : "Save Preferences"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}