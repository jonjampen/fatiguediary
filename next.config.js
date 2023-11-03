/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env: {
        URL: process.env.URL,
    },
}

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);