"use client";

/**
 * TechStack.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Redesigned skills section with:
 *   • Core strip  – 6 featured skill cards with level badge
 *   • Filter tabs – All / Frontend / Backend / Database / ML & Data
 *   • Bento grid  – framer-motion layout animation, per-card cursor spotlight
 *   • Skill chips – hover lift + amber glow, keyboard-accessible tooltip
 *   • Learning row – dashed border strip
 *   • DevOps marquee – two-row infinite, pauses on hover, grid on mobile
 *   • Full a11y – tablist/tab/tabpanel, focus-visible rings, aria-labels
 *   • prefers-reduced-motion respected
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useState, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VariableProximity from "./VariableProximity";
import {
  skills,
  learningSkills,
  coreSkills,
  FILTER_TABS,
  BENTO_SIZE,
} from "./skillsData";
import { FaCode, FaServer, FaDatabase, FaRobot, FaTools } from "react-icons/fa";

/* ── Category meta ─────────────────────────────────────────────────────────── */
const CATEGORY_META = {
  frontend: { icon: FaCode,     label: "Frontend" },
  backend:  { icon: FaServer,   label: "Backend" },
  database: { icon: FaDatabase, label: "Database" },
  ml:       { icon: FaRobot,    label: "ML & Data" },
};

/* ── Detect reduced-motion ─────────────────────────────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ── Cursor spotlight inside a card ───────────────────────────────────────── */
function useCardSpotlight(ref, reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "-9999px");
      el.style.setProperty("--my", "-9999px");
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, reducedMotion]);
}

/* ── Skill chip with tooltip ──────────────────────────────────────────────── */
function SkillChip({ skill, index }) {
  const tooltipId = useId();
  const usedText = skill.usedIn?.length
    ? `Used in: ${skill.usedIn.join(", ")}`
    : null;

  return (
    <div
      className="ts2-chip"
      style={{ "--chip-color": skill.color, animationDelay: `${index * 50}ms` }}
      tabIndex={0}
      role="listitem"
      aria-describedby={usedText ? tooltipId : undefined}
    >
      {/* Icon with brand color */}
      <span className="ts2-chip__icon" aria-hidden="true">
        <skill.icon style={{ color: skill.color }} />
      </span>
      <span className="ts2-chip__name">{skill.name}</span>

      {/* Tooltip */}
      {usedText && (
        <span className="ts2-chip__tooltip" id={tooltipId} role="tooltip">
          {usedText}
        </span>
      )}
    </div>
  );
}

/* ── Core strip card ──────────────────────────────────────────────────────── */
function CoreCard({ skill, reducedMotion }) {
  const ref = useRef(null);
  useCardSpotlight(ref, reducedMotion);

  return (
    <div className="ts2-core-card" ref={ref} aria-label={`${skill.name} — ${skill.level}`}>
      {/* Spotlight layer */}
      <span className="ts2-card-spotlight" aria-hidden="true" />

      <span className="ts2-core-card__icon" aria-hidden="true">
        <skill.icon style={{ color: skill.color }} />
      </span>
      <span className="ts2-core-card__name">{skill.name}</span>
      <span className="ts2-core-card__level">{skill.level}</span>
    </div>
  );
}

/* ── Bento category card ─────────────────────────────────────────────────── */
function BentoCard({ category, filteredSkills, reducedMotion }) {
  const ref = useRef(null);
  useCardSpotlight(ref, reducedMotion);
  const meta = CATEGORY_META[category];
  const size = BENTO_SIZE[category] || "normal";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`ts2-bento-card ts2-bento-card--${size}`}
      ref={ref}
    >
      {/* Spotlight layer */}
      <span className="ts2-card-spotlight" aria-hidden="true" />

      <div className="ts2-bento-card__header">
        {meta && <meta.icon className="ts2-bento-card__cat-icon" aria-hidden="true" />}
        <h3 className="ts2-bento-card__title">{meta?.label || category}</h3>
      </div>

      <ul className="ts2-chip-list" role="list" aria-label={`${meta?.label} skills`}>
        {filteredSkills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={i} />
        ))}
      </ul>
    </motion.div>
  );
}

