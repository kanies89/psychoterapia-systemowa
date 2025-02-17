import React, { ReactNode } from 'react';
import './styles/globals.css';
import './styles/fonts.css';
import './styles/ham_menu.css';
import './styles/animation.css'

import GoogleRecaptchaWrapper from "@/app/components/GoogleReCaptchaWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Psychologia Systemowa Karina Sokołowska-Kaniewska',
    description: ''
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang={process.env.REACT_APP_LANGUAGE || 'en'}>
        <body className="bg-white flex flex-col justify-center items-center">
        <main className="w-full max-w-screen-lg">
            <GoogleRecaptchaWrapper>
                {children}
            </GoogleRecaptchaWrapper>
        </main>
        </body>
        </html>
    );
};

export default RootLayout;
