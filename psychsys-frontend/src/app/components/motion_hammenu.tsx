import { useState, useRef, useEffect, ReactNode, cloneElement, ReactElement } from "react";
import { motion } from "framer-motion";
import * as React from "react";

interface HamMenuProps {
    children: ReactNode; // Injected content as children
    onNavigate?: (section: string) => void; // Optional
    variantMini?: boolean;
}

const MotionHamMenu: React.FC<HamMenuProps> = ({ children, onNavigate, variantMini=true }) => {
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

    // Pass onNavigate only if it's provided
    const childrenWithProps = React.Children.map(children, (child) =>
        React.isValidElement(child) ? cloneElement(child as ReactElement, { onNavigate }) : child
    );

    const barType = (variantMini: boolean) => variantMini ? "hamburger-bar-mini" : "hamburger-bar";
    const contType = (variantMini: boolean) => variantMini ? "hamburger-container-mini" :"hamburger-container";

    return (
        <div className="relative">
            <div onClick={toggleMenu} className={contType(variantMini)} ref={hamburgerRef}>
                <motion.div
                    className={barType(variantMini)}
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        translateY: isOpen ? height / 2 * 0.8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div className={barType(variantMini)} animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.2 }} />
                <motion.div
                    className={barType(variantMini)}
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        translateY: isOpen ? -height / 2 * 0.8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <motion.div
                className="dropdown-menu absolute right-0 shadow-lg z-50"
                ref={menuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {childrenWithProps}
            </motion.div>
        </div>
    );
};

export default MotionHamMenu;
