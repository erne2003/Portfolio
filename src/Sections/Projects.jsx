import './Projects.css';

const projects = [
    {
        type: 'Full-Stack App',
        title: 'Portfolio Dashboard',
        description:
            'A real-time financial portfolio tracker with interactive charts, performance analytics, and automated alerting. Built with a focus on sub-100ms response times.',
        tags: ['React', 'Node.js', 'WebSocket', 'D3.js', 'PostgreSQL'],
        icon: '📊',
        featured: true,
        github: '#',
        demo: '#',
    },
    {
        type: 'Web Application',
        title: 'Payment Gateway UI',
        description:
            'Sleek checkout flow and merchant dashboard for a payment processing platform. Includes fraud detection visualization and transaction history.',
        tags: ['React', 'TypeScript', 'Stripe API', 'Tailwind'],
        icon: '💳',
        github: '#',
        demo: '#',
    },
    {
        type: 'API / Backend',
        title: 'Auth Microservice',
        description:
            'JWT-based authentication service with OAuth2 integration, rate limiting, and role-based access control. Deployed on AWS Lambda.',
        tags: ['Node.js', 'Express', 'JWT', 'AWS Lambda', 'DynamoDB'],
        icon: '🔐',
        github: '#',
    },
    {
        type: 'Mobile / PWA',
        title: 'Expense Tracker',
        description:
            'Progressive web app for tracking personal finances with budget categories, recurring transactions, and monthly reports.',
        tags: ['React', 'PWA', 'IndexedDB', 'Chart.js'],
        icon: '💰',
        github: '#',
        demo: '#',
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
                        className={`projects__card glass-card glass-card--blue ${
                            project.featured ? 'projects__card--featured' : ''
                        }`}
                        key={i}
                    >
                        {/* Image / visual area */}
                        <div className="projects__image">
                            <div className="projects__image-pattern" />
                            <div className="projects__image-overlay" />
                            <span className="projects__image-icon">{project.icon}</span>
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
                                {project.demo && (
                                    <a href={project.demo} className="projects__link" target="_blank" rel="noopener noreferrer">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                        </svg>
                                        Live Demo
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