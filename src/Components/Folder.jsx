import { useState, useEffect } from 'react';
import './Folder.css';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({
  color = '#00a8ff',
  size = 1,
  items = [],
  isScrolled = false,
  isOpen,
  onOpen,
  onToggle,
  onClose,
  className = ''
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;

  const [isCatching, setIsCatching] = useState(false);
  const folderBackColor = darkenColor(color, 0.08);

  useEffect(() => {
    if (isScrolled) {
      setIsCatching(true);
      const timer = setTimeout(() => setIsCatching(false), 750);
      return () => clearTimeout(timer);
    } else {
      if (onClose) onClose();
      else setInternalOpen(false);
    }
  }, [isScrolled]);

  const handleMouseEnter = () => {
    if (onOpen) onOpen();
    else if (onToggle) onToggle();
    else setInternalOpen(true);
  };

  const handleClick = () => {
    if (onToggle) onToggle();
    else setInternalOpen(prev => !prev);
  };

  const handleItemClick = (e, href) => {
    e.stopPropagation();
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
      if (onClose) onClose();
      else setInternalOpen(false);
    }
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
  };

  const folderClassName = `folder ${open ? 'open' : ''} ${isCatching ? 'catching' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={folderClassName}
        style={folderStyle}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Close folder menu' : 'Open folder menu'}
      >
        <div className="folder__back">
          {items.map((item, i) => {
            const isObj = typeof item === 'object' && item !== null;
            const label = isObj ? item.name : item;
            const href = isObj ? item.href : null;

            // Spacing offset for 135px wide pills (150px gap multiplier + 75px clearance)
            const leftOffset = (items.length - i) * 150 + 75;

            return (
              <div
                key={i}
                className={`paper paper-${i + 1}`}
                onClick={(e) => handleItemClick(e, href)}
                style={{
                  opacity: open ? 1 : 0,
                  pointerEvents: open ? 'auto' : 'none',
                  transform: open
                    ? `translate(-${leftOffset}px, 2px)`
                    : 'translate(-50%, 10%) scale(0.3)',
                  zIndex: 10 + i,
                }}
              >
                {label}
              </div>
            );
          })}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