/* ── Devops marquee ──────────────────────────────────────────────────────── */
function DevOpsMarquee({ reducedMotion }) {
  const devopsSkills = skills.filter((s) => s.category === "devops");
  // Duplicate list so seamless loop works
  const row1 = [...devopsSkills, ...devopsSkills];
  const row2 = [...devopsSkills, ...devopsSkills];

  return (
    <>
      {/* Animated marquee for desktop & tablet */}
      <div className="ts2-marquee-outer" aria-label="Tools & DevOps — scroll marquee">
        {/* Row 1 — left to right */}
        <div className="ts2-marquee-track ts2-marquee-track--fwd" aria-hidden="true">
          {row1.map((s, i) => (
            <span className="ts2-marquee-chip" key={i} style={{ "--chip-color": s.color }}>
              <s.icon style={{ color: s.color }} aria-hidden="true" />
              <span>{s.name}</span>
            </span>
          ))}
        </div>
        {/* Row 2 — right to left */}
        <div className="ts2-marquee-track ts2-marquee-track--rev" aria-hidden="true">
          {row2.map((s, i) => (
            <span className="ts2-marquee-chip" key={i} style={{ "--chip-color": s.color }}>
              <s.icon style={{ color: s.color }} aria-hidden="true" />
              <span>{s.name}</span>
            </span>
          ))}
        </div>
        {/* Screen-reader accessible list (visually hidden) */}
        <ul className="ts2-sr-only" role="list">
          {devopsSkills.map((s) => (
            <li key={s.name}>{s.name}</li>
          ))}
        </ul>
      </div>

      {/* Interactive chip grid for mobile and reduced motion */}
      <ul className="ts2-chip-list ts2-devops-grid" role="list" aria-label="Tools & DevOps">
        {devopsSkills.map((s, i) => (
          <SkillChip key={s.name} skill={s} index={i} />
        ))}
      </ul>
    </>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function TechStack({ skillsRef }) {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const tabsRef = useRef(null);
  const panelId = useId();
  const reducedMotion = usePrefersReducedMotion();

  const [activeTab, setActiveTab] = useState("all");

  /* Section-level cursor spotlight (ambient) */
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const spot = spotlightRef.current;
    if (!section || !spot) return;
    let rafId;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        spot.style.transform = `translate3d(${e.clientX - rect.left}px,${e.clientY - rect.top}px,0)`;
        spot.style.opacity = "1";
      });
    };
    const onLeave = () => { if (rafId) cancelAnimationFrame(rafId); spot.style.opacity = "0"; };
    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  /* Scroll-reveal entrance with animejs — once revealed, stay visible */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll(".ts2-reveal");
    const hideAll = () => targets.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
    });
    hideAll();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        import("animejs").then(({ animate, stagger }) => {
          animate(targets, {
            opacity:  [0, 1],
            y:        [32, 0],
            duration: 420,
            delay:    stagger(reducedMotion ? 0 : 55),
            ease:     "out(3)",
          });
        }).catch(() => {
          targets.forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
        });
        observer.unobserve(section);
      }
    }, { threshold: 0.05 });

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  /* Keyboard nav for filter tabs (arrow keys) */
  const handleTabKeyDown = useCallback((e, index) => {
    const tabs = tabsRef.current?.querySelectorAll('[role="tab"]');
    if (!tabs) return;
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    tabs[next].focus();
    setActiveTab(FILTER_TABS[next].id);
  }, []);

  /* Derive filtered bento categories */
  const bentoCategories = ["frontend", "backend", "database", "ml"];
  const filteredCategories = activeTab === "all"
    ? bentoCategories
    : bentoCategories.filter((c) => c === activeTab);

  return (
    <section
      id="skills"
      className="section-padding ts-section"
      ref={(el) => {
        sectionRef.current = el;
        if (skillsRef) skillsRef.current = el;
      }}
      aria-label="Tech Stack"
    >
      {/* Ambient blobs (kept from original) */}
      <div className="ts-liquid-gold" aria-hidden="true" />
      <div className="ts-liquid-indigo" aria-hidden="true" />

      {/* Section-level ambient spotlight */}
      <div
        className="ts-spotlight"
        ref={spotlightRef}
        aria-hidden="true"
        style={{ zIndex: 2, opacity: 0, transition: "opacity 0.3s ease" }}
      />

      <div className="container position-relative" style={{ zIndex: 3 }}>

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div className="ts2-header ts2-reveal">
          <span className="ts2-eyebrow" aria-label="Section: Skills">Skills</span>
          <h2 className="ts-heading display-5 fw-bold text-center">
            <VariableProximity
              label="Tech Stack"
              fromFontVariationSettings="'wght' 300, 'opsz' 8"
              toFontVariationSettings="'wght' 900, 'opsz' 72"
              containerRef={skillsRef || sectionRef}
              radius={200}
              falloff="exponential"
            />
          </h2>
          <p className="ts2-subtitle">
            Tools I use to design, build and ship full-stack products.
          </p>
        </div>

        {/* ── Core strip ───────────────────────────────────────────────────── */}
        <div className="ts2-reveal" aria-label="Core skills">
          <div className="ts2-core-strip" role="list">
            {coreSkills.map((skill) => (
              <div key={skill.name} role="listitem">
                <CoreCard skill={skill} reducedMotion={reducedMotion} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Filter tabs ──────────────────────────────────────────────── */}
        <div className="ts2-filter-tabs-wrap ts2-reveal">
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="ts2-filter-tabs"
            ref={tabsRef}
          >
            {FILTER_TABS.map((tab, index) => (
              <button
                key={tab.id}
                role="tab"
                id={`ts2-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`${panelId}-panel`}
                className={`ts2-tab ${activeTab === tab.id ? "ts2-tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bento grid (tabpanel) ─────────────────────────────────────────── */}
        <div
          id={`${panelId}-panel`}
          role="tabpanel"
          aria-labelledby={`ts2-tab-${activeTab}`}
          className={`ts2-bento${filteredCategories.length === 1 ? " ts2-bento--single" : ""}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => {
              const catSkills = skills.filter(
                (s) => s.category === category && (activeTab === "all" || s.category === activeTab)
              );
              if (!catSkills.length) return null;
              return (
                <BentoCard
                  key={category}
                  category={category}
                  filteredSkills={catSkills}
                  reducedMotion={reducedMotion}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Currently learning ───────────────────────────────────────────── */}
        <div className="ts2-learning-row ts2-reveal" aria-label="Currently learning">
          <span className="ts2-learning-label">
            <span className="ts2-learning-dot" aria-hidden="true" />
            Currently learning
          </span>
          <ul className="ts2-chip-list" role="list">
            {learningSkills.map((s, i) => (
              <SkillChip key={s.name} skill={s} index={i} />
            ))}
          </ul>
        </div>

        {/* ── DevOps / Tools marquee ───────────────────────────────────────── */}
        <div className="ts2-reveal">
          <div className="ts2-devops-header">
            <FaTools className="ts2-bento-card__cat-icon" aria-hidden="true" />
            <h3 className="ts2-bento-card__title">Tools &amp; DevOps</h3>
          </div>
          <DevOpsMarquee reducedMotion={reducedMotion} />
        </div>

      </div>
    </section>
  );
}
