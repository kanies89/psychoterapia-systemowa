import React, { ReactNode } from 'react';
import './styles/globals.css';
import './styles/fonts.css';
import './styles/ham_menu.css';

type DynamicTextProps = {
    weight: number | string; // Font weight can be a number (e.g., 400) or a string (e.g., "bold")
    style: 'normal' | 'italic'; // Font style options
    children: ReactNode; // For nested elements or text
};

const DynamicText: React.FC<DynamicTextProps> = ({ weight, style, children }) => {
    const fontStyle: React.CSSProperties = {
        fontFamily: 'Kodchasan',
        fontWeight: weight,
        fontStyle: style,
    };

    return <p style={fontStyle}>{children}</p>;
};

// Root Layout
const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <body className="bg-white flex justify-center items-start min-h-screen">
        {children}
        </body>
        </html>
    );
};

export {DynamicText};
export default RootLayout;
