import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router";
import DatesService from "../../services/DatesService";
import { UserContext } from '../../context/UserContext';



export default function Navbar({ name }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const user = useContext(UserContext);


    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    function handleSubmit(event) {
        DatesService.getDateBy(event.target.value)
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to="/Dates">Dates</Link></li>
                            <li><a>{JSON.stringify(user)}</a></li>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">{user ? name : "TheUsProject"}</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/dates">Dates</Link></li>
                        <li>
                            <details>
                                <summary>Watchlist</summary>
                                <ul className="p-2 bg-base-100 w-40 z-1">
                                    <li><a>Want to Watch</a></li>
                                    <li><a>Currently Watching</a></li>
                                    <li><a>Watched</a></li>
                                    <li><a>Your Lists</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>About Us</a></li>
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <div className="flex items-center overflow-hidden">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Dates, Moves, Tv Shows"
                            className={`input input-sm transition-all duration-300 ease-in-out origin-right ${isSearchOpen
                                ? "w-32 md:w-60 opacity-100 input-bordered mr-2 px-3"
                                : "w-0 opacity-0 border-transparent p-0 pointer-events-none"
                                }`}
                            onBlur={() => setIsSearchOpen(false)}
                            onChange={handleSubmit}
                        />


                        <button
                            className="btn btn-ghost btn-circle"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>


                    {/* User */}
                    {user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li> <Link to="/logout">Logout</Link></li>
                        </ul>
                    </div>

                        :
                        // LOGIN BUTTON
                        <Link to="/login">
                            <button class="btn bg-white text-black border-[#e5e5e5]">
                                Login
                            </button>
                        </Link>


                    }

                </div>
            </div>
        </>
    )
}