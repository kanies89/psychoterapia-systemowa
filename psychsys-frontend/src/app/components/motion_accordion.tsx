import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
    title: string;
    children: React.ReactNode; // Injected content as children
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-5">
        <motion.div
            initial={false}
            animate={{ height: "auto" }}
            transition={{ type: "spring", stiffness: 180, damping: 20, mass: 1.1 }}
            style={{
                backgroundColor: "rgba(238, 238, 238)",
                padding: "1rem",
                borderRadius: 12,
                margin: "1rem 0",
                overflow: "hidden",
            }}
        >
            <button
                style={{
                    fontSize: "1.1em",
                    fontWeight: 500,
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.5 10L15.6714 21L27.5 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </button>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1rem",
                    gap: "1rem",
                    overflow: "hidden",
                }}
            >
                {children}

            </motion.div>
        </motion.div>
        </div>
    );
}

export default Accordion;