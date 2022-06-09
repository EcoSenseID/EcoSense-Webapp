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
      'storage.googleapis.com',
      'static.dw.com',
      'scx2.b-cdn.net'
    ]
  }
}

module.exports = {
  ...nextConfig,
  publicRuntimeConfig: {
    version,
  },
}
