"use client";

import { useRef, useEffect } from "react";
import {
  FaReact, FaNodeJs, FaDocker, FaGithub, FaCode, FaDatabase, FaServer, FaTools, FaRobot, FaCloud, FaAndroid,
  FaHtml5, FaCss3Alt
} from "react-icons/fa";
import {
  SiNextdotjs, SiExpress, SiDjango, SiFastapi,
  SiMongodb, SiMysql, SiTensorflow, SiPytorch, SiNumpy, SiPandas, SiScikitlearn,
  SiPostman, SiJupyter
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import VariableProximity from "./VariableProximity";

const TECH_COLORS = {
  "React":                "#61DAFB",
  "Next.js":              "#ffffff",
  "JavaScript":           "#F7DF1E",
  "HTML":                 "#E34F26",
  "CSS":                  "#264DE4",
  "Node.js":              "#539E43",
  "Express":              "#aaaaaa",
  "Django":               "#092E20",
  "FastAPI":              "#009688",
  "MongoDB":              "#47A248",
  "MySQL":                "#4479A1",
  "TensorFlow":           "#FF6F00",
  "PyTorch":              "#EE4C2C",
  "NumPy":                "#4DABCF",
  "Pandas":               "#150458",
  "Scikit-learn":         "#F7931E",
  "GitHub":               "#ffffff",
  "GitHub Actions":       "#2088FF",
  "VS Code":              "#007ACC",
  "Docker":               "#2496ED",
  "Postman":              "#FF6C37",
  "Android Studio":       "#3DDC84",
  "Jupyter Notebook":     "#F37626",
  "Google Cloud Console": "#4285F4",
};

const techStack = [
  {
    title: "Frontend Technologies",
    icon: FaCode,
    items: [
      { label: "React",      icon: FaReact },
      { label: "Next.js",    icon: SiNextdotjs },
      { label: "JavaScript", icon: IoLogoJavascript },
      { label: "HTML",       icon: FaHtml5 },
      { label: "CSS",        icon: FaCss3Alt },
    ],
  },
  {
    title: "Backend Technologies",
    icon: FaServer,
    items: [
      { label: "Node.js",  icon: FaNodeJs },
      { label: "Express",  icon: SiExpress },
      { label: "Django",   icon: SiDjango },
      { label: "FastAPI",  icon: SiFastapi },
    ],
  },
  {
    title: "Database",
    icon: FaDatabase,
    items: [
      { label: "MongoDB", icon: SiMongodb },
      { label: "MySQL",   icon: SiMysql },
    ],
  },
  {
    title: "Machine Learning",
    icon: FaRobot,
    items: [
      { label: "TensorFlow",   icon: SiTensorflow },
      { label: "PyTorch",      icon: SiPytorch },
      { label: "NumPy",        icon: SiNumpy },
      { label: "Pandas",       icon: SiPandas },
      { label: "Scikit-learn", icon: SiScikitlearn },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: FaTools,
    items: [
      { label: "GitHub",               icon: FaGithub },
      { label: "GitHub Actions",       icon: FaGithub },
      { label: "VS Code",              icon: FaCode },
      { label: "Docker",               icon: FaDocker },
      { label: "Postman",              icon: SiPostman },
      { label: "Android Studio",       icon: FaAndroid },
      { label: "Jupyter Notebook",     icon: SiJupyter },
      { label: "Google Cloud Console", icon: FaCloud },
    ],
  },
];

// ── Pill component ──────────────────────────────────────────────────────────
function TechPill({ item }) {
  const color = TECH_COLORS[item.label] || "#ffffff";
  return (
    <div className="ts-pill" style={{ '--pill-color': color }}>
      <item.icon className="ts-pill-icon" />
      <span className="ts-pill-label">{item.label}</span>
    </div>
  );
}

// ── Category Row component ──────────────────────────────────────────────────
function CategoryRow({ category }) {
  return (
    <div className="ts-row">
      <div className="ts-row-header">
        <category.icon className="ts-row-icon" />
        <h3 className="ts-row-title">{category.title}</h3>
      </div>
      <div className="ts-pill-grid">
        {category.items.map((item) => (
          <TechPill key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

// ── Main TechStack Section ──────────────────────────────────────────────────
export default function TechStack({ skillsRef }) {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);

  // Preload animejs immediately so it's cached when section enters view
  useEffect(() => {
    import('animejs').catch(() => {});
  }, []);

  // Interactive spotlight
  useEffect(() => {
    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    let rafId;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        spotlight.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0)`;
        spotlight.style.opacity = "1";
      });
    };
    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      spotlight.style.opacity = "0";
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll-triggered entrance animation — same pattern as project cards
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.ts-heading');
    const rows    = section.querySelectorAll('.ts-row');
    const pills   = section.querySelectorAll('.ts-pill');

    // Hide everything via JS (inline style, same approach as project cards)
    const hideAll = () => {
      if (heading) { heading.style.opacity = '0'; heading.style.transform = 'translateY(28px)'; }
      rows.forEach(r  => { r.style.opacity = '0'; r.style.transform = 'translateY(32px)'; });
      pills.forEach(p => { p.style.opacity = '0'; p.style.transform = 'translateY(16px) scale(0.93)'; });
    };
    hideAll();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('animejs').then(({ createTimeline, stagger }) => {
            const tl = createTimeline({ defaults: { ease: 'out(3)' }, autoplay: true });

            if (heading) {
              tl.add(heading, { opacity: [0, 1], y: [28, 0], duration: 500 });
            }
            if (rows.length) {
              tl.add(rows, { opacity: [0, 1], y: [32, 0], duration: 450, delay: stagger(70) }, '-=300');
            }
            if (pills.length) {
              tl.add(pills, { opacity: [0, 1], y: [16, 0], scale: [0.93, 1], duration: 400, delay: stagger(25) }, '-=250');
            }
          }).catch(() => {
            // Fallback — show everything instantly if animejs fails
            if (heading) { heading.style.opacity = '1'; heading.style.transform = 'none'; }
            rows.forEach(r  => { r.style.opacity = '1'; r.style.transform = 'none'; });
            pills.forEach(p => { p.style.opacity = '1'; p.style.transform = 'none'; });
          });
        } else {
          hideAll();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="section-padding ts-section"
      ref={(el) => {
        sectionRef.current = el;
        if (skillsRef) skillsRef.current = el;
      }}
    >
      <div className="ts-liquid-gold" />
      <div className="ts-liquid-indigo" />

      <div
        className="ts-spotlight"
        ref={spotlightRef}
        aria-hidden="true"
        style={{ zIndex: 2, opacity: 0, transition: 'opacity 0.3s ease' }}
      />

      <div className="container position-relative" style={{ zIndex: 3 }}>
        <h2 className="ts-heading display-5 fw-bold text-center mb-5">
          <VariableProximity
            label="Tech Stack"
            fromFontVariationSettings="'wght' 300, 'opsz' 8"
            toFontVariationSettings="'wght' 900, 'opsz' 72"
            containerRef={skillsRef || sectionRef}
            radius={200}
            falloff="exponential"
          />
        </h2>

        <div className="ts-list">
          {techStack.map((category) => (
            <CategoryRow key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
