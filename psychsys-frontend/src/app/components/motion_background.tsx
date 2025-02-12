import React, { useEffect, useState, useRef } from "react";

const Trapezoids = ({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement> }) => {

    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0); // Initialize with 0

    const [scrollY, setScrollY] = useState(0);

    const numPoints = 6;
    const colors = ["#E45D4D", "#E99B4C", "#EEB35B", "#389497", "#1E364C"];

    const calculateTrapezoids = () => {
        const width = parentWidth;
        const topWidth = width * 0.15;
        const bottomWidth = width;
        const height = Math.max(parentHeight * 0.2 - scrollY, 0);

        const bottomX: number[] = [];
        const topX: number[] = [];

        for (let i = 0; i < numPoints; i++) {
            const bottomPoint = (i * bottomWidth) / (numPoints - 1);
            bottomX.push(bottomPoint);

            const topPoint = (i * topWidth) / (numPoints - 1) + (width - topWidth) / 2;
            topX.push(topPoint);
        }

        return bottomX.map((bx, index) => ({
            color: colors[index],
            points: [
                { x: bx, y: parentHeight },
                { x: topX[index], y: parentHeight - height },
                { x: topX[index + 1] || topX[index], y: parentHeight - height },
                { x: bottomX[index + 1] || bottomX[index], y: parentHeight }
            ],
            stripe: {
                x: topX[index],
                width: topX[index + 1] ? topX[index + 1] - topX[index] : 0,
                height: parentHeight - height,
            }
        }));
    };

    useEffect(() => {
        if (typeof window !== "undefined") {

            const updateHeight = (sectionRef: any) => {
                setParentHeight(sectionRef.current.clientHeight);
                setParentWidth(sectionRef.current.clientWidth);
            };

            updateHeight(sectionRef); // Initial height set

            window.addEventListener("resize", updateHeight);
            return () => window.removeEventListener("resize", updateHeight);
        }
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sectionRef]);

    const trapezoids = calculateTrapezoids();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${parentWidth} ${parentHeight}`} style={{ position: "absolute", bottom: 0 }}>
            {trapezoids.map((trapezoid, index) => {
                const pointsString = trapezoid.points.map(point => `${point.x},${point.y}`).join(" ");
                return (
                    <g key={index}>
                        <polygon points={pointsString} fill={trapezoid.color} />
                        {trapezoid.stripe.width > 0 && (
                            <rect x={trapezoid.stripe.x} y="0" width={trapezoid.stripe.width} height={trapezoid.stripe.height} fill={trapezoid.color} />
                        )}
                    </g>
                );
            })}
        </svg>
    );
};

export default Trapezoids;
