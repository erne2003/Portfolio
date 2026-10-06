import './Education.css';

const educationData = [
    {
        degree: 'Master of Science in Cybersecurity',
        school: 'Florida International University',
        date: 'Enrolled (Fall 2026)',
        description:
            'Advanced graduate program focused on threat mitigation, applied cryptography, system resilience, and specialized domain security. Requires maintaining a 3.0+ GPA across core cybersecurity principles, targeted concentration tracks, and technical electives.',
        courses: [
            'Principles of Cybersecurity',
            'Introduction to Cryptography',
            'Cybersecurity & Privacy: Attacks & Defenses',
            'Software Vulnerabilities & Security',
            'Systems Security',
        ],
        color: 'blue',
        icon: '🎓',
        icon2: '🛡️',
        inProgress: true,
    },
    {
        degree: 'CompTIA Security+',
        school: 'CompTIA',
        date: 'In Progress (Expected 2026)',
        description:
            'Industry-standard credential validating foundational cybersecurity skills across enterprise security operations, threat architecture, risk management, and secure software development lifecycles.',
        courses: ['General Security Concepts', 'Threats & Vulnerabilities', 'Security Architecture', 'Operations & Incident Response', 'Governance & Compliance'],
        color: 'red',
        icon: '🛡️',
        inProgress: true,
    },
    {
        degree: 'AWS Certified Solutions Architect – Associate',
        school: 'Amazon Web Services',
        date: 'In Progress (Expected 2026)',
        description:
            'Validates the ability to design secure, resilient, high-performing, and cost-optimized architectures on AWS using the Well-Architected Framework.',
        courses: ['Secure Architectures', 'Resilient Architectures', 'High-Performing Architectures', 'Cost-Optimized Architectures'],
        color: 'red',
        icon: '☁️',
        inProgress: true,
    },
    {
        degree: 'Bachelor of Science in Computer Science',
        school: 'Florida International University',
        date: '2024 — 2026',
        description:
            'Focused on software engineering, data structures, algorithms, and distributed systems. Dean\'s List multiple semesters.',
        courses: ['Data Structures', 'Algorithms', 'Databases', 'Cloud Computing', 'Software Engineering'],
        color: 'blue',
        icon: '🎓',
    },
    {
        degree: 'Associate of Arts in Computer Science',
        school: 'Miami Dade College',
        date: '2022 — 2024',
        description:
            'Demonstrated foundational understanding of Computer Science concepts.',
        courses: ['Data Structures', 'Algorithms', 'Object Oriented Programming', 'Discrete Mathematics', 'Computer Architecture'],
        color: 'teal',
        icon: '📚',
    },
];

function EducationCard({ item }) {
    return (
        <div className={`education__card glass-card education__card--${item.color}`}>
            <div className="education__icons">
                <div className={`education__icon education__icon--${item.color}`}>
                    {item.icon}
                </div>
                {item.icon2 && (
                    <div className={`education__icon education__icon--${item.color}`}>
                        {item.icon2}
                    </div>
                )}
            </div>
            <div className="education__content">
                <h3 className="education__degree">{item.degree}</h3>
                <p className="education__school">{item.school}</p>
                <span className="education__date">{item.date}</span>
                <p className="education__desc">{item.description}</p>
                <div className="education__courses">
                    {item.courses.map((course) => (
                        <span className="tech-chip" key={course}>{course}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Education({ id }) {
    const inProgress = educationData.filter((item) => item.inProgress);
    const completed = educationData.filter((item) => !item.inProgress);

    return (
        <section id={id} className="section education" aria-labelledby="education-title">
            <div className="section-header">
                <span className="section-label">Background</span>
                <h2 id="education-title" className="section-title">Education</h2>
            </div>

            <div className="education__grid">
                <div className="education__column">
                    <h3 className="education__column-title">
                        <span aria-hidden="true">⏳</span> In Progress
                    </h3>
                    {inProgress.map((item) => (
                        <EducationCard item={item} key={item.degree} />
                    ))}
                </div>

                <div className="education__column">
                    <h3 className="education__column-title">
                        <span aria-hidden="true">✅</span> Completed
                    </h3>
                    {completed.map((item) => (
                        <EducationCard item={item} key={item.degree} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;
