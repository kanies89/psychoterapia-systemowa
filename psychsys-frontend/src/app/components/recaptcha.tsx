import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

type ReCaptchaComponentProps = {
    onToken: (token: string) => Promise<void>;
};

const ReCaptchaComponent: React.FC<ReCaptchaComponentProps> = ({ onToken }) => {
    const [token, setToken] = useState<string | null>(null);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleRecaptcha = async (value: string | null) => {
        if (!value) return;

        setToken(value);  // Save the reCAPTCHA token

        try {
            await onToken(value);  // Call the provided callback with the token
        } catch (error) {
            console.error('reCAPTCHA verification failed', error);
        }
    };

    useEffect(() => {
        const checkRecaptcha = () => {
            if (!window.grecaptcha) {
                console.error("reCAPTCHA script not loaded. Retrying...");
                setTimeout(checkRecaptcha, 1000); // Retry after 1 second
            }
        };

        checkRecaptcha();

        if (modalRef.current) {
            modalRef.current.addEventListener('shown.bs.modal', () => {
                window.grecaptcha.render('RecaptchaField', { 'sitekey': '6Lco56kqAAAAAORRxkkO519NT7I9xZ8V2foUS6fe' });
            });

            modalRef.current.addEventListener('hide.bs.modal', () => {
                const recaptchaElement = document.getElementById('RecaptchaField');
                if (recaptchaElement) recaptchaElement.innerHTML = '';
            });
        }
    }, []);

    return (
        <div
            id="RecaptchaField"
            className="g-recaptcha"
            data-sitekey="6Lco56kqAAAAAORRxkkO519NT7I9xZ8V2foUS6fe"
            onClick={() => handleRecaptcha(token)}
        ></div>
    );
};

export default ReCaptchaComponent;
