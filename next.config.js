// const nextTranslate = require('next-translate');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  },
};
