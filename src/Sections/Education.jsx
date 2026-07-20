import './Education.css';

const educationData = [
    {
        degree: 'Bachelor of Science in Computer Science',
        school: 'Florida International University',
        date: '2020 — 2024',
        description:
            'Focused on software engineering, data structures, algorithms, and distributed systems. Dean\'s List multiple semesters.',
        courses: ['Data Structures', 'Algorithms', 'Databases', 'Cloud Computing', 'Software Engineering'],
        color: 'blue',
        icon: '🎓',
    },
    {
        degree: 'AWS Cloud Practitioner Certification',
        school: 'Amazon Web Services',
        date: '2023',
        description:
            'Demonstrated foundational understanding of AWS Cloud services, architecture, security, and pricing models.',
        courses: ['EC2', 'S3', 'Lambda', 'IAM', 'CloudFormation'],
        color: 'teal',
        icon: '☁️',
    },
    {
        degree: 'Full-Stack Web Development',
        school: 'Online Bootcamp',
        date: '2021',
        description:
            'Intensive program covering modern web development with JavaScript, React, Node.js, and database design.',
        courses: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Git'],
        color: 'purple',
        icon: '💻',
    },
];

function Education({ id }) {
    return (
        <section id={id} className="education">
            <div className="education__header">
                <span className="section-label">Background</span>
                <h2 className="section-title">Education</h2>
            </div>

            <div className="education__list">
                {educationData.map((edu, i) => (
                    <div className={`education__card glass-card education__card--${edu.color}`} key={i}>
                        <div className={`education__icon education__icon--${edu.color}`}>
                            {edu.icon}
                        </div>
                        <div className="education__content">
                            <h3 className="education__degree">{edu.degree}</h3>
                            <p className="education__school">{edu.school}</p>
                            <span className="education__date">{edu.date}</span>
                            <p className="education__desc">{edu.description}</p>
                            <div className="education__courses">
                                {edu.courses.map((course) => (
                                    <span className="tech-chip" key={course}>{course}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Education;