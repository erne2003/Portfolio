import './About.css';

const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Built' },
    { number: '8+', label: 'Technologies' },
    { number: '100%', label: 'Passion' },
];

const interests = [
    '💹 Fintech',
    '☁️ Cloud Architecture',
    '📊 Data Visualization',
    '🔐 Security',
    '⚡ Performance',
    '🎨 UI/UX Design',
];

function About({ id }) {
    return (
        <section id={id} className="about">
            <div className="about__header">
                <span className="section-label">Get to know me</span>
                <h2 className="section-title">About Me</h2>
            </div>

            <div className="about__grid">
                {/* Bio column */}
                <div className="about__bio glass-card">
                    <h3 className="about__bio-title">
                        Crafting digital experiences with precision
                    </h3>
                    <p className="about__bio-text">
                        I'm a software engineer with a passion for building products that
                        sit at the <span className="about__bio-highlight">intersection of
                        finance and technology</span>. I thrive in environments where clean
                        code meets real-world impact.
                    </p>
                    <p className="about__bio-text">
                        From architecting scalable APIs to designing pixel-perfect
                        interfaces, I enjoy the full spectrum of product development.
                        Currently exploring <span className="about__bio-highlight">cloud-native
                        architectures</span> and <span className="about__bio-highlight">real-time
                        data systems</span>.
                    </p>

                    <div className="about__interests">
                        {interests.map((interest) => (
                            <span className="about__interest-tag" key={interest}>
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats column */}
                <div className="about__stats">
                    {stats.map((stat, i) => (
                        <div
                            className={`about__stat-card glass-card ${i === 0 ? 'about__stat-card--accent' : ''}`}
                            key={i}
                        >
                            <div className="about__stat-number">{stat.number}</div>
                            <div className="about__stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default About;