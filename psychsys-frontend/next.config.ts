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
        domains: ['localhost', 'psychoterapia-systemowa.pl', 'psychsys-frontend-fde1b2b544e7.herokuapp.com'], // Add other domains if necessary
    },
};

export default nextConfig;
