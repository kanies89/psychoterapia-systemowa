import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface SVGLoaderProps {
    svgPath: string,
    replaceTextIds?: {
        [key: string]: string; // Mapping of element IDs to replacement texts
    },
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    className?: string
}

const SVGLoaderDate: React.FC<SVGLoaderProps> = ({ svgPath, replaceTextIds, onClick, className }) => {
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
                                if (id === 'tspan1') { // Weekday abbreviation
                                    const date = new Date(text);
                                    const weekdayAbbr = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                                    tspanElement.textContent = weekdayAbbr;
                                } else if (id === 'tspan2') { // Formatted date
                                    const date = new Date(text);
                                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                                    tspanElement.textContent = formattedDate;
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
        return(
            <button className="btn btn-square">
                <span className="loading loading-spinner"></span>
            </button>);
    }

    return (
        <button className="my-5" onClick={(e) => {
            e.preventDefault();
            if (onClick) onClick(e);
        }}>
            <ReactSVG
                className={className}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`}
            />
        </button>
    );
};

export default SVGLoaderDate;
