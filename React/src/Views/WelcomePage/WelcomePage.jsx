import { Link } from "react-router";

export default function WelcomePage() {
    return (

        <div className="min-h-[100dvh] flex items-center justify-center p-4 bg-base-200">
            
            <div className="card bg-base-100 shadow-xl border border-zinc-800 w-full max-w-2xl overflow-hidden">
                
                {/* Cute Hero Section */}
                <figure className="pt-12 pb-4 bg-base-100">
                    <img
                        src="https://c.tenor.com/sdjiLWIMhN4AAAAC/tenor.gif"
                        alt="Teddy bear hug"
                        className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300"
                    />
                </figure>

                <div className="card-body items-center text-center pt-0 px-6 pb-12">
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content mt-4">
                        The Us Project
                    </h1>
                    
                    <h2 className="text-lg md:text-xl font-bold text-primary mt-3 flex items-center gap-2">
                        <span>♡</span> Our Digital Love Story <span>♡</span>
                    </h2>

                    <p className="text-base md:text-lg text-zinc-500 mt-6 max-w-md leading-relaxed">
                        Record your dates, save your favorite movies and shows, and capture all the little moments that make us, <span className="font-bold italic text-zinc-700">us</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
                        <Link to="/login" className="btn btn-primary w-full sm:w-48 text-lg">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-outline border-zinc-300 w-full sm:w-48 text-lg">
                            Create Account
                        </Link>
                    </div>

                    <div className="mt-10 flex items-center gap-2 text-sm text-zinc-400 font-medium rounded-2xl pointer-events-none">
                        <img 
                            src="https://media.tenor.com/R3U05e4hJgIAAAAi/cute-bear.gif" 
                            alt="tiny bear" 
                            className="w-6 h-6 object-cover rounded-full" 
                        />
                    </div>

                </div>
            </div>

        </div>
    );
}