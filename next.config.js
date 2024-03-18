const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */

const path = require("path")

const nextConfig = {
   sassOptions: {
      includePaths: [path.join(__dirname, "styles")]
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "flagsapi.com",
            port: ""
         },
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            port: ""
         },
         {
            protocol: "http",
            hostname: "localhost",
            port: "8090"
         }
      ]
   }
}

module.exports = withNextIntl(nextConfig)
