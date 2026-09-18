"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [statusLog, setStatusLog] = useState('sys.boot("ayesh.core")');
  const timerRef = useRef(null);

  // SVG Gauge calculations
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  // Complete and exit handler
  const handleFinish = useCallback(() => {
    setIsExiting(true);
    document.body.style.overflow = "";

    const exitTimer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 850);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  // Handle immediate skip
  const handleSkip = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    setStatusLog("system ready. welcome!");
    handleFinish();
  }, [handleFinish]);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Progress counter with variable speed for realistic tech feel
    let currentProgress = 0;

    timerRef.current = setInterval(() => {
      let increment = 1;
      if (currentProgress < 25) {
        increment = Math.floor(Math.random() * 4) + 2; // 2-5
      } else if (currentProgress < 65) {
        increment = Math.floor(Math.random() * 3) + 1; // 1-3
      } else if (currentProgress < 90) {
        increment = Math.floor(Math.random() * 4) + 2; // 2-5
      } else {
        increment = Math.floor(Math.random() * 3) + 2; // 2-4
      }

      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      // Update terminal status text based on progress milestone
      if (currentProgress >= 90) {
        setStatusLog("system ready. welcome!");
      } else if (currentProgress >= 65) {
        setStatusLog("mounting cloud & AI components...");
      } else if (currentProgress >= 30) {
        setStatusLog("loading projects, skills & visual assets...");
      } else {
        setStatusLog('sys.boot("ayesh.core")');
      }

      // When reaching 100%
      if (currentProgress >= 100) {
        clearInterval(timerRef.current);
        const finishTimeout = setTimeout(() => {
          handleFinish();
        }, 300);
        return () => clearTimeout(finishTimeout);
      }
    }, 28);

    // Keyboard listener (Escape skips)
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleFinish, handleSkip]);

  if (isFinished) {
    return null;
  }

  return (
    <div
      className={`preloader-overlay ${isExiting ? "preloader-exiting" : ""}`}
      onClick={handleSkip}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
    >
      <div className="preloader-container" onClick={(e) => e.stopPropagation()}>
        {/* Emblem with SVG Circular Track */}
        <div className="preloader-emblem-wrap preloader-pulse">
          <svg className="preloader-svg-gauge" viewBox="0 0 140 140">
            <circle
              className="preloader-gauge-bg"
              cx="70"
              cy="70"
              r={radius}
            />
            <circle
              className="preloader-gauge-fill"
              cx="70"
              cy="70"
              r={radius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="preloader-emblem-text">
            <span className="preloader-bracket">&lt;</span>
            <span className="preloader-initials">AM</span>
            <span className="preloader-bracket">/&gt;</span>
          </div>
        </div>

        {/* Numeric Percentage Counter */}
        <div className="preloader-counter-wrap">
          <span className="preloader-counter">
            {progress.toString().padStart(2, "0")}
          </span>
          <span className="preloader-percent-symbol">%</span>
        </div>

        {/* Gradient Progress Bar */}
        <div className="preloader-bar-track">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Micro-Terminal Stream */}
        <div className="preloader-terminal">
          <div className="preloader-terminal-header">
            <span className="preloader-dot red"></span>
            <span className="preloader-dot yellow"></span>
            <span className="preloader-dot green"></span>
            <span className="preloader-terminal-title">Dev Console</span>
          </div>
          <div className="preloader-terminal-line">
            <span className="preloader-prompt">&gt;</span>
            <span>{statusLog}</span>
            <span className="preloader-cursor"></span>
          </div>
        </div>

        {/* Skip Hint */}
        <div className="preloader-skip-hint" onClick={handleSkip}>
          Click anywhere or press [Esc] to skip
        </div>
      </div>
    </div>
  );
}
