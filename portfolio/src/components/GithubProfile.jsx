import React, { useEffect, useState, useRef } from 'react';

// Simplified SVG Icons for Professional Look
const Icons = {
    Location: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Repo: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14z"></path><line x1="2" y1="10" x2="22" y2="10"></line><line x1="8" y1="2" x2="8" y2="22"></line></svg>,
    Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
    PullRequest: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>,
    Commit: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><line x1="3" y1="12" x2="9" y2="12"></line><line x1="15" y1="12" x2="21" y2="12"></line></svg>,
    Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    ExternalLink: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
};

// GitHub Language Colors
const langColors = {
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    'C++': '#f34b7d',
    Java: '#b07219',
    TypeScript: '#3178c6',
    'Jupyter Notebook': '#DA5B0B',
    DEFAULT: 'var(--accent-purple)'
};

const GithubProfile = () => {
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // If you deploy the backend somewhere else, replace this URL with the production URL
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
                    <div className="glass flex-center" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <div className="pulse-dot" style={{ width: '20px', height: '20px', background: 'var(--accent-cyan)' }}></div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Synchronizing with GitHub...</p>
                        </div>
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

                <div className="glass" style={{
                    padding: '2.5rem',
                    borderRadius: '16px',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '3rem',
                    background: 'rgba(10, 10, 10, 0.4)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}>

                    {/* Left: Profile Info Dashboard */}
                    <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
                            <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', zIndex: 0, opacity: 0.8, filter: 'blur(3px)' }}></div>
                            <img
                                src={githubData.avatarUrl}
                                alt={`${githubData.name}'s Avatar`}
                                style={{ position: 'relative', zIndex: 1, width: '140px', height: '140px', borderRadius: '50%', border: '4px solid var(--bg-color)', objectFit: 'cover' }}
                            />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', fontWeight: '700' }}>{githubData.name}</h3>

                        {(githubData.location || githubData.bio) && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                {githubData.location && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        <Icons.Location /> <span>{githubData.location}</span>
                                    </div>
                                )}
                                {githubData.bio && (
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{githubData.bio}</p>
                                )}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.03)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', width: '100%', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{githubData.followers.totalCount}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Icons.Users /> Followers</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{githubData.following.totalCount}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Following</span>
                            </div>
                        </div>

                        <a href={`https://github.com/harsh27vardhan`} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow-effect" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', fontSize: '1rem' }}>
                            View GitHub Profile
                        </a>
                    </div>

                    {/* Right: Stats Grid */}
                    <div style={{ flex: '2 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignContent: 'start' }}>
                        {/* Stat Item 1 */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                <div style={{ color: 'var(--accent-cyan)', background: 'rgba(6,182,212,0.1)', padding: '0.6rem', borderRadius: '8px', display: 'flex' }}><Icons.Activity /></div>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Contributions</span>
                            </div>
                            <h4 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: 'var(--text-primary)' }}>{githubData.contributionsCollection.contributionCalendar.totalContributions}</h4>
                            <span style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Past year</span>
                        </div>

                        {/* Stat Item 2 */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                <div style={{ color: 'var(--accent-purple)', background: 'rgba(192,38,211,0.1)', padding: '0.6rem', borderRadius: '8px', display: 'flex' }}><Icons.Repo /></div>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Repositories</span>
                            </div>
                            <h4 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: 'var(--text-primary)' }}>{githubData.repositories.totalCount}</h4>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Total public</span>
                        </div>

                        {/* Stat Item 3 */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                <div style={{ color: 'var(--accent-emerald)', background: 'rgba(16,185,129,0.1)', padding: '0.6rem', borderRadius: '8px', display: 'flex' }}><Icons.Commit /></div>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Commits</span>
                            </div>
                            <h4 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: 'var(--text-primary)' }}>{githubData.contributionsCollection.totalCommitContributions}</h4>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Past year</span>
                        </div>

                        {/* Stat Item 4 */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'transform 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                <div style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '0.6rem', borderRadius: '8px', display: 'flex' }}><Icons.PullRequest /></div>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>PRs & Issues</span>
                            </div>
                            <h4 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: 'var(--text-primary)' }}>{githubData.contributionsCollection.totalPullRequestContributions + githubData.contributionsCollection.totalIssueContributions}</h4>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Past year</span>
                        </div>
                    </div>
                </div>

                {/* Repositories */}
                {
                    // (() => {
                    //     const reposToShow = githubData.pinnedItems?.nodes?.length > 0
                    //         ? githubData.pinnedItems.nodes
                    //         : githubData.repositories?.nodes?.slice(0, 6) || [];

                    //     if (!reposToShow || reposToShow.length === 0) return null;

                    //     return (
                    //         <div style={{ marginTop: '4rem' }}>
                    //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                    //                 <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', margin: 0 }}>
                    //                     {githubData.pinnedItems?.nodes?.length > 0 ? "Featured Repositories" : "Recent Repositories"}
                    //                 </h3>
                    //                 <a href="https://github.com/harsh27vardhan?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '500', transition: 'var(--transition-fast)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-purple)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--accent-cyan)'}>
                    //                     View All <Icons.ExternalLink />
                    //                 </a>
                    //             </div>

                    //             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    //                 {reposToShow.map((repo, idx) => {
                    //                     const langColor = repo.primaryLanguage ? (langColors[repo.primaryLanguage.name] || langColors.DEFAULT) : langColors.DEFAULT;

                    //                     return (
                    //                         <a href={repo.url} target="_blank" rel="noopener noreferrer" key={idx} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                    //                             <div className="glass project-card" style={{
                    //                                 padding: '1.5rem',
                    //                                 height: '100%',
                    //                                 border: '1px solid var(--glass-border)',
                    //                                 borderRadius: '12px',
                    //                                 display: 'flex',
                    //                                 flexDirection: 'column',
                    //                                 position: 'relative',
                    //                                 overflow: 'hidden',
                    //                                 transition: 'all 0.3s ease',
                    //                             }}
                    //                                 onMouseEnter={e => {
                    //                                     e.currentTarget.style.transform = 'translateY(-5px)';
                    //                                     e.currentTarget.style.borderColor = langColor;
                    //                                     e.currentTarget.style.boxShadow = `0 10px 30px -10px ${langColor}40`;
                    //                                 }}
                    //                                 onMouseLeave={e => {
                    //                                     e.currentTarget.style.transform = 'translateY(0)';
                    //                                     e.currentTarget.style.borderColor = 'var(--glass-border)';
                    //                                     e.currentTarget.style.boxShadow = 'none';
                    //                                 }}
                    //                             >
                    //                                 {/* Top Language Border Hint */}
                    //                                 <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', backgroundColor: langColor, transition: 'inherit' }} className="repo-accent-line"></div>

                    //                                 <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', marginTop: '0.5rem' }}>
                    //                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    //                                         <div style={{ color: 'var(--text-secondary)' }}><Icons.Repo /></div>
                    //                                         <h4 style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: '600', margin: 0, wordBreak: 'break-word' }}>{repo.name}</h4>
                    //                                     </div>
                    //                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '20px' }}>
                    //                                         <Icons.Star /> {repo.stargazerCount}
                    //                                     </div>
                    //                                 </div>

                    //                                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5', flex: 1 }}>
                    //                                     {repo.description || 'No description provided for this repository.'}
                    //                                 </p>

                    //                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginTop: 'auto' }}>
                    //                                     {repo.primaryLanguage ? (
                    //                                         <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                    //                                             <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: langColor, display: 'inline-block' }}></span>
                    //                                             {repo.primaryLanguage.name}
                    //                                         </span>
                    //                                     ) : <span></span>}
                    //                                     <span style={{ color: 'var(--text-secondary)' }}>
                    //                                         Updated {new Date(repo.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    //                                     </span>
                    //                                 </div>
                    //                             </div>
                    //                         </a>
                    //                     );
                    //                 })}
                    //             </div>
                    //         </div>
                    //     );
                    // })()
                }
            </div>
        </section>
    );
};

export default GithubProfile;
