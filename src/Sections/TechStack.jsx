import './TechStack.css';

const categories = [
    {
        name: 'Frontend',
        icon: '🖥️',
        color: 'blue',
        skills: [
            { name: 'React', icon: '⚛️', level: 100 },
            { name: 'JavaScript', icon: '🟨', level: 100 },
            { name: 'TypeScript', icon: '🔷', level: 100 },
            { name: 'HTML/CSS', icon: '🎨', level: 100 },
            { name: 'Tailwind', icon: '💨', level: 100 },
            { name: 'Next.js', icon: '▲', level: 100 },
        ],
    },
    {
        name: 'Backend',
        icon: '⚙️',
        color: 'teal',
        skills: [
            { name: 'Node.js', icon: '🟢', level: 100 },
            { name: 'Python', icon: '🐍', level: 100 },
            { name: 'Express', icon: '🚂', level: 100 },
            { name: 'PostgreSQL', icon: '🐘', level: 100 },
            { name: 'MongoDB', icon: '🍃', level: 50 },
            { name: 'REST APIs', icon: '🔗', level: 80 },
        ],
    },
    {
        name: 'DevOps & Tools',
        icon: '🛠️',
        color: 'coral',
        skills: [
            { name: 'Git', icon: '📋', level: 100 },
            { name: 'Docker', icon: '🐳', level: 10 },
            { name: 'AWS', icon: '☁️', level: 10 },
            { name: 'CI/CD', icon: '🔄', level: 100 },
            { name: 'Linux', icon: '🐧', level: 70 },
            { name: 'Figma', icon: '🎯', level: 70 },
        ],
    },
];

function TechStack({ id }) {
    return (
        <section id={id} className="section techstack" aria-labelledby="skills-title">
            <div className="section-header">
                <span className="section-label">What I work with</span>
                <h2 id="skills-title" className="section-title">Skills &amp; Technologies</h2>
                <p className="section-subtitle">
                    A curated set of technologies I use to bring ideas to life — from
                    concept to production.
                </p>
            </div>

            <div className="techstack__categories">
                {categories.map((cat) => (
                    <section className="techstack__category" key={cat.name} aria-label={cat.name}>
                        <div className="techstack__category-header">
                            <div className={`techstack__category-icon techstack__category-icon--${cat.color}`} aria-hidden="true">
                                {cat.icon}
                            </div>
                            <h3 className="techstack__category-name">{cat.name}</h3>
                        </div>

                        <div className="techstack__grid">
                            {cat.skills.map((skill) => (
                                <div className="techstack__skill glass-card" key={skill.name}>
                                    <span className="techstack__skill-icon" aria-hidden="true">{skill.icon}</span>
                                    <span className="techstack__skill-name">{skill.name}</span>
                                    <div className="techstack__skill-bar" aria-hidden="true">
                                        <div
                                            className={`techstack__skill-bar-fill techstack__skill-bar-fill--${cat.color}`}
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </section>
    );
}

export default TechStack;