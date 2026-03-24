"use client";
import { useEffect, useRef } from 'react';
import { SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiAmazon, SiMongodb } from 'react-icons/si';

export default function TechTree() {
    const containerRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Pre-hide nodes so they don't flash before animation
        const nodes = container.querySelectorAll('.tech-node');
        nodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0.4)';
        });

        // Pre-setup SVG lines for draw-on
        const lines = container.querySelectorAll('line');
        lines.forEach(line => {
            const len = 140;
            line.style.strokeDasharray = len;
            line.style.strokeDashoffset = len;
        });

        const runAnimation = () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            import('animejs').then(({ animate, stagger, spring }) => {
                // Draw SVG lines first
                animate(lines, {
                    strokeDashoffset: [null, 0],
                    duration: 800,
                    delay: stagger(120),
                    ease: 'out(3)',
                });

                // Nodes spring in after lines start drawing
                animate(nodes, {
                    opacity:   [0, 1],
                    scale:     [0.4, 1],
                    delay:     stagger(80, { start: 300 }),
                    ease:      spring({ stiffness: 260, damping: 18, mass: 1 }),
                    duration:  1000,
                });
            }).catch(err => console.warn('animejs load failed', err));
        };

        // Trigger animation when container scrolls into view
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    runAnimation();
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="tech-tree-container" ref={containerRef}>
            {/* Root Node - TypeScript */}
            <div className="tree-level level-root">
                <div className="tech-node node-root">
                    <div className="node-icon">
                        <SiTypescript style={{ color: '#3178C6' }} />
                    </div>
                    <span className="node-label">TypeScript</span>
                </div>
            </div>

            {/* Connecting Lines from Root */}
            <svg className="tree-lines" width="100%" height="80">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                <line x1="35%" y1="0" x2="25%" y2="80" stroke="url(#lineGradient)" strokeWidth="2" />
                <line x1="65%" y1="0" x2="75%" y2="80" stroke="url(#lineGradient)" strokeWidth="2" />
            </svg>

            {/* Mid Level - Frontend & Backend */}
            <div className="tree-level level-mid">
                <div className="tech-node node-category">
                    <div className="node-icon-small">
                        <span className="category-icon">⚛️</span>
                    </div>
                    <span className="node-label">Frontend</span>
                </div>

                <div className="tech-node node-category">
                    <div className="node-icon-small">
                        <span className="category-icon">⚙️</span>
                    </div>
                    <span className="node-label">Backend</span>
                </div>
            </div>

            {/* Connecting Lines from Mid to Bottom */}
            <svg className="tree-lines" width="100%" height="100">
                <line x1="15%" y1="0" x2="8%"  y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
                <line x1="20%" y1="0" x2="17%" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
                <line x1="30%" y1="0" x2="26%" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
                <line x1="70%" y1="0" x2="55%" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
                <line x1="75%" y1="0" x2="67%" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
                <line x1="80%" y1="0" x2="79%" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
                <line x1="85%" y1="0" x2="91%" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
            </svg>

            {/* Bottom Level - Technologies */}
            <div className="tree-level level-bottom">
                <div className="tech-group">
                    <div className="tech-node node-tech">
                        <div className="node-icon-tech"><SiReact style={{ color: '#61DAFB' }} /></div>
                        <span className="node-label-small">React</span>
                    </div>
                    <div className="tech-node node-tech">
                        <div className="node-icon-tech"><SiNextdotjs style={{ color: '#FFFFFF' }} /></div>
                        <span className="node-label-small">Next.js</span>
                    </div>
                    <div className="tech-node node-tech">
                        <div className="node-icon-tech"><SiTailwindcss style={{ color: '#06B6D4' }} /></div>
                        <span className="node-label-small">Tailwind</span>
                    </div>
                </div>

                <div className="tech-group">
                    <div className="tech-node node-tech">
                        <div className="node-icon-tech"><SiNodedotjs style={{ color: '#339933' }} /></div>
                        <span className="node-label-small">Node.js</span>
                    </div>
                    <div className="tech-node node-tech">
                        <div className="node-icon-tech"><SiFirebase style={{ color: '#FFCA28' }} /></div>
                        <span className="node-label-small">Firebase</span>
                    </div>
                    <div className="tech-node node-tech">
                        <div className="node-icon-tech"><SiAmazon style={{ color: '#FF9900' }} /></div>
                        <span className="node-label-small">AWS</span>
                    </div>
                    <div className="tech-node node-tech">
                        <div className="node-icon-tech"><SiMongodb style={{ color: '#47A248' }} /></div>
                        <span className="node-label-small">MongoDB</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
