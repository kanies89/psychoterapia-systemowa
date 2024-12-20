import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface SVGLoaderProps {
    svgPath: string;
    replaceTextIds?: {
        [key: string]: string; // Mapping of element IDs to replacement texts
    };
    className?: string;
}

const MAX_CHARACTERS_PER_LINE = 20;

const SVGLoaderSectionTitle: React.FC<SVGLoaderProps> = ({ svgPath, replaceTextIds, className }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    const splitTextByWords = (text: string, maxLength: number): [string, string] => {
        if (text.length <= maxLength) {
            return [text, ''];
        }

        const words = text.split(' ');
        let firstLine = '';
        let secondLine = '';

        for (const word of words) {
            if ((firstLine + word).length <= maxLength) {
                firstLine += (firstLine ? ' ' : '') + word;
            } else {
                secondLine += (secondLine ? ' ' : '') + word;
            }
        }

        return [firstLine, secondLine];
    };

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
                            const textElement = svgDoc.querySelector(`#${id}`);

                            if (textElement) {
                                const svgElement = svgDoc.documentElement;
                                const svgWidth = parseFloat(svgElement.getAttribute('width') || '0');
                                const svgHeight = parseFloat(svgElement.getAttribute('height') || '0');

                                const [firstLine, secondLine] = splitTextByWords(text, MAX_CHARACTERS_PER_LINE);

                                // Create two <tspan> elements for the lines
                                const tspanFirstLine = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                                tspanFirstLine.textContent = firstLine;

                                const tspanSecondLine = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                                tspanSecondLine.textContent = secondLine;

                                // Calculate text positions
                                const lineHeight = 22; // Adjust line height as needed
                                const yPosition = svgHeight / 2 + 5 - (secondLine ? lineHeight / 2 : 0);

                                // Center-align text horizontally and vertically
                                tspanFirstLine.setAttribute('x', `${svgWidth / 2 + 7}`);
                                tspanFirstLine.setAttribute('y', `${yPosition}`);
                                tspanFirstLine.setAttribute('text-anchor', 'middle');

                                if (secondLine) {
                                    tspanSecondLine.setAttribute('x', `${svgWidth / 2 + 7}`);
                                    tspanSecondLine.setAttribute('y', `${yPosition + lineHeight}`);
                                    tspanSecondLine.setAttribute('text-anchor', 'middle');
                                }

                                // Clear existing children and append new tspans
                                textElement.textContent = ''; // Clear the existing content
                                textElement.appendChild(tspanFirstLine);
                                if (secondLine) {
                                    textElement.appendChild(tspanSecondLine);
                                }
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
        <ReactSVG
            className={className}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`}
        />
    );
};

export default SVGLoaderSectionTitle;
