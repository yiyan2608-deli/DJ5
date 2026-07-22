/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 💡 必须加这一行，告诉 Next.js 导出静态 HTML 网页
  images: {
    unoptimized: true, // 💡 必须加这一行，禁用静态模式下不支持的图片优化
  },
};

export default nextConfig;
