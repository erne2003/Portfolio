import { useState } from 'react';
import DecryptedText from './DecryptedText';
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Experience', href: '#experience' },
        { name: 'About me', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Skills', href: '#techstack' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800 text-slate-200">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo / Name */}
                <a href="#hero" className="text-xl font-bold tracking-tight text-teal-400 hover:text-teal-300 transition-colors">
                    <DecryptedText
                        text="Ernesto Cardoso"
                        animateOn="view"
                        speed={32}
                        maxIterations={12}
                        revealDirection="start"
                        sequential
                    />
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="hover:text-teal-400 transition-colors duration-200"
                        >
                            {link.name}
                        </a>
                    ))}
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