export default function ComingSoonModal({ 
    id = "coming-soon", 
    title = "Coming Soon!", 
    message = "We are currently working on this feature. Check back later!" 
}) {
    return (
        <div className="modal" id={id} popover="auto">
            <div className="modal-box bg-base-100 shadow-xl relative z-50 text-center py-10">
                <h3 className="font-bold text-2xl mb-4 text-white">{title}</h3>
                <p className="text-zinc-400 mb-8 text-lg">{message}</p>
                
                <button 
                    type="button"
                    className="btn btn-primary px-8 rounded-full" 
                    popoverTarget={id}
                    popoverTargetAction="hide"
                >
                    Got it
                </button>
            </div>

            <div className="modal-backdrop fixed inset-0 bg-black/85 z-40">
                <button
                    type="button"
                    className="w-full h-full cursor-default text-transparent border-none bg-transparent"
                    popoverTarget={id}
                    popoverTargetAction="hide"
                >
                    close
                </button>
            </div>
        </div>
    );
}