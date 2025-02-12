import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const MotionHamMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const hamburgerRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            console.log("Clicked outside!");

            // Check if the click is outside the hamburger or menu
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)
            ) {
                console.log("Click detected outside, closing menu.");
                setIsOpen(false);  // Close the menu
            }
        };

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            {/* Hamburger Menu */}
            <div
                onClick={toggleMenu}
                className="hamburger-container"
                ref={hamburgerRef}
            >
                <motion.div
                    className="hamburger-bar"
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        translateY: isOpen ? 10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    className="hamburger-bar"
                    animate={{
                        opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div
                    className="hamburger-bar"
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        translateY: isOpen ? -10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Dropdown Menu */}
            <motion.div
                className="dropdown-menu"
                ref={menuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <ul className="dropdown-content">
                    <li className="dropdown-item text-white hover:text-gray-200">Kwalifikacje</li>
                    <li className="dropdown-item text-white hover:text-gray-200">Jak dbać o siebie?</li>
                    <li className="dropdown-item text-white hover:text-gray-200">Jak wyglądają sesje terapii systemowej?</li>
                </ul>
            </motion.div>
        </div>
    );
};

export default MotionHamMenu;
