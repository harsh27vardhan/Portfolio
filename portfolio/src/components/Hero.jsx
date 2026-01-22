import React, { useEffect, useState } from 'react';

const Hero = () => {
    const roles = ["Full Stack Developer", "Automation Tester", "Software Engineer", "Database Developer", "Problem Solver"];
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typeSpeed, setTypeSpeed] = useState(100);
    const [visits, setVisits] = useState(0);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await fetch('https://portfolio-47ec.onrender.com/api/visits');
                if (!response.ok) throw new Error('Network error');
                const data = await response.json();
                setVisits(data.count);
            } catch (error) {
                console.error("Failed to fetch visits:", error);
                const stored = localStorage.getItem('portfolio_visits');
                if (stored) setVisits(parseInt(stored));
            }
        };
        fetchVisits();
    }, []);

    useEffect(() => {
        const handleType = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                setText(currentRole.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
                setTypeSpeed(50);
            } else {
                setText(currentRole.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
                setTypeSpeed(100);
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setIsDeleting(true);
                setTypeSpeed(2000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
                setTypeSpeed(500);
            }
        };

        const timer = setTimeout(handleType, typeSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex, roles, typeSpeed]);

    return (
        <section id="hero" className="hero-section">
            <div className="container hero-container">
                <div className="hero-content fade-in-up">
                    <div className="visit-badge glass">
                        <span className="pulse-dot"></span>
                        <span className="visit-text">Page Visits: {visits.toLocaleString()}</span>
                    </div>
                    <p className="greeting">Hello, I'm <span className="highlight">Harsh Vardhan</span></p>
                    <h1 className="hero-title">I create <span className="text-gradient">Digital Experiences</span></h1>
                    <div className="typewriter-container">
                        <span id="typewriter" className="typewriter-text">{text}</span><span className="cursor">|</span>
                    </div>
                    <p className="hero-description">
                        Building the future of the web with modern technologies and pixel-perfect design.
                        Crafting interfaces that look good and perform better.
                    </p>
                    <div className="cta-group">
                        <a href="#projects" className="btn btn-primary glow-effect">View Projects</a>
                        <a href="#contact" className="btn btn-secondary">Contact Me</a>
                    </div>
                </div>
                <div className="hero-visual fade-in-up delay-200">
                    <div className="abstract-shape">
                        <div className="cube">
                            <div className="face front"></div>
                            <div className="face back"></div>
                            <div className="face right"></div>
                            <div className="face left"></div>
                            <div className="face top"></div>
                            <div className="face bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
