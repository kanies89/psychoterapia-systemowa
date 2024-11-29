import React, { useState, useEffect, useRef } from 'react';
import HamburgerIcon from '../../../public/svg/ham_menu.svg'; // Import SVG as React component

// Define a type for the possible path IDs, their corresponding fill colors, and rotation values
interface FillColors {
    path1425: { fill: string; rotation: string };
    path1426: { fill: string; rotation: string };
    path1427: { fill: string; rotation: string };
}

function HamburgerMenu() {
    // Initialize state to hold the color and rotation values for each path by id
    const [fillColors, setFillColors] = useState<FillColors>({
        path1425: { fill: '#ffffff', rotation: '0deg' }, // Default color and rotation for path1425
        path1426: { fill: '#ffffff', rotation: '0deg' }, // Default color and rotation for path1426
        path1427: { fill: '#ffffff', rotation: '0deg' }, // Default color and rotation for path1427
    });

    // Change color and rotation of a specific path
    const changeColorAndRotation = (pathId: keyof FillColors) => {
        setFillColors((prevColors) => {
            const currentColor = prevColors[pathId].fill;
            const newColor = currentColor === '#3498db' ? '#e74c3c' : '#3498db';
            const newRotation = prevColors[pathId].rotation === '0deg' ? '45deg' : '0deg'; // Toggle rotation between 0 and 45 degrees
            return {
                ...prevColors,
                [pathId]: { fill: newColor, rotation: newRotation },
            };
        });
    };

    // Use ref to access the SVG DOM elements directly
    const svgRef = useRef<SVGSVGElement | null>(null);

    // Apply dynamic styles based on path ids once the component is mounted
    useEffect(() => {
        if (svgRef.current) {
            const paths = svgRef.current.querySelectorAll('path');
            paths.forEach((path) => {
                const pathId = path.getAttribute('id');
                if (pathId && fillColors[pathId as keyof FillColors]) {
                    // Set fill color based on id
                    path.setAttribute('fill', fillColors[pathId as keyof FillColors].fill);
                    // Set rotation based on id
                    path.setAttribute('transform', `rotate(${fillColors[pathId as keyof FillColors].rotation} 25 25)`); // Rotate around the center (25, 25)
                }
            });
        }
    }, [fillColors]); // Re-run whenever fillColors changes

    return (
        <div>
            <HamburgerIcon
                ref={svgRef} // Attach the ref to access the SVG
                onClick={() => changeColorAndRotation('path1425')} // Change color and rotation of path1425 on click
            />
        </div>
    );
}

export default HamburgerMenu;
