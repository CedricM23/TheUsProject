import { useState } from "react";
import { useParams, Link } from "react-router";
import DatesService from "../../services/DatesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";

export default function DateDetailView() {
    const { id } = useParams();
    const [date] = useState(DatesService.getDateById(id));
    const [scrapbookMode, setScrapbookMode] = useState(false);

    return (
        <>
            {scrapbookMode ? (
                //========================== TRUE - SCRAPBOOK =======================
                <div id='Scrapbook' className="border-[12px] border-dashed border-[#f9b5d1] rounded-[18px] p-12 shadow-[0_10px_20px_rgba(0,0,0,0.15)] max-w-[1500px] my-8 mx-auto">
                    
                    <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-end">
                        <div className="hidden lg:flex items-center justify-start flex-1">
                            <span className="mx-2.5">Fancy</span>
                            <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                            <span className="mx-2.5">Scrapbook</span>
                        </div>
                        
                        <h2 className="text-[#f48fb1] text-center text-4xl -mb-2.5 font-['Caveat',_cursive]">
                            <span>🌸</span>{date.articleTitle}<span>🌸</span>
                        </h2>
                        
                        <h1 className="hidden lg:block flex-1"></h1>
                        
                        <div className="flex lg:hidden mt-2.5 items-center">
                            <span className="mx-2.5">Fancy</span>
                            <ToggleSwitch isOn={scrapbookMode} onToggle={setScrapbookMode} />
                            <span className="mx-2.5">Scrapbook</span>
                        </div>
                    </div>
                    
                    <section className="flex flex-col">
                        <p className="text-4xl text-[#f48fb1] text-center font-['Caveat',_cursive] -mt-0.5">
                            {date.name} — {date.datetime}
                        </p>
                    </section>
                    
                    {/* PHOTO AND MAP SECTION */}
                    <div className="flex flex-col xl:flex-row justify-evenly items-center xl:items-stretch mt-8">
                        {/* PHOTO SECTION */}
                        <section className="mb-[50px] xl:mb-0">
                            <div className="w-[300px] sm:w-[400px] h-auto p-[15px_15px_60px_15px] border border-[#BFBFBF] bg-white shadow-[5px_10px_10px_#aaaaaa] transform rotate-0 xl:-rotate-5">
                                <img className="w-full h-auto" src="your-image.jpg" alt="Image Description" />
                                <div className="p-2.5">
                                    <p className="text-gray-600 mb-4 text-lg italic text-center">
                                        {date.scrapbookImageCaption}
                                    </p>
                                </div>
                            </div>
                        </section>
                        
                        {/* MAP SECTION */}
                        <section className="w-[80%] xl:w-auto">
                            <div className="text-center">
                                <div>
                                    <p className="text-gray-600 mb-4 text-lg italic text-center">
                                        The room where it happened:
                                    </p>
                                </div>
                                <iframe 
                                    className="w-full xl:w-[600px] h-[450px] border-0 rounded-[10px]"
                                    src={date.location}
                                    loading="eager"
                                ></iframe>
                            </div>
                        </section>
                    </div>

                    {/* CASSETTE PLAYER */}
                    <div className="flex justify-center">
                        <div className="flex flex-col h-[200px] w-fit items-center mt-5 border border-gray-500 p-2.5 rounded-[25px] bg-[#f8f8fa]">
                            <div className="mb-5">The song that reminds me of this date:</div>
                            <iframe 
                                src={date.song}
                                loading="eager"
                                className="h-full border-0"
                                allowFullScreen 
                                allow="encrypted-media *; fullscreen *; clipboard-write *;" 
                            ></iframe>
                        </div>
                    </div>
                </div>
            ) : (
                // ================ FALSE - FANCY ======================
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
                            
                            <section className="flex flex-col lg:flex-row">
                                <div className="text-center m-0 mx-2.5 lg:mx-[10px] rounded-[16px] p-4 shadow-[0_4px_12px_rgba(255,105,180,0.49)] h-full">
                                    <p className="text-gray-600 mb-4 text-lg italic text-center">
                                        The song that reminds me of this date:
                                    </p>
                                    <div>
                                        <iframe 
                                            src={date.song}
                                            loading="eager"
                                            className="w-full h-full border-0"
                                            allowFullScreen 
                                            allow="encrypted-media *; fullscreen *; clipboard-write *;" 
                                        ></iframe>
                                    </div>
                                    <p className="text-gray-600 mb-4 mt-5 text-lg italic text-center">Location:</p>
                                    <iframe 
                                        className="w-full lg:w-[600px] h-[450px] border-0 rounded-[10px]"
                                        src={date.location}
                                        loading="eager"
                                    ></iframe>
                                </div>
                                
                                <div className="mx-[15px] lg:mx-[80px] text-xl leading-snug font-['Libre_Baskerville',_serif] flex flex-col justify-center mt-8 lg:mt-0">
                                    {date.Description.map((paragraph, key) => (
                                        <p className="text-left mb-4" key={key}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>
                        </section>
                    </section>
                    
                    <aside className="text-right bottom-0 mt-8">
                        <Link to='/dates' className="text-black no-underline text-lg hover:underline">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm mr-1.5" />
                            Back to dates
                        </Link>
                    </aside>
                </div>
            )}
        </>
    );
}