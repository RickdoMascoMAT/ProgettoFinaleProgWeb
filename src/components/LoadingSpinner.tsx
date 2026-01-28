import React from 'react';

/**
 * Loading spinner component.
 * Displays an animated spinner to indicate that content is being loaded.
 * Uses CSS classes loading-spinner and spinner for styling and animation.
 *
 * @returns {JSX.Element} A div containing the animated loading spinner
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
