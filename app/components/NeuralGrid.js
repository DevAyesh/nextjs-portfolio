"use client";

import { useEffect, useRef, useCallback } from "react";

const GRID_SIZE = 50;
const NODE_RADIUS = 1.8;
const MOUSE_RADIUS = 200;
const GOLD = [255, 179, 67]; // #FFB343

function hexToRgb(h) {
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  return [r, g, b];
}

export default function NeuralGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const nodesRef = useRef([]);
  // Track whether mouse has moved since last draw to skip redundant frames
  const dirtyRef = useRef(true);

  // ── Build node positions at ~55% of grid intersections ─────────────────
  const buildNodes = useCallback((w, h) => {
    const nodes = [];
    // Use a seeded-like pattern so nodes don't jump on resize
    let seed = 1;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let x = 0; x <= w + GRID_SIZE; x += GRID_SIZE) {
      for (let y = 0; y <= h + GRID_SIZE; y += GRID_SIZE) {
        if (rand() > 0.42) {
          nodes.push({ x, y });
        }
      }
    }
    nodesRef.current = nodes;
  }, []);

  // ── Main render loop ────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Only skip clear + grid redraw if !dirty AND mouse out of range
    // (nodes need to un-highlight after mouse leaves)
    // For simplicity: always draw but keep draw calls lean
    ctx.clearRect(0, 0, W, H);

    // ── Grid lines ─────────────────────────────────────────────────────
    const cols = Math.ceil(W / GRID_SIZE) + 1;
    const rows = Math.ceil(H / GRID_SIZE) + 1;

    for (let c = 0; c < cols; c++) {
      const x = c * GRID_SIZE;
      const dist = Math.abs(x - mx);
      const glow = dist < 120 ? Math.max(0, 1 - dist / 120) : 0;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      if (glow > 0) {
        ctx.strokeStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${0.03 + glow * 0.22})`;
        ctx.lineWidth = 1 + glow * 0.9;
      } else {
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    }

    for (let r = 0; r < rows; r++) {
      const y = r * GRID_SIZE;
      const dist = Math.abs(y - my);
      const glow = dist < 120 ? Math.max(0, 1 - dist / 120) : 0;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      if (glow > 0) {
        ctx.strokeStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${0.03 + glow * 0.22})`;
        ctx.lineWidth = 1 + glow * 0.9;
      } else {
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
      }
      ctx.stroke();
    }

    // ── Neural connections + nodes ──────────────────────────────────────
    const nodes = nodesRef.current;
    const nearbyNodes = [];

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dx = n.x - mx;
      const dy = n.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        nearbyNodes.push({ x: n.x, y: n.y, dist });
      }
    }

    // Lines: cursor → each nearby node
    for (let i = 0; i < nearbyNodes.length; i++) {
      const n = nearbyNodes[i];
      const t = 1 - n.dist / MOUSE_RADIUS;
      const alpha = t * t * 0.55; // quadratic falloff
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(n.x, n.y);
      ctx.strokeStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }

    // Lines between nearby nodes (only close pairs, so O(n²) stays small)
    if (nearbyNodes.length > 1) {
      for (let i = 0; i < nearbyNodes.length - 1; i++) {
        const a = nearbyNodes[i];
        for (let j = i + 1; j < nearbyNodes.length; j++) {
          const b = nearbyNodes[j];
          const d2 = Math.hypot(a.x - b.x, a.y - b.y);
          if (d2 < 90) { // only connect nearby siblings
            const ta = 1 - a.dist / MOUSE_RADIUS;
            const tb = 1 - b.dist / MOUSE_RADIUS;
            const alpha = ((ta + tb) / 2) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // Draw all nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dx = n.x - mx;
      const dy = n.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const inRange = dist < MOUSE_RADIUS;
      const t = inRange ? (1 - dist / MOUSE_RADIUS) : 0;

      ctx.beginPath();
      ctx.arc(n.x, n.y, NODE_RADIUS + t * 1.2, 0, Math.PI * 2);
      if (inRange) {
        // Glow halo for active nodes
        if (t > 0.5) {
          ctx.shadowColor = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${t})`;
          ctx.shadowBlur = 6;
        }
        ctx.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${0.18 + t * 0.72})`;
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255,255,255,0.18)";
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Setup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildNodes(canvas.width, canvas.height);
      dirtyRef.current = true;
    };

    resize();

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dirtyRef.current = true;
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      dirtyRef.current = true;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw, buildNodes]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
