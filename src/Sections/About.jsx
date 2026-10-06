import './About.css';

const stats = [
    { number: '1', label: 'Year of Experience' },
    { number: '12+', label: 'Projects' },
    { number: '18+', label: 'Technologies' },
    { number: '100%', label: 'Passion' },
];

const interests = [
    '🧩 SaaS Platforms',
    '🗄️ Databases',
    '🔑 Auth & Access Control',
    '⚙️ CI/CD & DevSecOps',
    '☁️ Cloud Architecture',
    '⚡ Performance',
];

function About({ id }) {
    return (
        <section id={id} className="section about" aria-labelledby="about-title">
            <div className="section-header">
                <span className="section-label">Get to know me</span>
                <h2 id="about-title" className="section-title">About Me</h2>
            </div>

            <div className="about__grid">
                {/* Bio column */}
                <div className="about__bio glass-card">
                    <h3 className="about__bio-title">
                        Building the secure foundations SaaS runs on
                    </h3>
                    <p className="about__bio-text">
                        I'm a software engineer focused on the parts of a product users
                        never see: <span className="about__bio-highlight">databases,
                            authentication, and delivery pipelines</span>. I care about
                        systems that stay correct, fast, and secure as they grow.
                    </p>
                    <p className="about__bio-text">
                        Most recently I built <span className="about__bio-highlight">Virtus
                            Metrics</span>, a full-stack SaaS on Next.js and PostgreSQL with
                        hand-rolled JWT auth that enforces ownership checks in every query,
                        shipped through a GitHub Actions DevSecOps pipeline with a
                        zero-vulnerability supply chain. I also contributed to
                        the open-source database platform <span className="about__bio-highlight">Baserow</span>,
                        fixing a data-integrity bug in its Django and PostgreSQL backend.
                    </p>
                    <p className="about__bio-text">
                        Now I'm pursuing an MS in Cybersecurity and the AWS Solutions
                        Architect – Associate certification, taking that work into
                        {' '}<span className="about__bio-highlight">cloud architecture</span> and
                        {' '}<span className="about__bio-highlight">secure-by-default infrastructure</span>.
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