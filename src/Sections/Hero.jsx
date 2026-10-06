import './Hero.css';
import suitImg from '../assets/Suit.jpeg';

function Hero({ id }) {
    return (
        <section id={id} className="hero" aria-labelledby="hero-title">
            {/* Animated mesh gradient background */}
            <div className="hero__mesh" aria-hidden="true" />
            <div className="hero__grid" aria-hidden="true" />

            <div className="hero__wrapper">
                {/* Main content */}
                <div className="hero__content">
                    <p className="hero__greeting">Hello, I'm</p>

                    <h1 id="hero-title" className="hero__name">Ernesto Cardoso</h1>

                    <p className="hero__title">
                        <span>Software Engineer</span> &amp; Tech Enthusiast
                    </p>

                    <p className="hero__description">
                        Building elegant, high-performance applications at the intersection
                        of finance and technology. Passionate about clean architecture,
                        scalable systems, and exceptional user experiences.
                    </p>

                    <div className="hero__actions">
                        <a href="#projects" className="btn btn--primary">
                            View Projects
                            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17l9.2-9.2M17 17V8H8" />
                            </svg>
                        </a>
                        <a href="#about" className="btn btn--secondary">
                            About Me
                        </a>
                    </div>
                </div>

                {/* Right side portrait image */}
                <div className="hero__image-wrapper">
                    <div className="hero__image-glow" aria-hidden="true" />
                    <img src={suitImg} alt="Portrait of Ernesto Cardoso in a suit" width="400" height="480" className="hero__image" />
                                    </div>
            </div>
        </section>
    );
}

export default Hero;