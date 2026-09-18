import "./globals.css";
import Script from "next/script";
import StructuredData from "./components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-six-sand-83.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayesh Madhuranga | Software Engineer & Full Stack Developer",
    template: "%s | Ayesh Madhuranga",
  },
  description:
    "Explore the portfolio of Ayesh Madhuranga, a Software Engineer and Full Stack Developer specializing in Next.js, React, Node.js, Python, AWS Cloud, and intelligent web solutions.",
  keywords: [
    "Ayesh Madhuranga",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Machine Learning",
    "AWS Cloud",
    "Web Developer Sri Lanka",
    "Software Engineer Portfolio",
    "DevAyesh",
    "AppStruct",
  ],
  authors: [{ name: "Ayesh Madhuranga", url: siteUrl }],
  creator: "Ayesh Madhuranga",
  publisher: "Ayesh Madhuranga",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ayesh Madhuranga | Software Engineer & Full Stack Developer",
    description:
      "Explore the portfolio of Ayesh Madhuranga, a Software Engineer and Full Stack Developer specializing in Next.js, React, Node.js, Python, AWS Cloud, and intelligent web solutions.",
    url: siteUrl,
    siteName: "Ayesh Madhuranga Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayesh Madhuranga - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayesh Madhuranga | Software Engineer & Full Stack Developer",
    description:
      "Software Engineer & Full Stack Developer specializing in Next.js, React, Node.js, Python, AWS Cloud, and modern web applications.",
    images: ["/images/og-image.png"],
    creator: "@DevAyesh",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "BYAuc5p-PFHufa5gf2YWNCKozd-dkLeGi6yzY2UHVEA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <StructuredData />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

