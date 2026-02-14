const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const path = require('path')

const nextConfig = {
   sassOptions: {
      includePaths: [path.join(__dirname, 'styles')]
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'flagsapi.com',
            port: ''
         },
         {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: ''
         },
         {
            protocol: 'http',
            hostname: 'localhost',
            port: '8090'
         },
         {
            protocol: 'http',
            hostname: '104.248.61.4',
            port: '801'
         }
      ]
   }
}

module.exports = withNextIntl(nextConfig)
