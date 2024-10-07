import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const intl = createNextIntlPlugin()
const nextConfig = {};

export default intl(nextConfig);
