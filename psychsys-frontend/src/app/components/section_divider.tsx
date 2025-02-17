import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionDividerProps {
    id: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ id }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

    return (
        <motion.div
            id={id}
            ref={ref}
            className="w-full flex justify-center items-center mt-10 mb-10"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <div className="badge badge-accent bg-c1 w-20 border-0 rounded-badge shadow-s1"></div>
            </motion.div>
        </motion.div>
    );
};

export default SectionDivider;