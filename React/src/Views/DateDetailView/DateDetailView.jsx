import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router"; 
import DatesService from "../../services/DatesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash, faPen } from "@fortawesome/free-solid-svg-icons"; 
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";

export default function DateDetailView() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [scrapbookMode, setScrapbookMode] = useState(false);
    const [date, setDate] = useState({});

    useEffect(() => {
        DatesService.getDateEventById(id)
            .then((response) => setDate(response.data))
            .catch((error) => console.error("Error loading date:", error));
    }, [id]);

    const mapEmbedUrl = date.location 
        ? `https://www.google.com/maps?q=${encodeURIComponent(date.location)}&output=embed`
        : "";

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete this date? This cannot be undone.")) {
             DatesService.deleteDateEvent(id)
                .then(() => {
                    alert("Date deleted successfully.");
                    navigate("/dates"); 
                })
                .catch((error) => {
                    console.error("Failed to delete date", error);
                    alert("There was an error deleting this date.");
                });
        }
    }

    return (
        <>
            {scrapbookMode ? (
                <div className="max-w-[1400px] my-10 mx-auto px-4">
                    <div id='Scrapbook' className="relative bg-[#fdfbf7] rounded-sm p-6 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-zinc-200">
                        
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-end mb-12">
                            <div className="hidden lg:flex items-center justify-start flex-1">
                                <span className="mx-2.5 font-bold text-zinc-500 uppercase tracking-widest text-xs">Fancy</span>
                                <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                                <span className="mx-2.5 font-bold text-pink-500 uppercase tracking-widest text-xs">Scrapbook</span>
                            </div>

                            <div className="text-center relative">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/60 backdrop-blur-sm rotate-2 shadow-sm"></div>
                                <h2 className="text-pink-500 text-5xl md:text-6xl font-['Caveat',_cursive] transform -rotate-2 mt-4">
                                    {date.articleTitle}
                                </h2>
                            </div>

                            <h1 className="hidden lg:block flex-1"></h1>

                            <div className="flex lg:hidden mt-6 items-center">
                                <span className="mx-2.5 font-bold text-zinc-500 uppercase text-xs">Fancy</span>
                                <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                                <span className="mx-2.5 font-bold text-pink-500 uppercase text-xs">Scrapbook</span>
                            </div>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
                            
                            <div className="lg:col-span-5 flex flex-col gap-12 items-center">
                                
                                <div className="relative p-[15px_15px_60px_15px] bg-white shadow-xl transform -rotate-3 transition-transform hover:rotate-0 hover:scale-105 duration-300 w-full max-w-[400px]">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#e2e2e2] opacity-80 rotate-3 shadow-sm"></div>
                                    <img className="w-full aspect-square object-cover bg-zinc-200" src={date.imageOfPlace || "your-image.jpg"} alt={date.name} />
                                    <p className="text-zinc-700 mt-6 text-2xl font-['Caveat',_cursive] text-center leading-tight">
                                        {date.scrapbookImageCaption}
                                    </p>
                                </div>

                                {date.song && (
                                    <div className="relative bg-[#fef08a] p-6 shadow-lg transform rotate-2 w-full max-w-[350px]">
                                        <div className="absolute -top-3 left-4 w-16 h-6 bg-red-200/50 -rotate-6 shadow-sm"></div>
                                        <p className="font-['Caveat',_cursive] text-2xl text-zinc-800 mb-3 ml-2">Our song:</p>
                                        <iframe
                                            src={date.song}
                                            loading="lazy"
                                            className="w-full h-[150px] border-0 rounded-xl bg-white/50"
                                            allowFullScreen
                                            allow="encrypted-media *; fullscreen *; clipboard-write *;"
                                        ></iframe>
                                    </div>
                                )}
                            </div>

                            <div className="lg:col-span-7 flex flex-col gap-10">
                                
                                <div className="relative bg-white p-8 md:p-10 shadow-lg transform rotate-1 w-full rounded-sm">
                                    <div className="absolute top-0 bottom-0 left-8 w-[2px] bg-red-400/40"></div> 
                                    
                                    <div className="pl-6">
                                        <h3 className="text-4xl text-pink-500 font-['Caveat',_cursive] mb-2">{date.name}</h3>
                                        <p className="text-lg text-zinc-400 font-['Caveat',_cursive] mb-6">{date.datetime}</p>
                                        
                                        <div className="font-['Caveat',_cursive] text-2xl text-zinc-800 leading-[2.5rem] bg-[repeating-linear-gradient(transparent,transparent_39px,#e5e7eb_40px)] bg-local mt-2" style={{ backgroundPositionY: '8px' }}>
                                            {date.description?.length > 0 ? (
                                                date.description.map((paragraph, key) => (
                                                    <p className="pb-4" key={key}>{paragraph}</p>
                                                ))
                                            ) : (
                                                <p className="pb-4 italic text-zinc-400">No story written for this date yet...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {date.location && (
                                    <div className="relative p-3 bg-white shadow-xl transform rotate-2 w-full ml-auto lg:w-4/5">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 shadow-md border-2 border-red-700 z-10">
                                            <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full"></div>
                                        </div>
                                        <iframe
                                            className="w-full h-[300px] border-0 rounded-sm"
                                            src={mapEmbedUrl}
                                            loading="lazy"
                                        ></iframe>
                                        <p className="text-zinc-600 mt-3 text-xl font-['Caveat',_cursive] text-center">
                                            The room where it happened
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="flex justify-between items-center mt-6 px-4">
                        <div className="flex gap-6">
                            <Link to={`/dates/edit/${id}`} className="text-blue-500 hover:text-blue-400 transition-colors text-lg font-bold">
                                <FontAwesomeIcon icon={faPen} className="mr-2" />
                                Update Date
                            </Link>
                            <button onClick={handleDelete} className="text-red-500 hover:text-red-400 transition-colors text-lg font-bold">
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                Delete Date
                            </button>
                        </div>
                        <Link to='/dates' className="text-white no-underline text-lg hover:text-[#f48fb1] transition-colors font-bold">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm mr-2" />
                            Back to dates
                        </Link>
                    </aside>
                </div>
            ) : (
                <div id='Fancy' className="m-10 max-md:m-5">
                    <section>
                        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-end">
                            <div className="hidden lg:flex items-center justify-start flex-1">
                                <span className="mx-2.5">Fancy</span>
                                <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                                <span className="mx-2.5">Scrapbook</span>
                            </div>

                            <h2 className="text-center text-4xl -mb-2.5 font-['Libre_Baskerville',_serif]">
                                {date.name}
                            </h2>

                            <h1 className="hidden lg:block flex-1"></h1>

                            <div className="flex lg:hidden mt-2.5 items-center">
                                <span className="mx-2.5">Fancy</span>
                                <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                                <span className="mx-2.5">Scrapbook</span>
                            </div>
                        </div>

                        <section className="flex flex-col mt-8 ">
                            <p className="text-gray-600 mb-4 text-lg italic text-center">
                                {date.articleTitle} — {date.datetime}
                            </p>

                            <section className="flex flex-col lg:flex-row items-start">
                                <div className="text-center m-0 mx-2.5 lg:mx-[10px] rounded-[16px] p-4 shadow-[0_4px_12px_rgba(255,105,180,0.49)] w-full lg:w-auto">
                                    
                                    {date.song && (
                                        <>
                                            <p className="text-gray-600 mb-4 text-lg italic text-center">
                                                The song that reminds me of this date:
                                            </p>
                                            <div className="w-full lg:w-[600px]">
                                                <iframe
                                                    src={date.song}
                                                    loading="lazy"
                                                    className="w-full h-[150px] border-0 rounded-xl"
                                                    allowFullScreen
                                                    allow="encrypted-media *; fullscreen *; clipboard-write *;"
                                                ></iframe>
                                            </div>
                                        </>
                                    )}

                                    {date.location && (
                                        <>
                                            <p className="text-gray-600 mb-4 mt-5 text-lg italic text-center">Location:</p>
                                            <iframe
                                                className="w-full lg:w-[600px] h-[450px] border-0 rounded-[10px]"
                                                src={mapEmbedUrl}
                                                loading="lazy"
                                            ></iframe>
                                        </>
                                    )}
                                </div>
                                
                                <div className="mx-[15px] lg:mx-[80px] text-xl leading-snug font-['Libre_Baskerville',_serif] flex flex-col justify-start flex-1 mt-8 lg:mt-4">
                                    {date.description?.map((paragraph, key) => (
                                        <p className="text-left mb-6" key={key}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>
                        </section>
                    </section>

                    <aside className="flex justify-between items-center mt-12 px-4 lg:px-10">
                        <div className="flex gap-6">
                            <Link to={`/dates/edit/${id}`} className="text-blue-500 hover:text-blue-400 transition-colors text-lg font-bold">
                                <FontAwesomeIcon icon={faPen} className="mr-2" />
                                Update Date
                            </Link>
                            <button onClick={handleDelete} className="text-red-500 hover:text-red-400 transition-colors text-lg font-bold">
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                Delete Date
                            </button>
                        </div>
                        <Link to='/dates' className="text-white no-underline text-lg hover:text-[#f48fb1] transition-colors font-bold">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm mr-2" />
                            Back to dates
                        </Link>
                    </aside>
                </div>
            )}
        </>
    );
}