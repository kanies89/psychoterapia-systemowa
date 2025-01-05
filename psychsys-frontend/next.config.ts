import type { NextConfig } from "next";

// Next.js configuration
const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    images: {
        domains: ['localhost', 'psychoterapia-systemowa.pl', 'psychsys-frontend-fde1b2b544e7.herokuapp.com/'], // Add other domains if necessary
    },
};
// next.config.js
module.exports = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY,
    },
};


export default nextConfig;
