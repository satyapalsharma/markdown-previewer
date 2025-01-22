/**
 * @type {import('next').NextConfig}
 *
 * Next.js configuration file.
 * This file is used to configure various aspects of your Next.js application,
 * including environment variables, build optimizations, and more.
 *
 * For more details, see the official Next.js documentation:
 * https://nextjs.org/docs/api-reference/next.config.js
 */
const nextConfig = {
  // Enable React Strict Mode for improved debugging and future compatibility.
  // This helps identify potential problems in your application.
  reactStrictMode: true,

  // Use SWC (Speedy Web Compiler) for minification, which is significantly faster than Terser.
  // This is enabled by default in Next.js 12+, but explicitly setting it ensures clarity.
  swcMinify: true,

  // Configuration for the Next.js compiler (SWC).
  compiler: {
    // Remove console.log statements in production builds for cleaner output and performance.
    // This is a common optimization for production environments.
    // `process.env.NODE_ENV === 'production'` ensures this only happens in production builds.
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Environment variables that are exposed to the browser.
  // These variables must be prefixed with `NEXT_PUBLIC_` to be accessible on the client-side.
  // Values are typically loaded from `.env.local` or system environment variables.
  env: {
    // Application name for display purposes across the application.
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Markdown Previewer',

    // Base URL for any potential API endpoints specific to this Markdown Previewer service.
    // This allows the previewer to interact with its own backend for features like
    // saving drafts, fetching templates, or user authentication if implemented later.
    NEXT_PUBLIC_MARKDOWN_PREVIEWER_API_URL: process.env.NEXT_PUBLIC_MARKDOWN_PREVIEWER_API_URL || 'http://localhost:3001/api/markdown',

    // URL for the interconnected Recipe Finder service.
    // This enables cross-service communication or linking, simulating a microservice architecture.
    // For example, the Markdown Previewer could link to a recipe, or embed content from it.
    NEXT_PUBLIC_RECIPE_FINDER_SERVICE_URL: process.env.NEXT_PUBLIC_RECIPE_FINDER_SERVICE_URL || 'http://localhost:3002',

    // Add any other public environment variables here as needed for your application.
  },

  // Image optimization configuration.
  // If your application fetches images from external domains (e.g., CDNs, user-uploaded content),
  // those domains must be listed here to allow Next.js's Image component to optimize them.
  // For a simple markdown previewer, this might not be immediately necessary, but it's good
  // practice to include for a production-ready application that might evolve.
  images: {
    // Example: domains: ['example.com', 'cdn.another-domain.com'],
    // Or using remotePatterns for more granular control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'assets.example.com',
    //     port: '',
    //     pathname: '/my-images/**',
    //   },
    // ],
  },

  // Output configuration for standalone builds.
  // Setting `output: 'standalone'` creates a `.next/standalone` folder during `next build`.
  // This folder contains all necessary files (including `node_modules`) to run the Next.js app
  // as a standalone server, which is ideal for Docker deployments and other containerized environments.
  output: 'standalone',
};

module.exports = nextConfig;