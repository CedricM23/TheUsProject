import { Link } from "react-router";

export default function AboutUsView() {
    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl">
            <div className="card bg-base-100 shadow-xl border border-zinc-800 overflow-hidden p-5">

                <div className="card-body items-center text-center pt-0 px-6 pb-12">

                    <h2 className="card-title text-4xl font-bold">About</h2>
                    <h2 className="card-title text-4xl font-bold mb-2">The Us Project</h2>
                    <p className="text-primary font-semibold mb-6 flex items-center gap-2">
                        <span>♡</span> Built for couples, memories, and milestones <span>♡</span>
                    </p>

                    <div className="text-left text-zinc-600 space-y-4 max-w-xl mx-auto leading-relaxed my-4">
                        <p className="text-white">
                            Welcome to <span className="font-extrabold">The Us Project</span> your private digital scrapbook designed to capture all the little moments, big adventures, and everything in between that makes your relationship unique.
                        </p>
                        <p className="text-white">
                            Whether you're logging a spontaneous dinner date, tracking your shared movie and television watchlists, or saving special photos and notes, this space is built to keep your memories organized and alive.
                        </p>
                    </div>

                    <div className="divider max-w-md mx-auto my-6"></div>

                    <h3 className="text-xl font-bold text-base-content mb-4">What You Can Do Here</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full max-w-lg mb-8">
                        <div className="p-4 rounded-xl bg-base-200 border border-zinc-700/20">
                            <h4 className="font-bold text-primary mb-1">📅 Date Journal</h4>
                            <p className="text-sm text-zinc-500">Record locations, write journal entries, and attach photos and theme songs to your favorite dates.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-base-200 border border-zinc-700/20">
                            <h4 className="font-bold text-primary mb-1">🎬 Watchlists & Media</h4>
                            <p className="text-sm text-zinc-500">Keep track of movies and TV shows you want to watch together or have already enjoyed.</p>
                        </div>
                    </div>

                    <div className="card-actions flex-col justify-center mt-4">
                        <Link to="/signup" className="btn btn-primary px-8 w-full">
                            Create an account
                        </Link>
                        <Link to="/" className="btn btn-error px-8 w-full">
                            Back to Dashboard
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}