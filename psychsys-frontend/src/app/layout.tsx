import React, { ReactNode } from 'react';
import './styles/globals.css';
import './styles/fonts.css';
import './styles/ham_menu.css';

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

export default RootLayout;
