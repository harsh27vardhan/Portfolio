import React, { useEffect, useRef, useState, useMemo } from 'react';

const SKILLS_DATA = [
    // Languages
    { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored' },
    { name: 'CSS3', icon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'SQL', icon: 'devicon-mysql-plain colored' },
    // Core
    { name: 'DSA', icon: 'fa-solid fa-sitemap' },
    { name: 'OOPS', icon: 'fa-solid fa-cubes' },
    { name: 'DBMS', icon: 'fa-solid fa-server' },
    { name: 'OS', icon: 'fa-solid fa-desktop' },
    // Tools
    { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'GitHub', icon: 'fa-brands fa-github' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'Jenkins', icon: 'devicon-jenkins-line colored' },
    { name: 'Jira', icon: 'devicon-jira-plain colored' },
    // Frameworks
    { name: 'Express', icon: 'fa-solid fa-server' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-original colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Redux', icon: 'devicon-redux-original colored' },
    { name: 'Cucumber', icon: 'devicon-cucumber-plain colored' },
    // Testing
    { name: 'Selenium', icon: 'devicon-selenium-original colored' },
    { name: 'Manual Testing', icon: 'fa-solid fa-clipboard-check' },
    { name: 'Automated Testing', icon: 'fa-solid fa-gears' },
    { name: 'API Testing', icon: 'fa-solid fa-rocket' },
];

const SkillNode = ({ data, index, total, onHover }) => {
    // 3D Spherical/Cylindrical Spiral Math
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = index * 0.8;

    const radius = 280 * Math.sin(phi) + 50;

    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);
    const y = (index / total - 0.5) * 600;

    // Individual node rotation to face outward
    const rotationY = (theta * 180) / Math.PI;

    const style = {
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${-rotationY}deg)`,
        zIndex: Math.floor(z + 500),
    };

    return (
        <div
            className="skill-node glass interactive"
            style={style}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            <div className="node-inner">
                <i className={data.icon}></i>
                <span className="skill-label">{data.name}</span>
            </div>
            <div className="node-shadow"></div>
        </div>
    );
};

const Skills = () => {
    const [isPaused, setIsPaused] = useState(false);
    const spiralRef = useRef(null);
    const rotationRef = useRef(0);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const animate = () => {
            if (!isPaused) {
                // Adjust rotation increment for speed (e.g., 0.2 for slow rotation)
                rotationRef.current += 0.2;
                if (spiralRef.current) {
                    spiralRef.current.style.transform = `perspective(1200px) rotateY(${rotationRef.current}deg) rotateX(10deg)`;
                }
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPaused]);

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2 className="section-title">
                    Digital <span className="highlight">Galaxy</span>
                </h2>

                <div className="spiral-container">
                    <div
                        className="spiral-inner"
                        ref={spiralRef}
                    >
                        {SKILLS_DATA.map((skill, index) => (
                            <SkillNode
                                key={index}
                                data={skill}
                                index={index}
                                total={SKILLS_DATA.length}
                                onHover={setIsPaused}
                            />
                        ))}

                        {/* Core Pulse */}
                        <div className="spiral-core"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;

