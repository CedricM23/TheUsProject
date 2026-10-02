import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from '../../context/UserContext';

export default function Navbar({ name }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const user = useContext(UserContext);

    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    function handleSubmit(event) {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
            setIsSearchOpen(false); // Closes the search bar UI
            document.activeElement.blur(); // Dismisses the mobile keyboard
        }
    }

    return (
        <>
            {/* The navbar is inherently a positioning context because of sticky */}
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to="/Dates">Dates</Link></li>
                            <li><Link to="/favorites">Favorites</Link></li>
                            <li><Link to="/lists">Your Lists</Link></li>
                            <li><Link to="/watchlist">Watchlist</Link></li>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">{user ? name : "TheUsProject"}</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/dates">Dates</Link></li>
                        <li>
                            <details>
                                <summary>Library</summary>
                                <ul
                                    className="p-2 bg-base-100 w-40 z-1"
                                    onClick={(e) => {
                                        const detailsElement = e.target.closest('details');
                                        if (detailsElement) {
                                            detailsElement.removeAttribute('open');
                                        }
                                    }}
                                >
                                    <li><Link to="/favorites">Favorites</Link></li>
                                    <li><Link to="/lists">Your Lists</Link></li>
                                    <li><Link to="/watchlist">Watchlist</Link></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end gap-2">

                    {/* Search Bar - Removed overflow-hidden so the absolute dropdown works */}
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Movies, Tv Shows"
                            value={searchTerm}
                            className={`input transition-all duration-300 ease-in-out
                                /* Mobile styling: Slides down full-width from behind the navbar */
                                absolute left-0 w-full -z-10 bg-base-100 rounded-none shadow-md h-12 text-base px-4 border-x-0 border-t-0
                                ${isSearchOpen
                                    ? "top-full translate-y-0 opacity-100 pointer-events-auto border-b"
                                    : "top-full -translate-y-full opacity-0 pointer-events-none"
                                }
                                /* Desktop styling: Stays inline, expands horizontally */
                                md:static md:z-auto md:transform-none md:rounded-lg md:shadow-none md:bg-transparent md:origin-right md:h-8 md:text-sm
                                ${isSearchOpen
                                    ? "md:w-60 md:opacity-100 md:input-bordered md:mr-2"
                                    : "md:w-0 md:opacity-0 md:border-transparent md:px-0 md:pointer-events-none"
                                }
                            `}
                            onBlur={() => setIsSearchOpen(false)}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button
                            type="button"
                            className="btn btn-ghost btn-circle"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => {
                                if (isSearchOpen && searchTerm.trim() !== "") {
                                    // Submit if open and has text
                                    handleSubmit(e);
                                } else {
                                    // Otherwise just toggle the search bar
                                    setIsSearchOpen(!isSearchOpen);
                                }
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* User */}
                    {user ?
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Link to="/profile">
                                    <img
                                        src={user.imagePath || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        alt="User Avatar"
                                    />
                                </Link>
                            </div>
                        </div>
                        :
                        // LOGIN BUTTON
                        <Link to="/login">
                            <button className="btn bg-white text-black border-[#e5e5e5]">
                                Login
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}