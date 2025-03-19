/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [process.env.PROXY_URL, "unhqdt5ayffgdz1u.public.blob.vercel-storage.com"],
    },
  };
  
  export default nextConfig;