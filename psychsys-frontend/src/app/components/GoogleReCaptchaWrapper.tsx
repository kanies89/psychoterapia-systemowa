"use client"
import { GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import React from "react";

export default function GoogleRecaptchaWrapper({
    children,
                                               }:{
    children: React.ReactNode;
                                               }) {
    const recaptchaKey: string | undefined = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY;
    console.log(recaptchaKey)
    return(
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            {children}
        </GoogleReCaptchaProvider>
    );
}