declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            render: (element: string | HTMLElement, options: any) => void;
            execute: (siteKey: string, options?: any) => Promise<string>;
            reset: () => void;
            enterprise?: {
                ready: (callback: () => void) => void;
                execute: (siteKey: string, options?: any) => Promise<string>;
            };
        };
    }
}

export {};
