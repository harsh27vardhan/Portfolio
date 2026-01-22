import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar glass">
            <div className="container nav-container">
                <div></div>
                <div
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    id="mobile-menu"
                    onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="#hero" className="nav-link" onClick={closeMenu}>Home</a></li>
                    <li><a href="#skills" className="nav-link" onClick={closeMenu}>Skills</a></li>
                    <li><a href="#experience" className="nav-link" onClick={closeMenu}>Experience</a></li>
                    <li><a href="#projects" className="nav-link" onClick={closeMenu}>Projects</a></li>
                    <li><a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
