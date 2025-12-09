"use client";
import { SiTypescript, SiReact, SiJavascript, SiAmazon, SiFirebase, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPrisma } from 'react-icons/si';

export default function TechOrbit() {
    // Configuration: easily modify these values
    const ORBIT_RADIUS = 180; // pixels - change this to adjust orbit size
    const ROTATION_SPEED = 60; // seconds - higher = slower

    // Central technology
    const centerTech = {
        name: 'TypeScript',
        icon: SiTypescript,
        color: '#3178C6'
    };

    // Orbiting technologies - add/remove items here
    const orbitingTechs = [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Prisma', icon: SiPrisma, color: '#2D3748' }
    ];

    return (
        <div className="tech-orbit-container">
            {/* Radar Grid Lines */}
            <div className="orbit-grid">
                <div className="orbit-ring" style={{ width: '120px', height: '120px' }}></div>
                <div className="orbit-ring" style={{ width: '240px', height: '240px' }}></div>
                <div className="orbit-ring" style={{ width: '360px', height: '360px' }}></div>
                <div className="orbit-ring" style={{ width: '480px', height: '480px' }}></div>
            </div>

            {/* Scanning Line Effect */}
            <div className="scan-line"></div>

            {/* Central Technology */}
            <div className="center-tech">
                <div className="center-tech-inner">
                    <centerTech.icon
                        className="center-icon"
                        style={{ color: centerTech.color }}
                    />
                    <div className="center-glow" style={{ backgroundColor: centerTech.color }}></div>
                </div>
                <span className="tech-label">{centerTech.name}</span>
            </div>

            {/* Orbiting Technologies */}
            <div className="orbit-track" style={{
                width: `${ORBIT_RADIUS * 2}px`,
                height: `${ORBIT_RADIUS * 2}px`,
                animation: `orbitRotate ${ROTATION_SPEED}s linear infinite`
            }}>
                {orbitingTechs.map((tech, index) => {
                    const angle = (360 / orbitingTechs.length) * index;

                    return (
                        <div
                            key={tech.name}
                            className="orbit-item"
                            style={{
                                transform: `rotate(${angle}deg) translate(${ORBIT_RADIUS}px) rotate(-${angle}deg)`
                            }}
                        >
                            <div className="orbit-icon-wrapper">
                                <tech.icon
                                    className="orbit-icon"
                                    style={{ color: tech.color }}
                                />
                                <div className="orbit-glow" style={{ backgroundColor: tech.color }}></div>
                            </div>
                            <span className="tech-label">{tech.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* Cosmic particles */}
            <div className="cosmic-particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}></div>
                ))}
            </div>
        </div>
    );
}
