import { useState, useEffect } from "react";
import axios from "axios";

export default function SongSearch({ onSelectSong }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    // Live search effect that runs as you type
    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            return;
        }

        // Wait 500ms after the user stops typing to prevent spamming the API
        const delayDebounceFn = setTimeout(() => {
            setIsSearching(true);
            
            axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`)
                .then(response => {
                    setResults(response.data.results);
                })
                .catch(error => console.error("Error searching songs:", error))
                .finally(() => setIsSearching(false));
                
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    function handleSelect(track) {
        setSelectedTrack(track); // Save the track to state to render the preview
        setResults([]);          // Clear the dropdown
        setQuery("");            // Clear the search bar

        // Construct the Apple Music embed URL and send it to the parent form
        const embedUrl = `https://embed.music.apple.com/us/album/${track.collectionId}?i=${track.trackId}`;
        onSelectSong(embedUrl);
    }

    return (
        <div className="relative w-full">
            {selectedTrack ? (
                // 1. If a song is selected, show the actual playable widget inside the form!
                <div className="flex flex-col gap-3">
                    <iframe 
                        allow="autoplay *; encrypted-media *;" 
                        frameBorder="0" 
                        height="150" 
                        className="w-full rounded-xl shadow-lg border border-zinc-800"
                        style={{ maxWidth: '660px', overflow: 'hidden', background: 'transparent' }} 
                        src={`https://embed.music.apple.com/us/album/${selectedTrack.collectionId}?i=${selectedTrack.trackId}`}
                    ></iframe>
                    
                    <button 
                        type="button" 
                        className="btn btn-outline btn-error btn-sm w-full"
                        onClick={() => {
                            setSelectedTrack(null);
                            onSelectSong(""); // Tell the parent form to clear the URL
                        }}
                    >
                        Choose a different song
                    </button>
                </div>
            ) : (
                // 2. If no song is selected, show the live search bar
                <>
                    <input
                        type="text"
                        placeholder="Type a song or artist name..."
                        className="input input-bordered w-full"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    
                    {isSearching && (
                        <span className="loading loading-dots loading-sm absolute right-3 top-3"></span>
                    )}

                    {/* Live Search Results Dropdown */}
                    {results.length > 0 && (
                        <ul className="absolute z-50 w-full bg-base-100 border border-zinc-700 rounded-box shadow-xl max-h-60 overflow-y-auto mt-2">
                            {results.map((track) => (
                                <li 
                                    key={track.trackId} 
                                    className="p-3 hover:bg-base-200 cursor-pointer flex items-center gap-3 border-b border-zinc-800 last:border-0 transition-colors"
                                    onClick={() => handleSelect(track)}
                                >
                                    <img 
                                        src={track.artworkUrl100} 
                                        alt="cover" 
                                        className="w-12 h-12 rounded-md object-cover shadow-sm" 
                                    />
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-bold text-sm truncate">{track.trackName}</span>
                                        <span className="text-xs text-zinc-400 truncate">{track.artistName}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}