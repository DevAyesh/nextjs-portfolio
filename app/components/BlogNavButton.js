"use client";

export default function BlogNavButton({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-nav-btn"
    >
      Blog
    </a>
  );
}
