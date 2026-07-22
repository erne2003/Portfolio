import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

/**
 * DecryptedText — scrambles text characters and reveals them with a decryption effect.
 *
 * Props:
 *  - text              (string)   The final revealed text.
 *  - speed             (number)   Interval in ms between animation ticks. Default: 50.
 *  - maxIterations     (number)   Max random-character cycles per letter before settling. Default: 15.
 *  - characters        (string)   Pool of random characters to sample from.
 *  - className         (string)   Extra class for the revealed (decrypted) character spans.
 *  - parentClassName   (string)   Extra class for the wrapper <span>.
 *  - encryptedClassName(string)   Extra class for still-encrypted character spans.
 *  - animateOn         ('hover' | 'click' | 'view')  What triggers the animation. Default: 'hover'.
 *  - revealDirection   ('start' | 'end' | 'center' | 'random')  Order of reveal. Default: 'start'.
 *  - sequential        (boolean)  Reveal one character at a time in order. Default: false.
 *  - useOriginalCharsOnly (boolean) Only cycle through chars from the original text. Default: false.
 *  - onAnimationComplete  (function) Callback when animation finishes.
 */
function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 15,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  revealDirection = 'start',
  sequential = false,
  revealChunkSize = 1,
  useOriginalCharsOnly = false,
  onAnimationComplete,
}) {
  const letters = text.split('');
  const totalLetters = letters.length;

  // Track per-character state: how many iterations have elapsed and whether it's revealed
  const [revealed, setRevealed] = useState(() => letters.map(() => false));
  const [display, setDisplay] = useState(() => letters.map(() => ''));
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const iterationCount = useRef(letters.map(() => 0));
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Build the reveal order based on direction
  const getRevealOrder = useCallback(() => {
    const indices = Array.from({ length: totalLetters }, (_, i) => i);
    switch (revealDirection) {
      case 'end':
        return indices.reverse();
      case 'center': {
        const mid = Math.floor(totalLetters / 2);
        const ordered = [];
        for (let offset = 0; offset <= mid; offset++) {
          if (mid + offset < totalLetters) ordered.push(mid + offset);
          if (mid - offset >= 0 && mid - offset !== mid + offset) ordered.push(mid - offset);
        }
        return ordered;
      }
      case 'random':
        return indices.sort(() => Math.random() - 0.5);
      case 'start':
      default:
        return indices;
    }
  }, [totalLetters, revealDirection]);

  // Pick a random character from the pool
  const randomChar = useCallback(() => {
    const pool = useOriginalCharsOnly ? text : characters;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [characters, text, useOriginalCharsOnly]);

  // Start the animation
  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Reset state
    iterationCount.current = letters.map((l) => (l === ' ' ? maxIterations : 0));
    setRevealed(letters.map(() => false));
    setDisplay(letters.map(() => ''));

    const revealOrder = getRevealOrder();
    let currentRevealIdx = 0; // used for sequential mode

    intervalRef.current = setInterval(() => {
      setDisplay((prev) => {
        const next = [...prev];
        let allDone = true;

        for (let i = 0; i < totalLetters; i++) {
          // Spaces pass through immediately
          if (letters[i] === ' ') {
            next[i] = ' ';
            continue;
          }

          // In sequential mode, only animate up to the current reveal chunk
          if (sequential) {
            const orderIdx = revealOrder.indexOf(i);
            if (orderIdx >= currentRevealIdx + revealChunkSize) {
              next[i] = randomChar();
              allDone = false;
              continue;
            }
          }

          if (iterationCount.current[i] >= maxIterations) {
            next[i] = letters[i];
          } else {
            next[i] = randomChar();
            iterationCount.current[i]++;
            allDone = false;
          }
        }

        if (sequential) {
          // Check if all items in the current chunk are done
          let chunkDone = true;
          for (let c = 0; c < revealChunkSize; c++) {
            const targetIdx = revealOrder[currentRevealIdx + c];
            if (targetIdx !== undefined && iterationCount.current[targetIdx] < maxIterations) {
              chunkDone = false;
              break;
            }
          }
          if (chunkDone) {
            currentRevealIdx += revealChunkSize;
          }
        }

        if (allDone) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsAnimating(false);
          setHasAnimated(true);
          setRevealed(letters.map(() => true));
          onAnimationComplete?.();
        }

        return next;
      });
    }, speed);
  }, [
    isAnimating,
    letters,
    totalLetters,
    speed,
    maxIterations,
    sequential,
    revealChunkSize,
    getRevealOrder,
    randomChar,
    onAnimationComplete,
  ]);

  // Stop animation
  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAnimating(false);
    // Reset to the original text (revealed state)
    setDisplay(letters.map((l) => l));
    setRevealed(letters.map(() => true));
  }, [letters]);

  // Handle "view" trigger with IntersectionObserver
  useEffect(() => {
    if (animateOn !== 'view') return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOn, hasAnimated, startAnimation]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Initialize display with encrypted characters (for hover/click modes)
  useEffect(() => {
    if (animateOn === 'view') {
      // Start scrambled for "view" mode
      setDisplay(letters.map((l) => (l === ' ' ? ' ' : randomChar())));
    } else {
      // Start revealed for hover/click so user sees the real text first
      setDisplay(letters.map((l) => l));
      setRevealed(letters.map(() => true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, animateOn]);

  // Event handlers based on animateOn
  const eventHandlers = {};
  if (animateOn === 'hover') {
    eventHandlers.onMouseEnter = startAnimation;
    eventHandlers.onMouseLeave = stopAnimation;
  } else if (animateOn === 'click') {
    eventHandlers.onClick = () => {
      if (isAnimating) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };
  }

  return (
    <span
      ref={containerRef}
      className={`inline-flex cursor-default ${parentClassName}`}
      {...eventHandlers}
    >
      {display.map((char, i) => (
        <span
          key={i}
          className={revealed[i] ? className : encryptedClassName}
          style={{
            // Preserve whitespace width
            display: 'inline-block',
            whiteSpace: 'pre',
            minWidth: char === ' ' ? '0.3em' : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default DecryptedText;
