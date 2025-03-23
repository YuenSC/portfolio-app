import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // assetPrefix: "https://campaign.mcdonalds.com.hk/en/promotions/ShakeAndDip/",
  images: {
    unoptimized: true,
  },

  // images: {
  //   loader: "custom",
  //   imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  //   deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  // },
  // transpilePackages: ["next-image-export-optimizer"],
  // env: {
  //   nextImageExportOptimizer_imageFolderPath: "public/images",
  //   nextImageExportOptimizer_exportFolderPath: "out",
  //   nextImageExportOptimizer_quality: "75",
  //   nextImageExportOptimizer_storePicturesInWEBP: "true",
  //   nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",

  //   // If you do not want to use blurry placeholder images, then you can set
  //   // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
  //   // `placeholder="empty"` to all <ExportedImage> components.
  //   nextImageExportOptimizer_generateAndUseBlurImages: "true",

  //   // If you want to cache the remote images, you can set the time to live of the cache in seconds.
  //   // The default value is 0 seconds.
  //   nextImageExportOptimizer_remoteImageCacheTTL: "0",
  // },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

const withNextIntlConfig = withNextIntl(nextConfig);

export default withSentryConfig(withNextIntlConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "testing-p9",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
