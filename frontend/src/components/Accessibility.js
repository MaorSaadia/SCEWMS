import React, { useState, useEffect } from 'react';

const AccessibilityButton = () => {
  const [isAccessibilityEnabled, setIsAccessibilityEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleAccessibilityToggle = () => {
    setIsAccessibilityEnabled(!isAccessibilityEnabled);
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 10);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClearZoom = () => {
    setZoomLevel(100); // Set zoomLevel back to the default value
  };

  useEffect(() => {
    document.body.style.zoom = `${zoomLevel}%`;
    return () => {
      document.body.style.zoom = '100%';
    };
  }, [zoomLevel]);

  const handleImageClick = () => {
    handleAccessibilityToggle();
  };

  return (
    <div className="accessibility-button-container">
      <img src='/logo_nagish.jpeg'  alt="Accessibility Icon" className="accessibility-icon" onClick={handleImageClick} />
      <button className={`accessibility-button ${isAccessibilityEnabled ? 'enabled' : ''}`} onClick={handleAccessibilityToggle}>
        {isAccessibilityEnabled ? '' : ''}
      </button>
      {isAccessibilityEnabled && (
  <div className="accessibility-options">
    <button className="zoom-button" onClick={handleZoomIn}>Zoom In</button>
    <button className="zoom-button" onClick={handleZoomOut}>Zoom Out</button>
    <button className="scroll-button" onClick={handleScrollToTop}>Scroll to Top</button>
    <button className="clear-zoom-button" onClick={handleClearZoom}>Clear Zoom</button>
  </div>
)}
      
    </div>
  );
};

export default AccessibilityButton;
