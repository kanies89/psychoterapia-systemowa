import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

interface SVGLoaderProps {
    svgPath: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const HamburgerMenu: React.FC<SVGLoaderProps> = ({ svgPath, onClick, className }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch(svgPath);
                if (response.ok) {
                    const svgText = await response.text();
                    setSvgContent(svgText);
                } else {
                    console.error(`Failed to load SVG from ${svgPath}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadSVG();
    }, [svgPath]);

    if (!svgContent) {
        return (
            <button className="btn btn-square">
                <span className="loading loading-spinner"></span>
            </button>
        );
    }

    return (
        <button
            className="my-5"
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick(e);
            }}
        >
            <ReactSVG
                className={className}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`}
            />
        </button>
    );
};

export default HamburgerMenu;
