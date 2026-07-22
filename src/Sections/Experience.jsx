import './Experience.css';

const currentWork = [
    {
        date: '2021 — Present',
        role: 'Front End Coordinator',
        company: 'Publix Super Markets',
        details: [
            'Supervised and coordinated teams of 10+ employees during shift operations to ensure operational efficiency.',
            'Managed dynamic personnel scheduling and resource allocation to maintain coverage during high-traffic periods.',
            'Resolved customer service escalations while directing service standards in a fast-paced retail environment.',
        ],
        tags: ['Leadership', 'Operations Management', 'Customer Experience', 'Team Collaboration', 'Problem Solving'],
    },
];

const pastExperiences = [
      {
        date: 'July 2026 — August 2026',
        role: 'Junior Application Tester',
        company: 'Maroon Co.',
        details: [
            'Evaluated core application UI/UX flows to ensure a seamless user experience and rapidly identify potential functional bugs.',
            'Delivered structured feedback to the development engineering team regarding usability friction and edge-case execution.',
            'Maintained 100% compliance with corporate quality standards regarding feedback depth, volume, and reporting timelines.',
        ],
        tags: ['UI/UX Testing', 'Bug Tracking', 'Quality Assurance', 'Usability Testing', 'Feedback Analysis'],
    },
    {
        date: '2022 — 2026',
        role: 'Software Engineer & Computer Science Student',
        company: 'Florida International University',
        details: [
            'Pursuing a Bachelor of Science in Computer Science with a focus on software development, algorithms, and application security.',
            'Engineered multiple full-stack projects involving modern web/mobile frameworks, complex data structures, and secure API design.',
            'Developed core technical proficiency across Java, C++, Python, TypeScript, React, and Node.js environments.',
        ],
        tags: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'C++', 'Java', 'Data Structures', 'Algorithms', 'SDLC', 'AppSec'],
    },
];

function ExperienceCard({ exp }) {
    return (
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
    );
}


function Experience({ id }) {
    return (
        <section id={id} className="experience">
            <div className="experience__columns">
                {/* Current Work Column */}
                <div className="experience__section">
                    <div className="experience__header">
                        <span className="section-label">Present</span>
                        <h2 className="section-title">Current Work</h2>
                    </div>
                    <div className="experience__grid">
                        {currentWork.map((exp, i) => (
                            <ExperienceCard key={i} exp={exp} />
                        ))}
                    </div>
                </div>

                {/* Past Experience Column */}
                <div className="experience__section">
                    <div className="experience__header experience__header--shifted">
                        <span className="section-label">Career</span>
                        <h2 className="section-title">Past Experience</h2>
                    </div>
                    <div className="experience__timeline">
                        {pastExperiences.map((exp, i) => (
                            <div className="experience__entry" key={i}>
                                <div className="experience__dot" />
                                <ExperienceCard exp={exp} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience;