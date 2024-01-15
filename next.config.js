/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL: process.env.URL,
    },
}

module.exports = {
    trailingSlash: true,
}

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);