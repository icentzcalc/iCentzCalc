import React from 'react';
import { PiggyBank, Calculator, BookOpen, Rocket, Lightbulb, TrendingUp } from 'lucide-react';

const Home = ({ onNavigate }) => {
  // Style definitions
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  };

  const heroStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '3rem',
    padding: '2rem 1rem',
    background: 'linear-gradient(to bottom right, #f9f7ff, #edf5ff)',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#581c87',
    marginBottom: '1rem'
  };

  const subheadingStyle = {
    fontSize: '1.25rem',
    color: '#6b7280',
    maxWidth: '800px',
    marginBottom: '1.5rem'
  };

  const buttonStyle = {
    backgroundColor: '#9333ea',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#7e22ce',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
  };

  const featuresStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  };

  const featureCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const featureCardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
  };

  const featureIconStyle = {
    backgroundColor: '#f3f0ff',
    width: '3rem',
    height: '3rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  };

  const featureTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  };

  const featureDescStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  };

  const iconStyle = {
    width: '1.5rem',
    height: '1.5rem',
    color: '#9333ea'
  };

  const largePiggyIconStyle = {
    width: '4rem',
    height: '4rem',
    color: '#9333ea',
    marginBottom: '1rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const ctaSectionStyle = {
    backgroundColor: '#f3f0ff',
    padding: '3rem 1rem',
    borderRadius: '0.75rem',
    textAlign: 'center'
  };

  // Feature data
  const features = [
    {
      title: 'Financial Calculators',
      description: 'Interactive tools to visualize the impact of your financial decisions and compare different scenarios.',
      icon: <Calculator style={iconStyle} />
    },
    {
      title: 'Smart Insights',
      description: 'Easy-to-understand explanations of financial concepts to help build your money knowledge.',
      icon: <Lightbulb style={iconStyle} />
    },
    {
      title: 'Future Planning',
      description: 'Tools to help you set goals and chart a path toward financial independence.',
      icon: <TrendingUp style={iconStyle} />
    }
  ];

  // Handle button hover state
  const [isHovered, setIsHovered] = React.useState(null);

  // Function to redirect to the lottery calculator
  const navigateToCalculator = () => {
    if (onNavigate) {
      onNavigate('lottery');
    } else if (window.onNavigate) {
      window.onNavigate('lottery');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <PiggyBank style={largePiggyIconStyle} />
        <h1 style={headingStyle}>Your Path to Financial Wellness</h1>
        <p style={subheadingStyle}>
          iCentzCalc helps you visualize the impact of everyday spending decisions
          and discover the power of smart financial choices.
        </p>
        <button 
          onClick={navigateToCalculator}
          style={{
            ...buttonStyle,
            ...(isHovered === 'cta' ? buttonHoverStyle : {})
          }}
          onMouseEnter={() => setIsHovered('cta')}
          onMouseLeave={() => setIsHovered(null)}
        >
          <Calculator style={{ width: '1.25rem', height: '1.25rem' }} />
          Try Our Calculators
        </button>
      </section>

      {/* Features Section */}
      <h2 style={sectionTitleStyle}>Build Better Financial Habits</h2>
      <section style={featuresStyle}>
        {features.map((feature, index) => (
          <div 
            key={index}
            style={{
              ...featureCardStyle,
              ...(isHovered === `feature-${index}` ? featureCardHoverStyle : {})
            }}
            onMouseEnter={() => setIsHovered(`feature-${index}`)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div style={featureIconStyle}>
              {feature.icon}
            </div>
            <h3 style={featureTitleStyle}>{feature.title}</h3>
            <p style={featureDescStyle}>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section style={ctaSectionStyle}>
        <h2 style={{ ...sectionTitleStyle, marginBottom: '1rem' }}>Ready to Make Smarter Money Choices?</h2>
        <p style={{ ...subheadingStyle, fontSize: '1rem', marginBottom: '2rem' }}>
          Start with our lottery spending calculator to see how small choices today
          can lead to big differences tomorrow.
        </p>
        <button 
          onClick={navigateToCalculator}
          style={{
            ...buttonStyle,
            ...(isHovered === 'cta2' ? buttonHoverStyle : {})
          }}
          onMouseEnter={() => setIsHovered('cta2')}
          onMouseLeave={() => setIsHovered(null)}
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;