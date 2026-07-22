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
        icon2: '🛡️'
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

function Education({ id }) {
    const [msDegree, secPlus, bsDegree, aaDegree] = educationData;

    return (
        <section id={id} className="education">
            <div className="education__header">
                <span className="section-label">Background</span>
                <h2 className="section-title">Education</h2>
            </div>

            <div className="education__grid">
                {/* Column 1: In Progress */}
                <div className="education__column">
                    <h3 className="education__column-title">
                        <span>⏳</span> In Progress
                    </h3>

                    {/* 1. Master of Science in Cybersecurity */}
                    <div className={`education__card glass-card education__card--${msDegree.color}`}>
                        <div className="education__icons">
                            <div className={`education__icon education__icon--${msDegree.color}`}>
                                {msDegree.icon}
                            </div>
                            {msDegree.icon2 && (
                                <div className={`education__icon education__icon--${msDegree.color}`}>
                                    {msDegree.icon2}
                                </div>
                            )}
                        </div>
                        <div className="education__content">
                            <h3 className="education__degree">{msDegree.degree}</h3>
                            <p className="education__school">{msDegree.school}</p>
                            <span className="education__date">{msDegree.date}</span>
                            <p className="education__desc">{msDegree.description}</p>
                            <div className="education__courses">
                                {msDegree.courses.map((course) => (
                                    <span className="tech-chip" key={course}>{course}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. CompTIA Security+ */}
                    <div className={`education__card glass-card education__card--${secPlus.color}`}>
                        <div className="education__icons">
                            <div className={`education__icon education__icon--${secPlus.color}`}>
                                {secPlus.icon}
                            </div>
                        </div>
                        <div className="education__content">
                            <h3 className="education__degree">{secPlus.degree}</h3>
                            <p className="education__school">{secPlus.school}</p>
                            <span className="education__date">{secPlus.date}</span>
                            <p className="education__desc">{secPlus.description}</p>
                            <div className="education__courses">
                                {secPlus.courses.map((course) => (
                                    <span className="tech-chip" key={course}>{course}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Completed */}
                <div className="education__column">
                    <h3 className="education__column-title">
                        <span>✅</span> Completed
                    </h3>

                    {/* 3. Bachelor of Science in Computer Science */}
                    <div className={`education__card glass-card education__card--${bsDegree.color}`}>
                        <div className="education__icons">
                            <div className={`education__icon education__icon--${bsDegree.color}`}>
                                {bsDegree.icon}
                            </div>
                        </div>
                        <div className="education__content">
                            <h3 className="education__degree">{bsDegree.degree}</h3>
                            <p className="education__school">{bsDegree.school}</p>
                            <span className="education__date">{bsDegree.date}</span>
                            <p className="education__desc">{bsDegree.description}</p>
                            <div className="education__courses">
                                {bsDegree.courses.map((course) => (
                                    <span className="tech-chip" key={course}>{course}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 4. Associate of Arts in Computer Science */}
                    <div className={`education__card glass-card education__card--${aaDegree.color}`}>
                        <div className="education__icons">
                            <div className={`education__icon education__icon--${aaDegree.color}`}>
                                {aaDegree.icon}
                            </div>
                        </div>
                        <div className="education__content">
                            <h3 className="education__degree">{aaDegree.degree}</h3>
                            <p className="education__school">{aaDegree.school}</p>
                            <span className="education__date">{aaDegree.date}</span>
                            <p className="education__desc">{aaDegree.description}</p>
                            <div className="education__courses">
                                {aaDegree.courses.map((course) => (
                                    <span className="tech-chip" key={course}>{course}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Education;