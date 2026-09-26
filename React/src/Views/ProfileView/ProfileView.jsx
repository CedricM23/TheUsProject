import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function ProfileView() {
    const user = useContext(UserContext);

    if (!user) {
        return (
            <div className="container mx-auto p-4 flex justify-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-xl">
            <div className="card bg-base-100 shadow-xl border border-zinc-800">
                <div className="card-body items-center text-center">
                    
                    <div className="avatar mb-4">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img 
                                src={user.profilePicture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                alt="User Avatar" 
                            />
                        </div>
                    </div>
                    
                    <h2 className="card-title text-3xl font-bold">{user.username || "User"}</h2>
                    <p className="text-zinc-400 mb-6">{user.email || "user@example.com"}</p>

                    <div className="flex w-full justify-center gap-8 border-t border-zinc-800 pt-6">
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-2xl">12</span>
                            <span className="text-zinc-500 text-sm uppercase tracking-wider">Dates</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-2xl">5</span>
                            <span className="text-zinc-500 text-sm uppercase tracking-wider">Lists</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-2xl">34</span>
                            <span className="text-zinc-500 text-sm uppercase tracking-wider">Saved</span>
                        </div>
                    </div>

                    <div className="card-actions mt-8 w-full flex-col gap-3">
                        <button className="btn btn-primary w-full">Edit Profile</button>
                        <button className="btn btn-primary w-full">Edit Preferences</button>
                        <Link to="/logout" className="btn btn-outline btn-error w-full">Logout</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}