import React from 'react';

const Experience = () => {
    return (
        <section id="experience" className="experience-section">
            <div className="container">
                <h2 className="section-title fade-in-up">My <span className="highlight">Journey</span></h2>
                <div className="timeline">
                    <div className="timeline-line"></div>

                    {/* Item 1 */}
                    <div className="timeline-item fade-in-up delay-100">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content glass">
                            <span className="date">October 2025 - Present</span>
                            <h3>Senior Frontend Engineer</h3>
                            <p className="company">Enaviya Information Technology Pvt. Ltd.</p>
                            <p className="description">
                                Leveraging Yeoman for project scaffolding, TypeScript for robust, type-safe coding, and the Node.js-based toolchain (Gulp and Webpack) for automated building, optimization, and deployment of SPFx components.
                                Developed and deployed client-side Web Parts using SPFx and TypeScript to extent and customize SharePoint Online functionality, improving user experience and data presentation.
                                Used React to build reusable, prerformant, and modern user interfaces for custom business applications within SharePoint.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="timeline-item fade-in-up delay-200">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content glass">
                            <span className="date">June 2025 - September 2025</span>
                            <h3>Programmer Analyst Intern (QA and Automation)</h3>
                            <p className="company">Cognizant Technology Solutions</p>
                            <p className="description">
                                Executed Manual and Automated Testing using Selenium WebDriver, Cucumber (BDD), and API Testing tools (Postman/RestAssured) to validate functionality, performance, and reliability.
                                Utilized Jira for test management and defect tracking while collaborating in an Agile environment to ensure timely delivery.
                                Implemented Docker-based test environments and integrated automation suites with Jenkins CI/CD pipelines for continuous testing and faster releases.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="timeline-item fade-in-up delay-300">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content glass">
                            <span className="date">Oct 2024 - Dec 2024</span>
                            <h3>Web Developer Intern</h3>
                            <p className="company">Explorin</p>
                            <p className="description">
                                Collaborated with senior engineers on MERN stack projects, enhancing performance, scalability, responsiveness.
                                Designed and implemented RESTful APIs and optimized database queries to improve data retrieval efficiency and application performance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
