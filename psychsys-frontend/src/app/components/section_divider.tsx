import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimate } from "framer-motion";

interface SectionDividerProps {
    id: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ id }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 1 });
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (inView) {
            animate(scope.current, { opacity: 1, x: 0 }, { duration: 2, ease: "easeOut" });
            animate(".divider", { scaleX: 1.2, scaleY: 1.1, backgroundColor: ["#96d1ba", "#58315a"] }, { type: "spring", stiffness: 300, damping: 8 });

        } else {
            animate(scope.current, { opacity: 0, x: 0 });
            animate(".divider", { scaleX: 0, backgroundColor: "#96d1ba" }, { type: "spring", stiffness: 300, damping: 8 });


        }
    }, [inView, animate, scope]);

    return (
        <div id={id} ref={ref} className="w-full flex flex-col justify-center items-center mt-10 mb-10 relative">

            <div ref={scope} className="opacity-0 -translate-x-12 flex items-center">

                <div className="divider bg-c1 h-2 w-40 rounded-full mx-2 drop-shadow-md"></div>

            </div>

        </div>
    );
};

export default SectionDivider;
