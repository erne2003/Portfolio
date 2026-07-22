import './Projects.css';
import ImageCarousel from '../Components/ImageCarousel';

// ✅ Vite way: import images as ES modules (they resolve to URLs)
import vf1 from '../assets/VirtusFitness/IMG_1361.PNG';
import vf2 from '../assets/VirtusFitness/IMG_1362.PNG';
import vf3 from '../assets/VirtusFitness/IMG_1363.PNG';
import vf4 from '../assets/VirtusFitness/IMG_1364.PNG';
import vf5 from '../assets/VirtusFitness/IMG_1365.PNG';
import vf6 from '../assets/VirtusFitness/IMG_1366.PNG';
import baserowImg from '../assets/Baserow/Baserow.png';

const projects = [
    {
        type: 'Mobile App',
        title: 'Expense Tracker App (In Development)',
        description:
            'A cross-platform mobile application engineered around strict OWASP MASVS benchmarks. Features hardware-backed token isolation, AES-256-GCM encryption for Firestore tokens, and a Node.js proxy to completely eliminate client-side Plaid secret exposure.',
        tags: ['React Native', 'Node.js', 'Express', 'Firebase', 'Plaid API', 'AES-256'],
        icon: '💳',
        featured: true,
        github: 'https://github.com/eme2003',
        demo: '#',
        // ↓ Add your screenshot URLs/paths here
        images: [
            'https://placehold.co/600x340/111119/00a8ff?text=Expense+Tracker+1',
            'https://placehold.co/600x340/111119/2dd4bf?text=Expense+Tracker+2',
            'https://placehold.co/600x340/111119/8b5cf6?text=Expense+Tracker+3',
        ],
    },
    {
        type: 'Full-Stack SaaS',
        title: 'Virtus Metrics',
        description:
            'A full-stack fitness and recovery platform built with Next.js 15 and PostgreSQL. Features manual JWT auth with BOLA/IDOR protection at the query level, alongside an automated GitHub Actions DevSecOps pipeline delivering a 0-vulnerability supply chain.',
        tags: ['Next.js 15', 'Node.js', 'PostgreSQL', 'DevSecOps', 'Tailwind CSS', 'Snyk', 'JavaScript', 'Vite', 'Vercel', 'Railway',],
        icon: '',
        featured: true,
        github: 'https://github.com/erne2003/Workout-Planner',
        images: [vf1, vf2, vf3, vf4, vf5, vf6],
    },
    {
        type: 'Open Source',
        title: 'Baserow Core Contribution',
        description:
            'Resolved a high-priority backend data-integrity bug (Issue #2960) in the Baserow enterprise database platform. Conducted root-cause analysis and refactored field-metadata processing logic, boosting processing speeds by 15% across row re-orderings.',
        tags: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Open Source',],
        icon: '🗄️',
        featured: true,
        github: 'https://github.com/eme2003',
        demo: 'https://baserow.io',
        images: [baserowImg],
    },
];

function Projects({ id }) {
    return (
        <section id={id} className="projects">
            <div className="projects__header">
                <span className="section-label">Portfolio</span>
                <h2 className="section-title">Projects</h2>
                <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
                    A selection of projects I've built — from full-stack applications to
                    backend services and interactive data tools.
                </p>
            </div>

            <div className="projects__grid">
                {projects.map((project, i) => (
                    <div
                        className={`projects__card glass-card glass-card--blue ${project.featured ? 'projects__card--featured' : ''
                            }`}
                        key={i}
                    >
                        {/* Image area — carousel if images exist, fallback to icon */}
                        <div className="projects__image">
                            {project.images && project.images.length > 0 ? (
                                <ImageCarousel images={project.images} />
                            ) : (
                                <>
                                    <div className="projects__image-pattern" />
                                    <div className="projects__image-overlay" />
                                    <span className="projects__image-icon">{project.icon}</span>
                                </>
                            )}
                        </div>

                        {/* Card body */}
                        <div className="projects__body">
                            <span className="projects__card-type">{project.type}</span>
                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__card-desc">{project.description}</p>

                            <div className="projects__card-tags">
                                {project.tags.map((tag) => (
                                    <span className="tech-chip" key={tag}>{tag}</span>
                                ))}
                            </div>

                            <div className="projects__card-links">
                                {project.github && (
                                    <a href={project.github} className="projects__link" target="_blank" rel="noopener noreferrer">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                        Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;