import { useState } from "react";
import { useNavigate } from "react-router";
import DatesService from "../../services/DatesService";
import SongSearch from "../../components/SongSearch";
import Autocomplete from "react-google-autocomplete";

export default function CreateDateView() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        dateTime: "",
        articleTitle: "",
        song: "",
        imageOfPlace: "",
        description: "", 
        scrapbookImageCaption: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const descriptionArray = formData.description
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        // Generate the fallback placeholder if the image field is left blank
        const finalImage = formData.imageOfPlace.trim() !== "" 
            ? formData.imageOfPlace 
            : `https://placehold.co/600x400/ffb6c1/ffffff?text=${encodeURIComponent(formData.name)}`;

        const payload = {
            ...formData,
            description: descriptionArray,
            imageOfPlace: finalImage
        };

        DatesService.createDateEvent(payload)
            .then((response) => {
                alert("Date event created successfully!");
                navigate("/dates"); 
            })
            .catch((error) => {
                console.error("Failed to create date", error);
                alert("There was an error saving your date event.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl">
            <div className="card bg-base-100 shadow-xl border border-zinc-800">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6">Log a New Date</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name (Required) */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-bold">Event Name*</span></label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    placeholder="e.g. Hibachi Group Dinner" 
                                    className="input input-bordered w-full" 
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Date & Time */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-bold">Date & Time</span></label>
                                <input 
                                    type="datetime-local" 
                                    name="dateTime"
                                    className="input input-bordered w-full" 
                                    value={formData.dateTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold">Location</span></label>
                            <input 
                                type="text" 
                                name="location"
                                placeholder="Kobe Japanese Steakhouse, Tampa" 
                                className="input input-bordered w-full" 
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Article Title */}
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-bold">Article Title</span></label>
                                <input 
                                    type="text" 
                                    name="articleTitle"
                                    placeholder="The Great Onion Volcano of 2026" 
                                    className="input input-bordered w-full" 
                                    value={formData.articleTitle}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-bold">Theme Song</span></label>
                                
                                <SongSearch 
                                    onSelectSong={(embedUrl) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            song: embedUrl
                                        }));
                                    }} 
                                />
                                {/* Hidden input ensures standard form submissions capture this state if needed */}
                                <input type="hidden" name="song" value={formData.song} />
                            </div>
                        </div>

                        {/* Description (Text Area) */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Description / Story</span>
                                <span className="label-text-alt text-zinc-500">Press Enter for new paragraphs</span>
                            </label>
                            <textarea 
                                name="description"
                                className="textarea textarea-bordered h-32 w-full" 
                                placeholder="Got a massive table for 15-16 of us.&#10;&#10;The chef was hilarious and the steak was cooked perfectly."
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Image URL */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold">Image URL</span></label>
                            <input 
                                type="url" 
                                name="imageOfPlace"
                                placeholder="https://..." 
                                className="input input-bordered w-full" 
                                value={formData.imageOfPlace}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Scrapbook Caption */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold">Scrapbook Caption</span></label>
                            <input 
                                type="text" 
                                name="scrapbookImageCaption"
                                placeholder="The whole crew gathered around the grill" 
                                className="input input-bordered w-full" 
                                value={formData.scrapbookImageCaption}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner"></span> : "Save Date"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}