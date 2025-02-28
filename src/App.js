import React, { useState } from 'react';
import './App.css';
import SimpleNavbar from './components/SimpleNavbar';
import LotteryCal from './calculators/LotteryCal';
import ChorzCalculator from './calculators/ChorzCalculator.jsx'; // Import the new Chorz calculator
import Home from './components/Home';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');

  const handleNavigate = (page) => {
    if (page === currentPage) return;
    
    // Start transition out
    setIsTransitioning(true);
    setTransitionClass('page-exit');
    
    // After exit animation completes, change page and start entry animation
    setTimeout(() => {
      setCurrentPage(page);
      setTransitionClass('page-enter');
      
      // After entry animation completes, end transitioning state
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionClass('');
      }, 300);
    }, 300);
  };

  // Render the appropriate component based on the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'lottery':
        return <LotteryCal />;
      case 'chorz': // Add this case for the Chorz calculator
        return <ChorzCalculator />;
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const mainStyle = {
    opacity: transitionClass === 'page-exit' ? 0 : 1,
    transition: 'opacity 300ms ease-in-out',
    animation: transitionClass === 'page-enter' ? 'fadeIn 300ms ease-in-out' : 'none'
  };

  return (
    <div className="App">
      <SimpleNavbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main style={mainStyle}>
        {renderPage()}
      </main>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default App;