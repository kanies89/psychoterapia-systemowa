import React, { ReactNode } from 'react';
import './styles/globals.css';
import './styles/fonts.css';
import './styles/ham_menu.css';
import GoogleRecaptchaWrapper from "@/app/components/GoogleReCaptchaWrapper";
import {Metadata} from "next";
import {AppointmentProvider} from "@/app/components/appointment_context";


export const metadata: Metadata={
    title: 'Psychologia Systemowa Karina Sokołowska-Kaniewska',
    description:''
}

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang={process.env.REACT_APP_LANGUAGE || 'en'}>
        <body className="bg-white flex justify-center items-start min-h-screen">
        <main>
            <AppointmentProvider>
            <GoogleRecaptchaWrapper>
                {children}
            </GoogleRecaptchaWrapper>
            </AppointmentProvider>
        </main>
        </body>
        </html>
    );
};

export default RootLayout;
