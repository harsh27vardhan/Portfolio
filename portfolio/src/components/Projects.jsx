import React from 'react';

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title fade-in-up">Featured <span className="highlight">Projects</span></h2>
                <div className="projects-grid">

                    {/* Project 1 */}
                    <div className="project-card glass fade-in-up delay-100">
                        <div className="project-content">
                            <h3>MLB Career Financial Analytics</h3>
                            <p>This project is a comprehensive analysis of Major League Baseball (MLB) player salaries and
                                career performance. It utilizes SQL to query and analyze a dataset of player statistics and
                                contract information, providing insights into salary trends, career earnings, and the
                                financial aspects of professional baseball.</p>
                            <div className="tech-tags">
                                <span>SQL</span>
                            </div>
                            <div className="project-links">
                                <a href="https://github.com/harsh27vardhan/MLB-Career-Financial-Analytics" target="_blank" className="btn-sm"><i className="fa-brands fa-github"></i> Code</a>
                            </div>
                        </div>
                    </div>

                    {/* Project 3 - YouTube Comment Analyzer */}
                    <div className="project-card glass fade-in-up delay-300">
                        <div className="project-content">
                            <h3>YouTube Comment Analyzer</h3>
                            <p>This project is a YouTube comment analyzer that takes the extract the comments from the
                                YouTube and uses Gemini to analyze the
                                comments of a YouTube video. It uses a collaborative filtering approach to recommend movies
                                to users based on their preferences.</p>
                            <div className="tech-tags">
                                <span>React</span>
                                <span>YouTube API</span>
                                <span>Gemini API</span>
                                <span>Express.js</span>
                            </div>
                            <div className="project-links">
                                <a href="https://github.com/harsh27vardhan/YouTube-Comment-Analyzer" target="_blank" className="btn-sm"><i className="fa-brands fa-github"></i> Code</a>
                                <a href="https://you-tube-comment-analyzer-eight.vercel.app/" target="_blank" className="btn-sm primary"><i className="fa-solid fa-up-right-from-square"></i> Demo</a>
                            </div>
                        </div>
                    </div>

                    {/* Project 4 - Book It Up */}
                    <div className="project-card glass fade-in-up delay-300">
                        <div className="project-content">
                            <h3>Book It Up</h3>
                            <p>Book It Up is a comprehensive rental application. It features a modern UI built with React. The backend is powered by Express.js and MongoDB. Key features
                                include user authentication, property search and filtering based on the loation and
                                services. The platform also utilizes Cloudinary for optimized image storage.</p>
                            <div className="tech-tags">
                                <span>React</span>
                                <span>Express.js</span>
                                <span>MongoDB</span>
                                <span>Cloudinary</span>
                            </div>
                            <div className="project-links">
                                <a href="https://github.com/harsh27vardhan/BookIt" target="_blank" className="btn-sm"><i className="fa-brands fa-github"></i> Code</a>
                                <a href="https://rentitup.vercel.app/" target="_blank" className="btn-sm primary"><i className="fa-solid fa-up-right-from-square"></i> Demo</a>
                            </div>
                        </div>
                    </div>

                    {/* Project 5 - Movie Recommendation */}
                    <div className="project-card glass fade-in-up delay-300">
                        <div className="project-content">
                            <h3>Movie Recommendation System</h3>
                            <p>This project is a movie recommendation system that uses machine learning to recommend movies
                                to users based on their preferences. It uses a collaborative filtering approach to recommend
                                movies to users based on their preferences.</p>
                            <div className="tech-tags">
                                <span>Python</span>
                                <span>Sklearn</span>
                            </div>
                            <div className="project-links">
                                <a href="https://github.com/harsh27vardhan/Movie-Recommendation" target="_blank" className="btn-sm"><i className="fa-brands fa-github"></i> Code</a>
                            </div>
                        </div>
                    </div>

                    {/* Project 6 - ParkEase */}
                    <div className="project-card glass fade-in-up delay-300">
                        <div className="project-content">
                            <h3>ParkEase</h3>
                            <p>The Parking Space Detection and Visualization project demonstrates proficiency in computer
                                vision, image processing, and software development skills. It showcases the ability to solve
                                real-world problems using technology and provides valuable insights into developing
                                intelligent systems for smart cities and transportation management.
                            </p>
                            <div className="tech-tags">
                                <span>Python</span>
                                <span>YOLO v8</span>
                                <span>Firebase</span>
                            </div>
                            <div className="project-links">
                                <a href="https://github.com/harsh27vardhan/ParkEase" target="_blank" className="btn-sm"><i className="fa-brands fa-github"></i> Code</a>
                                <a href="https://shivalik.pythonanywhere.com/" target="_blank" className="btn-sm primary"><i className="fa-solid fa-up-right-from-square"></i> Demo</a>
                            </div>
                        </div>
                    </div>

                    {/* Project 7 - Minesweeper */}
                    <div className="project-card glass fade-in-up delay-300">
                        <div className="project-content">
                            <h3>Minesweeper Game</h3>
                            <p>This project is a classic Minesweeper game built with HTML, CSS, and JavaScript. It features
                                a responsive grid layout, mine counter, and game state management. The game includes
                                three difficulty levels (Beginner, Intermediate, Expert) and provides visual feedback for
                                revealing cells, flagging mines, and game-ending conditions.</p>
                            <div className="tech-tags">
                                <span>Javascript</span>
                                <span>Tailwind css</span>
                                <span>HTML 5</span>
                            </div>
                            <div className="project-links">
                                <a href="https://github.com/harsh27vardhan/MineSweeper" target="_blank" className="btn-sm"><i className="fa-brands fa-github"></i> Code</a>
                                <a href="https://minosweeper.vercel.app/" target="_blank" className="btn-sm primary"><i className="fa-solid fa-up-right-from-square"></i> Demo</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Projects;
