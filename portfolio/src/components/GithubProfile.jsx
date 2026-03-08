import React, { useEffect, useState, useRef } from 'react';

const GithubProfile = () => {
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // We try hitting the local server since you are currently running it
                // If you deploy the backend somewhere else, replace this URL with the production URL
                // e.g., https://portfolio-47ec.onrender.com/api/github
                const response = await fetch('https://portfolio-47ec.onrender.com/api/github');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setGithubData(result.data.user);
            } catch (error) {
                console.error("Failed to fetch GitHub data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    useEffect(() => {
        if (!loading && githubData && containerRef.current) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [loading, githubData]);

    if (loading) {
        return (
            <section id="github" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <h2 className="section-title">GitHub <span className="text-gradient">Activity</span></h2>
                    <div className="glass" style={{ padding: '2rem', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>Loading GitHub stats...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (!githubData) {
        return null; // Don't render the section if data fails to fetch
    }

    return (
        <section id="github" style={{ padding: '5rem 0' }}>
            <div className="container fade-in-up" ref={containerRef}>
                <h2 className="section-title">GitHub <span className="text-gradient">Activity</span></h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Profile Card */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--glass-border)', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <img
                            src={githubData.avatarUrl}
                            alt={`${githubData.name}'s Avatar`}
                            style={{ width: '120px', borderRadius: '50%', marginBottom: '1rem', border: '2px solid var(--accent-cyan)' }}
                        />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{githubData.name}</h3>
                        <p className="highlight" style={{ fontSize: '0.9rem', marginBottom: '0.8rem' }}>{githubData.location}</p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{githubData.bio}</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem' }}>{githubData.followers.totalCount}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Followers</span>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem' }}>{githubData.following.totalCount}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Following</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Contributions overview</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Total Repositories</span>
                                <strong className="text-gradient" style={{ fontSize: '1.1rem' }}>{githubData.repositories.totalCount}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Commits (This Year)</span>
                                <strong className="text-gradient" style={{ fontSize: '1.1rem' }}>{githubData.contributionsCollection.totalCommitContributions}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Pull Requests</span>
                                <strong className="text-gradient" style={{ fontSize: '1.1rem' }}>{githubData.contributionsCollection.totalPullRequestContributions}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Issues</span>
                                <strong className="text-gradient" style={{ fontSize: '1.1rem' }}>{githubData.contributionsCollection.totalIssueContributions}</strong>
                            </div>

                            <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Total Contributions</span>
                                <strong className="highlight" style={{ fontSize: '1.4rem' }}>{githubData.contributionsCollection.contributionCalendar.totalContributions}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Repositories */}
                {/* {(() => {
                    // Try to show pinned items, if none, show the top 6 repositories
                    const reposToShow = githubData.pinnedItems?.nodes?.length > 0
                        ? githubData.pinnedItems.nodes
                        : githubData.repositories.nodes.slice(0, 6);

                    if (!reposToShow || reposToShow.length === 0) return null;

                    return (
                        <div style={{ marginTop: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                                {githubData.pinnedItems?.nodes?.length > 0 ? "Pinned Projects" : "Recent Projects"}
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {reposToShow.map((repo, idx) => (
                                    <a href={repo.url} target="_blank" rel="noopener noreferrer" key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="glass project-card" style={{ padding: '1.5rem', height: '100%', border: '1px solid var(--glass-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                                            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{repo.name}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.4', flex: 1 }}>{repo.description || 'No description available.'}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginTop: 'auto' }}>
                                                {repo.primaryLanguage ? (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-purple)', display: 'inline-block' }}></span>
                                                        {repo.primaryLanguage.name}
                                                    </span>
                                                ) : <span></span>}
                                                <span style={{ color: 'var(--text-secondary)' }}>⭐ {repo.stargazerCount}</span>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    );
                })()} */}
            </div>
        </section>
    );
};

export default GithubProfile;
