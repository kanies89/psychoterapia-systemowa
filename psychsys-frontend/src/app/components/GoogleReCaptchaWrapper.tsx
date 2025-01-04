"use client"
import { GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import React from "react";

export default function GoogleRecaptchaWrapper({
    children,
                                               }:{
    children: React.ReactNode;
                                               }) {
    const recaptchaKey: string | undefined = '6LePVqwqAAAAABj50TNS5cVYvfpInY5Cc5sET_Nb';
    console.log(recaptchaKey)
    return(
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            {children}
        </GoogleReCaptchaProvider>
    );
}