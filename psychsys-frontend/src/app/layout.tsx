import React, { ReactNode } from 'react';
import './styles/fonts.css';
import './styles/ham_menu.css';
import './styles/animation.css';
import './styles/globals.css';

import GoogleRecaptchaWrapper from "@/app/components/GoogleReCaptchaWrapper";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: 'Psychologia Systemowa Karina Sokołowska-Kaniewska',
    description: 'Profesjonalne wsparcie psychologiczne oparte na systemowej psychologii.',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    // Also supported but less commonly used
    // interactiveWidget: 'resizes-visual',
}
const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang={process.env.NEXT_PUBLIC_LANGUAGE || 'en'}>
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
