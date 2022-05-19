/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "ecosense-rest-api.herokuapp.com"
  },
  images: {
    domains: [
      'upload.wikimedia.org',
      'images.pexels.com',
      'randomuser.me'
    ]
  }
}

module.exports = nextConfig
