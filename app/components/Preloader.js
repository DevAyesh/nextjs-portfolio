"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import "./Preloader.css";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Ayubowan",
  "Ciao",
  "Ayesh Madhuranga",
];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  const handleFinish = useCallback(() => {
    setIsExiting(true);
    document.body.style.overflow = "";

    const exitTimer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 800);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    // Progress counter
    let current = 0;
    timerRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(timerRef.current);
        setProgress(100);
        setTimeout(handleFinish, 200);
      } else {
        setProgress(current);
      }
    }, 24);

    // Greetings word cycle
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev + 1 < GREETINGS.length ? prev + 1 : prev));
    }, 280);

    // Escape or click anywhere skips immediately
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearInterval(wordInterval);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleFinish]);

  if (isFinished) {
    return null;
  }

  return (
    <div
      className={`preloader-root ${isExiting ? "is-exiting" : ""}`}
      onClick={handleFinish}
      aria-hidden="true"
    >
      <div className="preloader-ambient-glow" />

      {/* Top Bar */}
      <div className="preloader-top-bar">
        <span>Ayesh Madhuranga</span>
        <div className="preloader-status">
          <span className="preloader-status-dot"></span>
          <span>Available for work</span>
        </div>
      </div>

      {/* Center Typography Greeting */}
      <div className="preloader-center-content">
        <div className="preloader-greeting-box">
          <span className="preloader-amber-dot"></span>
          <h1 className="preloader-greeting-text" key={index}>
            {GREETINGS[index]}
          </h1>
        </div>
        <p className="preloader-role-tag">Software Engineer &amp; Full Stack Developer</p>
      </div>

      {/* Bottom Bar: Hairline Progress & Numeric Counter */}
      <div className="preloader-bottom-bar">
        <div className="preloader-progress-track">
          <div
            className="preloader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="preloader-counter-container">
          <span className="preloader-counter-num">{progress}</span>
          <span className="preloader-counter-percent">%</span>
        </div>
      </div>
    </div>
  );
}
