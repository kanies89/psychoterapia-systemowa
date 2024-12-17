import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface SVGLoaderProps {
    svgPath: string; // Path to the SVG file
    replaceTextIds?: {
        [key: string]: string; // Mapping of element IDs to replacement texts
    };
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Corrected type
}

const SVGLoaderHour: React.FC<SVGLoaderProps> = ({ svgPath, replaceTextIds, onClick }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch(svgPath);
                if (response.ok) {
                    const svgText = await response.text();

                    if (replaceTextIds) {
                        const parser = new DOMParser();
                        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

                        for (const [id, text] of Object.entries(replaceTextIds)) {
                            const tspanElement = svgDoc.querySelector(`#${id}`);

                            if (tspanElement) {
                                if (id === 'tspan4') { // Weekday abbreviation
                                    const date = new Date(text);
                                    const weekdayAbbr = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                                    tspanElement.textContent = weekdayAbbr;
                                } else if (id === 'tspan6') { // Formatted date
                                    const date = new Date(text);
                                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                                    tspanElement.textContent = formattedDate;
                                } else if (id === 'tspan2') { // Hour
                                    tspanElement.textContent = text;
                                }
                            } else {
                                console.error(`Element with id ${id} not found.`);
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
    }, [svgPath, replaceTextIds]);

    if (!svgContent) {
        return <p>Loading SVG...</p>;
    }

    return (
        <button onClick={onClick}>
            <ReactSVG
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`}
            />
        </button>
    );
};

export default SVGLoaderHour;
