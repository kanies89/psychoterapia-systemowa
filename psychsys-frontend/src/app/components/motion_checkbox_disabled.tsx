import * as React from "react";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const tickVariants = {
    pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 }
};

const boxVariants = {
    hover: { scale: 1.05, strokeWidth: 60 },
    pressed: { scale: 0.95, strokeWidth: 35 },
    checked: { stroke: "#96d1ba" },
    unchecked: { stroke: "#ddd", strokeWidth: 50 },
};

interface CheckboxProps {
    size?: number;
    id?: string;
    className?: string; // Add className prop
}

export const CheckboxDisabled: React.FC<CheckboxProps> = ({ size = 50, id = "AT&C", className = "" }) => { // Accept className
    const [isChecked, setIsChecked] = useState(false);
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

    return (
        <motion.svg
            id={id}
            animate={isChecked ? "checked" : "unchecked"}
            width={size}
            height={size}
            viewBox="0 0 440 440"
            style={{ pointerEvents: "none", outline: "none" }} // Prevent clicking
            className={className} // Apply className here
        >
            <motion.path
                d="M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z"
                fill="transparent"
                strokeWidth="50"
                stroke="#96d1ba"
                variants={boxVariants}
            />
            <motion.path
                d="M 0 128.666 L 128.658 257.373 L 341.808 0"
                transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
                fill="transparent"
                strokeWidth="85"
                stroke="bg-gray-50"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={tickVariants}
                style={{ pathLength, opacity }}
            />
            <motion.path
                d="M 0 128.666 L 128.658 257.373 L 341.808 0"
                transform="translate(54.917 68.947) rotate(-4 170.904 128.687)"
                fill="transparent"
                strokeWidth="65"
                stroke="#7700FF"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={tickVariants}
                style={{ pathLength, opacity }}
            />
        </motion.svg>
    );
};

export default CheckboxDisabled;

/** Function to toggle the checkbox externally */
export const toggleCheckbox = () => {
    const checkboxElement = document.getElementById("AT&C");
    if (checkboxElement) {
        checkboxElement.setAttribute("animate", checkboxElement.getAttribute("animate") === "checked" ? "unchecked" : "checked");
    }
};
