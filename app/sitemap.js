export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-six-sand-83.vercel.app";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
