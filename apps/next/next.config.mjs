import { withHighlightConfig } from "@highlight-run/next/config";
import { withAxiom } from "next-axiom";
import nextBuildId from "next-build-id";
import { dirname } from "path";
import { fileURLToPath } from "url";

// @ts-check

/*
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import "@quizfit/env/client/client.mjs";
import "@quizfit/env/server/server.mjs";

import pjson from "./package.json" with { type: "json" };

const shouldAnalyzeBundles = process.env.ANALYZE === "true";
const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: shouldAnalyzeBundles,
});

const appVersion = pjson.version;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const domains = ["lh3.googleusercontent.com", "images.unsplash.com"];
if (process.env.USERS_BUCKET_URL)
  domains.push(new URL(process.env.USERS_BUCKET_URL).host);
if (process.env.ASSETS_BUCKET_URL)
  domains.push(new URL(process.env.ASSETS_BUCKET_URL).host);

const getConsoleRewrites = async () => {
  return [];
};

/** @type {import("next").NextConfig} */
let config = {
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  experimental: {
    optimizePackageImports: [
      "@quizfit/components",
      "@tabler/icons-react",
      "@chakra-ui/react",
      "@tremor/react",
    ],
    instrumentationHook: true,
    // Tommy, I love you so much https://holocron.so/blog/optimizing-next.js-cold-starts-for-vercel
    esmExternals: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains,
  },
  transpilePackages: [
    "@quizfit/auth",
    "@quizfit/core",
    "@quizfit/emails",
    "@quizfit/env",
    "@quizfit/interfaces",
    "@quizfit/lib",
    "@quizfit/components",
    "@quizfit/branding",
    "@quizfit/payments",
    "@quizfit/enterprise",
    "@quizfit/prisma",
    "@quizfit/drizzle",
    "@quizfit/trpc",
    "@quizfit/inngest",
    "@quizfit/types",
  ],
  headers: async () => [
    {
      source: "/auth/:path*",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
      ],
    },
  ],
  rewrites: async () => [
    ...(await getConsoleRewrites()),
    {
      source: "/:id(_[a-zA-Z0-9]{10})",
      destination: "/share-resolver/:id",
    },
    {
      source: "/:id(j[a-zA-Z0-9]{8})",
      destination: "/class-resolver/:id",
    },
    {
      source: "/u/:profile([a-zA-Z0-9-_]+)/folders/:slug",
      destination: "/profile/:profile/folders/:slug",
    },
    {
      source: "/u/:profile([a-zA-Z0-9-_]+)/folders/:slug/flashcards",
      destination: "/profile/:profile/folders/:slug/flashcards",
    },
    {
      source: "/u/:profile([a-zA-Z0-9-_]+)/folders/:slug/match",
      destination: "/profile/:profile/folders/:slug/match",
    },
    {
      source: "/u/:profile([a-zA-Z0-9-_]+)/folders/:slug/match/leaderboard",
      destination: "/profile/:profile/folders/:slug/match/leaderboard",
    },
    {
      source: "/:id(c[a-z0-9]{24})",
      destination: "/sets/:id",
    },
    {
      source: "/:id(c[a-z0-9]{24})/edit",
      destination: "/sets/:id/edit",
    },
    {
      source: "/:id(c[a-z0-9]{24})/create",
      destination: "/sets/:id/create",
    },
    {
      source: "/:id(c[a-z0-9]{24})/collab",
      destination: "/sets/:id/collab",
    },
    {
      source: "/:id(c[a-z0-9]{24})/flashcards",
      destination: "/sets/:id/flashcards",
    },
    {
      source: "/:id(c[a-z0-9]{24})/learn",
      destination: "/sets/:id/learn",
    },
    {
      source: "/:id(c[a-z0-9]{24})/match",
      destination: "/sets/:id/match",
    },
    {
      source: "/:id(c[a-z0-9]{24})/match/leaderboard",
      destination: "/sets/:id/match/leaderboard",
    },
    {
      source: "/:id(c[a-z0-9]{24})/test",
      destination: "/sets/:id/test",
    },
    {
      source: "/a/:id/:assignmentId",
      destination: "/classes/:id/assignments/:assignmentId",
    },
    {
      source: "/a/:id/:assignmentId/:path*",
      destination: "/classes/:id/assignments/:assignmentId/:path*",
    },
    // Profile routes with /u/ prefix to avoid conflicts
    {
      source: "/u/:profile([a-zA-Z0-9-_]+)",
      destination: "/profile/:profile",
    },
  ],
  productionBrowserSourceMaps: false,
};

config = withHighlightConfig(withAxiom(config), {
  appVersion,
});
if (shouldAnalyzeBundles) {
  config = withBundleAnalyzer(config);
}

export default config;
