import './Experience.css';

const experiences = [
    {
        date: '2024 — Present',
        role: 'Software Engineer',
        company: 'Fintech Startup',
        details: [
            'Developed real-time transaction processing pipelines handling 10K+ events/sec',
            'Built responsive dashboards with React and D3.js for financial data visualization',
            'Implemented microservices architecture using Node.js and PostgreSQL',
        ],
        tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'D3.js'],
    },
    {
        date: '2022 — 2024',
        role: 'Junior Developer',
        company: 'Tech Solutions Inc.',
        details: [
            'Maintained and enhanced full-stack web applications serving 50K+ users',
            'Reduced API response times by 40% through query optimization and caching',
            'Collaborated in agile sprints delivering features on a bi-weekly cadence',
        ],
        tags: ['JavaScript', 'Python', 'REST APIs', 'Docker', 'Git'],
    },
    {
        date: '2021 — 2022',
        role: 'Software Engineering Intern',
        company: 'Digital Agency',
        details: [
            'Built interactive landing pages and marketing sites for enterprise clients',
            'Gained hands-on experience with CI/CD pipelines and automated testing',
        ],
        tags: ['HTML/CSS', 'JavaScript', 'Figma', 'CI/CD'],
    },
];

function Experience({ id }) {
    return (
        <section id={id} className="experience">
            <div className="experience__header">
                <span className="section-label">Career</span>
                <h2 className="section-title">Experience</h2>
            </div>

            <div className="experience__timeline">
                {experiences.map((exp, i) => (
                    <div className="experience__entry" key={i}>
                        <div className="experience__dot" />
                        <div className="experience__card glass-card glass-card--blue">
                            <span className="experience__date">{exp.date}</span>
                            <h3 className="experience__role">{exp.role}</h3>
                            <p className="experience__company">{exp.company}</p>
                            <ul className="experience__details">
                                {exp.details.map((d, j) => (
                                    <li key={j}>{d}</li>
                                ))}
                            </ul>
                            <div className="experience__tags">
                                {exp.tags.map((tag) => (
                                    <span className="tech-chip" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;