import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface HamburgerMenuProps {
    svgPath: string; // Path to the SVG file
    pathStyles: { [pathId: string]: { fill?: string; stroke?: string } }; // Map of path IDs to style changes
    className?: string; // Optional CSS class for styling
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ svgPath, pathStyles, className }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch(svgPath);
                if (response.ok) {
                    const svgText = await response.text();

                    if (pathStyles) {
                        const parser = new DOMParser();
                        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

                        // Update style for paths specified in `pathStyles`
                        for (const [pathId, styles] of Object.entries(pathStyles)) {
                            const pathElement = svgDoc.querySelector(`#${pathId}`);
                            if (pathElement) {
                                const existingStyle = pathElement.getAttribute('style') || '';
                                const newStyle = Object.entries(styles)
                                    .map(([key, value]) => `${key}:${value}`)
                                    .join(';');
                                pathElement.setAttribute('style', `${existingStyle};${newStyle}`);
                            } else {
                                console.warn(`Path with ID "${pathId}" not found.`);
                            }
                        }

                        setSvgContent(new XMLSerializer().serializeToString(svgDoc.documentElement));
                    } else {
                        setSvgContent(svgText);
                    }
                } else {
                    console.error(`Failed to load SVG from ${svgPath}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadSVG();
    }, [svgPath, pathStyles]);

    if (!svgContent) {
        return <p>Loading SVG...</p>;
    }

    return (
        <ReactSVG
            className={className}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`}
        />
    );
};

export default HamburgerMenu;
