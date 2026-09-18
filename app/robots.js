export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-six-sand-83.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
