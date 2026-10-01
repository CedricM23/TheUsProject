import { useState, useEffect } from "react";
import WatchedService from "../../services/WatchedService";
import NumberFlow from '@number-flow/react';

export default function WatchedHero() {
    const [stats, setStats] = useState({ totalWatched: 0, totalRuntime: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        WatchedService.getStats()
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to load watched stats", error);
                setLoading(false);
            });
    }, []);

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMins = minutes % 60;
        return `${hours}h ${remainingMins}m`;
    };

    return (
        <div className="hero bg-base-200 py-12 rounded-box shadow-md my-6 w-full max-w-5xl mx-auto">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">Your Watch History</h1>
                    <p className="py-4 text-base-content/70">
                        Keep track of everything you've watched and your total screen time. Tv shows currently do not add a runtime.
                    </p>

                    <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100">
                        <div className="stat place-items-center">
                            <div className="stat-title">Movies/Shows Watched</div>
                            <div className="stat-value text-primary">
                                <NumberFlow value={stats.totalWatched} />
                            </div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title">Total Runtime in minutes</div>
                            <div className="stat-value text-secondary">
                                <NumberFlow value={stats.totalRuntime} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}