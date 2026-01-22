import React, { useRef } from 'react';

const TiltCard = ({ children, className }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };

    return (
        <div
            ref={cardRef}
            className={`skill-card tilt glass ${className || ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2 className="section-title fade-in-up">Tech <span className="highlight">Stack</span></h2>

                <div className="skills-grid">
                    {/* Languages */}
                    <div className="skill-category fade-in-up delay-100">
                        <h3>Languages</h3>
                        <div className="skill-cards">
                            <TiltCard><i className="devicon-cplusplus-plain colored"></i><span>C++</span></TiltCard>
                            <TiltCard><i className="devicon-python-plain colored"></i><span>Python</span></TiltCard>
                            <TiltCard><i className="devicon-html5-plain colored"></i><span>HTML5</span></TiltCard>
                            <TiltCard><i className="devicon-css3-plain colored"></i><span>CSS3</span></TiltCard>
                            <TiltCard><i className="devicon-javascript-plain colored"></i><span>JavaScript</span></TiltCard>
                            <TiltCard><i className="devicon-mysql-plain colored"></i><span>SQL</span></TiltCard>
                        </div>
                    </div>

                    {/* Core Credentials */}
                    <div className="skill-category fade-in-up delay-200">
                        <h3>Core Credentials</h3>
                        <div className="skill-cards">
                            <TiltCard><i className="fa-solid fa-sitemap"></i><span>DSA</span></TiltCard>
                            <TiltCard><i className="fa-solid fa-cubes"></i><span>OOPS</span></TiltCard>
                            <TiltCard><i className="fa-solid fa-server"></i><span>DBMS</span></TiltCard>
                            <TiltCard><i className="fa-solid fa-desktop"></i><span>OS</span></TiltCard>
                        </div>
                    </div>

                    {/* Developer Tools */}
                    <div className="skill-category fade-in-up delay-300">
                        <h3>Developer Tools</h3>
                        <div className="skill-cards">
                            <TiltCard><i className="devicon-vscode-plain colored"></i><span>VS Code</span></TiltCard>
                            <TiltCard><i className="devicon-git-plain colored"></i><span>Git</span></TiltCard>
                            <TiltCard><i className="fa-brands fa-github"></i><span>GitHub</span></TiltCard>
                            <TiltCard><i className="devicon-mongodb-plain colored"></i><span>MongoDB</span></TiltCard>
                            <TiltCard><i className="devicon-docker-plain colored"></i><span>Docker</span></TiltCard>
                            <TiltCard><i className="devicon-jenkins-line colored"></i><span>Jenkins</span></TiltCard>
                            <TiltCard><i className="devicon-jira-plain colored"></i><span>Jira</span></TiltCard>
                        </div>
                    </div>

                    {/* Frameworks */}
                    <div className="skill-category fade-in-up delay-100">
                        <h3>Frameworks</h3>
                        <div className="skill-cards">
                            <TiltCard><i className="fa-solid fa-server"></i><span>Express</span></TiltCard>
                            <TiltCard><i className="devicon-nodejs-plain colored"></i><span>Node.js</span></TiltCard>
                            <TiltCard><i className="devicon-tailwindcss-original colored"></i><span>Tailwind</span></TiltCard>
                            <TiltCard><i className="devicon-react-original colored"></i><span>React</span></TiltCard>
                            <TiltCard><i className="devicon-redux-original colored"></i><span>Redux</span></TiltCard>
                            <TiltCard><i className="devicon-cucumber-plain colored"></i><span>Cucumber</span></TiltCard>
                        </div>
                    </div>

                    {/* Testing Tools */}
                    <div className="skill-category fade-in-up delay-200">
                        <h3>Testing Tools</h3>
                        <div className="skill-cards">
                            <TiltCard><i className="devicon-selenium-original colored"></i><span>Selenium</span></TiltCard>
                            <TiltCard><i className="fa-solid fa-clipboard-check"></i><span>Manual Testing</span></TiltCard>
                            <TiltCard><i className="fa-solid fa-gears"></i><span>Automated Testing</span></TiltCard>
                            <TiltCard><i className="fa-solid fa-rocket"></i><span>API Testing</span></TiltCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
