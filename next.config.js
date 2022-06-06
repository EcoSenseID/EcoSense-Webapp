/** @type {import('next').NextConfig} */

const { version } = require('./package.json');

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "ecosense-bangkit.uc.r.appspot.com"
  },
  images: {
    domains: [
      'upload.wikimedia.org',
      'images.pexels.com',
      'randomuser.me',
      'storage.googleapis.com'
    ]
  }
}

module.exports = {
  ...nextConfig,
  publicRuntimeConfig: {
    version,
  },
}
