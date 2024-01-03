/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: [
        'puppeteer-extra', 
        'puppeteer-extra-plugin-stealth',
        'puppeteer-extra-plugin-recaptcha',
        '@sparticuz/chromium',
        'puppeteer-core',
        'puppeteer'
      ],
    },
  };
module.exports = nextConfig
