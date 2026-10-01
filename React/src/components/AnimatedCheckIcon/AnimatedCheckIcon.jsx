import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedCheckIcon({ isVisible, initial = true }) {
    return ( 
        <AnimatePresence initial={initial}>
            {isVisible && (
                <motion.svg
                    key="check-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 shrink-0 text-green-500"
                >
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            type: "tween",
                            duration: 0.5,
                            delay: 0.1,
                            ease: "easeInOut"
                        }}
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </motion.svg>
            )}
        </AnimatePresence>
    )
}