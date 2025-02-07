import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Angel1 from "../../../public/svg/h&b_1.svg";
import Angel2 from "../../../public/svg/h&b_2.svg";
import Angel3 from "../../../public/svg/h&b_3.svg";
import Angel4 from "../../../public/svg/h&b_4.svg";

const angelSVGs = [Angel1, Angel2, Angel3, Angel4];


const AnimateOnScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    const [angelIndex, setAngelIndex] = useState(0);

    // Scroll Event Handler (Optimized with requestAnimationFrame)
    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
                setScrollY(scrollPercentage);
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate angel index based on scroll position
    useEffect(() => {
        const cosValue = (Math.cos(scrollY * 25 * Math.PI * 2) + 1) * 1.5; // Oscillates between 0 and 3

        let index = 0;
        if (cosValue >= 1 && cosValue < 2) index = 1;
        else if (cosValue >= 2 && cosValue < 3) index = 2;

        setAngelIndex(index);
    }, [scrollY]);

    return (
        <motion.div className="svg-container">
            <motion.div
                className="svg-item active"
                animate={{
                    y: -scrollY * 6050,  // Controls vertical movement
                    scale: 1.5 + scrollY * 5,  // Scales as it moves

                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {React.createElement(angelSVGs[angelIndex])}
            </motion.div>
        </motion.div>
    );
};

export default AnimateOnScroll;
