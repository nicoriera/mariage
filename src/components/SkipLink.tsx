import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 bg-june-accent text-white px-4 py-2 rounded-md z-50 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-june-accent
                 transition-all duration-200"
    >
      Aller au contenu principal
    </a>
  );
};

export default SkipLink;