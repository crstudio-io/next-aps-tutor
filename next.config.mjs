/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  output: "standalone",
  // env: {
  //   HOST: "http://localhost:8080",
  //   SECRET: "!t%9v2V-rTfAKt7:~vKmuiA~MxB4uNjK",
  // },
};

export default nextConfig;
