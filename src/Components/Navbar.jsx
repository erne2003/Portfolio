import { useState, useEffect } from 'react';
import DecryptedText from './DecryptedText';
import Folder from './Folder';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
                setIsFolderOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseLeaveNav = () => {
        setIsFolderOpen(false);
    };

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Experience', href: '#experience' },
        { name: 'About me', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#techstack' },
    ];

    return (
        <nav
            onMouseLeave={handleMouseLeaveNav}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-slate-900/90 backdrop-blur-lg border-b border-slate-800/80 py-1 shadow-xl'
                    : 'bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-0'
            } text-slate-200`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo / Name */}
                <a
                    href="#hero"
                    className="mr-auto text-xl font-bold tracking-tight text-teal-400 hover:text-teal-300 transition-colors"
                >
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

                {/* Right side container holding Desktop Nav Links & Folder */}
                <div className="hidden md:flex items-center relative min-h-[48px] justify-end">
                    {/* Desktop Navigation Links — slides right into folder when scrolled */}
                    <div
                        className={`flex items-center space-x-8 transition-all duration-700 ease-in-out ${
                            isScrolled
                                ? 'translate-x-[160px] scale-0 opacity-0 pointer-events-none'
                                : 'translate-x-0 scale-100 opacity-100'
                        }`}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="nav-link"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Folder Menu — appears on scroll and receives the sliding options */}
                    <div
                        className={`transition-all duration-700 ease-in-out ${
                            isScrolled
                                ? 'opacity-100 scale-90 translate-x-0'
                                : 'opacity-0 scale-0 translate-x-8 pointer-events-none absolute right-0'
                        }`}
                    >
                        <Folder
                            color="#00a8ff"
                            size={0.55}
                            items={navLinks}
                            isScrolled={isScrolled}
                            isOpen={isFolderOpen}
                            onOpen={() => setIsFolderOpen(true)}
                            onToggle={() => setIsFolderOpen((prev) => !prev)}
                            onClose={() => setIsFolderOpen(false)}
                        />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-slate-400 hover:text-slate-100 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.83-4.828 4.83a1 1 0 01-1.414-1.414l4.829-4.83-4.829-4.83a1 1 0 011.414-1.414l4.828 4.83 4.829-4.83a1 1 0 011.414 1.414l-4.83 4.83 4.83 4.83z" />
                        ) : (
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Drawer Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 pt-2 pb-6 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)} // Close menu on click
                            className="block text-base font-medium hover:text-teal-400 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;