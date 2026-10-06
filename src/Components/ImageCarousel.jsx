import { useState } from 'react';
import './ImageCarousel.css';

/*
 * In Vite, you can't use require(). Instead, import images at the top:
 *
 *   import img1 from '../assets/VirtusFitness/IMG_1361.PNG';
 *
 * Then pass them as an array: <ImageCarousel images={[img1, img2, ...]} />
 * See Projects.jsx for how this is done.
 */

function ImageCarousel({ images = [], label = 'Project' }) {
    // ① State: which image index is currently shown
    const [currentIndex, setCurrentIndex] = useState(0);

    // If there are no images, don't render anything
    if (images.length === 0) return null;

    // ② Navigation handlers
    const goToPrev = (e) => {
        e.stopPropagation(); // Prevent click from bubbling to parent card
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
            //           ↑ wrap to last          ↑ go back one
        );
    };

    const goToNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
            //           ↑ wrap to first    ↑ go forward one
        );
    };

    // ③ Jump to a specific image (when clicking a dot)
    const goToIndex = (e, index) => {
        e.stopPropagation();
        setCurrentIndex(index);
    };

    return (
        <div className="carousel" role="group" aria-roledescription="carousel" aria-label={`${label} screenshots`}>
            {/* ④ The sliding track — shifts left by (currentIndex × 100)% */}
            <div
                className="carousel__track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, i) => (
                    <div className="carousel__slide" key={i} aria-hidden={i !== currentIndex}>
                        <img
                            src={src}
                            alt={`${label} screenshot ${i + 1} of ${images.length}`}
                            className="carousel__image"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            {/* ⑤ Left/Right arrow buttons (only show if > 1 image) */}
            {images.length > 1 && (
                <>
                    <button
                        className="carousel__btn carousel__btn--left"
                        onClick={goToPrev}
                        aria-label="Previous image"
                    >
                        <span aria-hidden="true">‹</span>
                    </button>
                    <button
                        className="carousel__btn carousel__btn--right"
                        onClick={goToNext}
                        aria-label="Next image"
                    >
                        <span aria-hidden="true">›</span>
                    </button>

                    {/* ⑥ Dot indicators — shows which image is active */}
                    <div className="carousel__dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel__dot ${i === currentIndex ? 'carousel__dot--active' : ''}`}
                                onClick={(e) => goToIndex(e, i)}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === currentIndex}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ImageCarousel;
