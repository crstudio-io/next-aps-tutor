/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  // env: {
  //   HOST: "http://localhost:8080",
  // },
};

export default nextConfig;
