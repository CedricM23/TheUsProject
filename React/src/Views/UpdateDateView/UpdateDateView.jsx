import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import DatesService from "../../services/DatesService";
import SongSearch from "../../components/SongSearch";

export default function UpdateDateView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const locationInputRef = useRef(null);
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

    useEffect(() => {
        DatesService.getDateEventById(id)
            .then((response) => {
                const data = response.data;
                setFormData({
                    name: data.name || "",
                    location: data.location || "",
                    dateTime: data.dateTime || "",
                    articleTitle: data.articleTitle || "",
                    song: data.song || "",
                    imageOfPlace: data.imageOfPlace || "",
                    description: data.description ? data.description.join('\n\n') : "",
                    scrapbookImageCaption: data.scrapbookImageCaption || ""
                });
            })
            .catch((error) => console.error(error));
    }, [id]);

    useEffect(() => {
        const initAutocomplete = () => {
            if (!window.google || !locationInputRef.current) return;
            const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current, {
                types: ["establishment", "geocode"],
            });
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                const addressString = place.name && place.formatted_address 
                    ? `${place.name}, ${place.formatted_address}` 
                    : place.formatted_address || place.name;
                
                setFormData(prev => ({
                    ...prev,
                    location: addressString || ""
                }));
            });
        };

        if (!window.google) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.onload = initAutocomplete;
            document.head.appendChild(script);
        } else {
            initAutocomplete();
        }
    }, []);

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

        const finalImage = formData.imageOfPlace.trim() !== ""
            ? formData.imageOfPlace
            : `https://placehold.co/600x400/ffb6c1/ffffff?text=${encodeURIComponent(formData.name)}`;

        const payload = {
            ...formData,
            description: descriptionArray,
            imageOfPlace: finalImage
        };

        DatesService.updateDateEvent(id, payload)
            .then(() => {
                navigate(`/dates/${id}`);
            })
            .catch((error) => {
                console.error(error);
                alert("There was an error updating your date event.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl">
            <div className="card bg-base-100 shadow-xl border border-zinc-800">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6">Update Date</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold">Location</span></label>
                            <input
                                ref={locationInputRef}
                                type="text"
                                name="location"
                                placeholder="Kobe Japanese Steakhouse, Tampa"
                                className="input input-bordered w-full"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                <input type="hidden" name="song" value={formData.song} />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Description / Story</span>
                            </label>
                            <textarea
                                name="description"
                                className="textarea textarea-bordered h-32 w-full"
                                placeholder="Got a massive table for 15-16 of us."
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

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

                        <div className="form-control mt-6 flex flex-row gap-4">
                            <button
                                type="button"
                                className="btn btn-ghost w-1/3"
                                onClick={() => navigate(`/dates/${id}`)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary w-2/3" disabled={isLoading}>
                                {isLoading ? <span className="loading loading-spinner"></span> : "Update Date"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}