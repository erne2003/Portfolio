import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import DecryptedText from './DecryptedText';
import Folder from './Folder';

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'About me', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#techstack' },
];

// The folder menu fans its links out to the left, so it needs a wide viewport.
const FOLDER_QUERY = '(min-width: 1280px)';
// The drawer is replaced by inline links at this width (matches Navbar.css).
const DESKTOP_QUERY = '(min-width: 1024px)';

function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = (e) => setMatches(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const canUseFolder = useMediaQuery(FOLDER_QUERY);
    const isDesktop = useMediaQuery(DESKTOP_QUERY);
    const headerRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
                setIsFolderOpen(false);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // While the drawer is open: Escape (focus returns to the toggle) or a tap
    // outside the header closes it, and the page behind it can't scroll.
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        };
        const onPointerDown = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) setIsOpen(false);
        };
        const root = document.documentElement;
        const prevOverflow = root.style.overflow;
        root.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onPointerDown);
        return () => {
            root.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onPointerDown);
        };
    }, [isOpen]);

    // Rotating or resizing up to desktop width hides the drawer, so reset it
    useEffect(() => {
        if (isDesktop) setIsOpen(false);
    }, [isDesktop]);

    const collapsed = isScrolled && canUseFolder;

    return (
        <header
            ref={headerRef}
            onMouseLeave={() => setIsFolderOpen(false)}
            className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        >
            <nav className="navbar__inner" aria-label="Primary">
                <a href="#hero" className="navbar__brand" aria-label="Ernesto Cardoso, back to top">
                    <DecryptedText
                        text="Ernesto Cardoso"
                        animateOn="view"
                        speed={32}
                        maxIterations={12}
                        revealDirection="start"
                        sequential
                        revealChunkSize={2}
                    />
                </a>

                {/* Desktop: links, which slide into the folder on scroll (wide screens only) */}
                <div className="navbar__desktop">
                    <ul
                        className={`navbar__links ${collapsed ? 'navbar__links--hidden' : ''}`}
                        aria-hidden={collapsed}
                        inert={collapsed}
                    >
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="nav-link">{link.name}</a>
                            </li>
                        ))}
                    </ul>

                    {canUseFolder && (
                        <div className={`navbar__folder ${collapsed ? 'navbar__folder--visible' : ''}`}>
                            <Folder
                                color="#3dc9d6"
                                size={0.55}
                                items={navLinks}
                                isScrolled={collapsed}
                                isOpen={isFolderOpen}
                                onOpen={() => setIsFolderOpen(true)}
                                onToggle={() => setIsFolderOpen((prev) => !prev)}
                                onClose={() => setIsFolderOpen(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Mobile / tablet menu button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    ref={toggleRef}
                    className="navbar__toggle"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        {isOpen ? (
                            <path d="M6 6l12 12M18 6L6 18" />
                        ) : (
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile drawer */}
            {isOpen && (
                <ul id="mobile-menu" className="navbar__drawer">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="navbar__drawer-link"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}

export default Navbar;
