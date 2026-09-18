const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-six-sand-83.vercel.app";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        "name": "Ayesh Madhuranga",
        "givenName": "Ayesh",
        "familyName": "Madhuranga",
        "url": siteUrl,
        "image": `${siteUrl}/images/profile.png`,
        "jobTitle": "Software Engineer & Full Stack Developer",
        "description": "Software Engineer and Full Stack Developer specializing in Next.js, React, Node.js, Python, and Cloud technologies.",
        "sameAs": [
          "https://github.com/DevAyesh",
          "https://www.linkedin.com/in/ayesh-madhuranga-nawarathna-4b2a33217",
          "https://medium.com/@amnlkk2001"
        ],
        "knowsAbout": [
          "Software Engineering",
          "Full Stack Web Development",
          "Next.js",
          "React",
          "Node.js",
          "JavaScript",
          "TypeScript",
          "Python",
          "FastAPI",
          "Django",
          "MongoDB",
          "MySQL",
          "Amazon Web Services (AWS)",
          "Docker",
          "Machine Learning"
        ],
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "HORIZON Campus",
          "sameAs": "https://horizoncampus.edu.lk"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Colombo",
          "addressCountry": "LK"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Ayesh Madhuranga | Portfolio",
        "description": "Explore projects, technical skills, and experience of Ayesh Madhuranga, Software Engineer and Full Stack Developer.",
        "publisher": {
          "@id": `${siteUrl}/#person`
        }
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        "url": siteUrl,
        "name": "Ayesh Madhuranga - Software Engineer Portfolio",
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        },
        "about": {
          "@id": `${siteUrl}/#person`
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${siteUrl}/images/og-image.png`
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
