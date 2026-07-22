/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 必须加这一行，告诉 Next.js 导出静态 HTML
  images: {
    unoptimized: true, // 必须加这一行，禁用图片优化，否则打包报错
  },
};

export default nextConfig;
