import React, {MouseEvent, useEffect, useState} from 'react';
import {ReactSVG} from 'react-svg';

interface SVGLoaderProps {
    svgPath: string,
    replaceTextIds?: {
        [key: string]: string; // Mapping of element IDs to replacement texts
    },
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    className?: string
}

const SVGLoaderHour: React.FC<SVGLoaderProps> = ({svgPath, replaceTextIds, onClick, className}) => {
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
                                if (id === 'tspan1') { // Hour
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

export default SVGLoaderHour;
