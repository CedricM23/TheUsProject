import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { UserContext } from "../../context/UserContext";
import DatesService from "../../services/DatesService";
import ListService from "../../services/ListService";
import FavoriteService from "../../services/FavoriteService";
import NumberFlow from '@number-flow/react'; 

export default function ProfileView() {
    const user = useContext(UserContext); 
    
    const [dates, setDates] = useState([]);
    const [lists, setLists] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        DatesService.getAllDateEvents().then(response => setDates(response.data));
        ListService.getMyLists().then(response => setLists(response.data));
        FavoriteService.getMyFavorites().then(response => setFavorites(response.data));
    }, []);

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
                                src={user.imagePath || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                alt="User Avatar"
                            />
                        </div>
                    </div>

                    <h2 className="card-title text-3xl font-bold">{user.firstName} {user.lastName}</h2>
                    <p className="text-zinc-400">@{user.username || "User"}</p>
                    <p className="text-zinc-400 mb-6">{user.email || "user@example.com"}</p>

                    <div className="flex w-full justify-center gap-8 border-t border-zinc-800 pt-6">
                        <div className="flex flex-col items-center w-16">
                            <span className="font-bold text-2xl">
                                <NumberFlow value={dates.length} />
                            </span>
                            <span className="text-zinc-500 text-sm uppercase tracking-wider">Dates</span>
                        </div>
                        <div className="flex flex-col items-center w-16">
                            <span className="font-bold text-2xl">
                                <NumberFlow value={lists.length} />
                            </span>
                            <span className="text-zinc-500 text-sm uppercase tracking-wider">Lists</span>
                        </div>
                        <div className="flex flex-col items-center w-20">
                            <span className="font-bold text-2xl">
                                <NumberFlow value={favorites.length} />
                            </span>
                            <span className="text-zinc-500 text-sm uppercase tracking-wider">Favorites</span>
                        </div>
                    </div>

                    <div className="card-actions mt-8 w-full flex-col gap-3">
                        <Link to='/user/update' className="btn btn-primary w-full">Edit Profile</Link>
                        <Link to='/preferences' className="btn btn-primary w-full">Edit Preferences</Link>
                        {user?.authorities?.some(auth => auth.name.includes("ADMIN")) && (
                            <Link to='/admin' className="btn btn-primary w-full">Admin Settings</Link>
                        )}
                        <Link to="/logout" className="btn btn-outline btn-error w-full">Logout</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}