import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const MotionHamMenu = ({ onNavigate }: { onNavigate: (section: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const hamburgerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const updateHeight = () => {
            if (hamburgerRef.current) {
                setHeight(hamburgerRef.current.clientHeight);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", updateHeight);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div onClick={toggleMenu} className="hamburger-container" ref={hamburgerRef}>
                <motion.div
                    className="hamburger-bar"
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        translateY: isOpen ? height / 2 * 0.8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div className="hamburger-bar" animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
                <motion.div
                    className="hamburger-bar"
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        translateY: isOpen ? -height / 2 * 0.8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <motion.div
                className="dropdown-menu"
                ref={menuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <ul className="dropdown-content">
                    <li onClick={() => onNavigate("section1")}
                        className="dropdown-item text-white text-2xl hover:text-gray-200">
                        Kwalifikacje
                    </li>
                    <li onClick={() => onNavigate("section2")}
                        className="dropdown-item text-white text-2xl hover:text-gray-200">
                        Jak dbać o siebie?
                    </li>
                    <li onClick={() => onNavigate("section3")}
                        className="dropdown-item text-white text-2xl hover:text-gray-200">
                        Jak wyglądają sesje terapii systemowej?
                    </li>
                    <li onClick={() => onNavigate("section4")}
                        className="dropdown-item text-white text-2xl hover:text-gray-200">
                        Lokalizacja gabinetu
                    </li>
                    <li onClick={() => onNavigate("section5")}
                        className="dropdown-item text-white text-2xl hover:text-gray-200">
                        Wolne terminy
                    </li>
                    <li onClick={() => onNavigate("sectionEnd")}
                        className="dropdown-item text-white text-2xl hover:text-gray-200">
                        Stopka
                    </li>
                </ul>
            </motion.div>
        </div>
    );
};

export default MotionHamMenu;
