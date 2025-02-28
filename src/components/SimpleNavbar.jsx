import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  PiggyBank, 
  Calculator, 
  BookOpen, 
  Rocket,
  ClipboardList
} from 'lucide-react';

const SimpleNavbar = ({ onNavigate, currentPage = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null); // Close any open dropdown when toggling menu
  };

  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Style definitions
  const navbarStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    width: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const navContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#581c87'
  };

  const menuButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    color: '#6b7280',
    borderRadius: '0.375rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer'
  };

  const navLinksDesktopStyle = {
    display: 'none',
    alignItems: 'center',
    gap: '1.5rem',
    '@media (min-width: 768px)': {
      display: 'flex'
    }
  };

  const navLinksMobileStyle = {
    display: isMenuOpen ? 'block' : 'none',
    padding: '1rem 0',
    backgroundColor: 'white',
    borderTop: '1px solid #e5e7eb'
  };

  const dropdownButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    color: '#4b5563',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '0.375rem',
    border: 'none',
    background: 'transparent',
    transition: 'all 0.2s ease'
  };
  
  const activeButtonStyle = {
    color: '#9333ea',
    background: '#f3f0ff'
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.375rem',
    padding: '0.5rem 0',
    zIndex: 10,
    marginTop: '0.5rem',
    border: '1px solid #e5e7eb'
  };

  const dropdownItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '0.875rem',
    width: '100%',
    textAlign: 'left',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s',
    cursor: 'pointer'
  };

  const iconStyle = {
    width: '1.25rem',
    height: '1.25rem',
    color: '#9333ea'
  };

  // Nav link data structure - Updated to include Chorz
  const navLinks = [
    {
      name: 'Calcz',
      icon: <Calculator style={iconStyle} />,
      dropdown: [
        { name: 'Lottery/Gaming', path: 'lottery', icon: <PiggyBank style={iconStyle} /> },
        { name: 'Chorz', path: 'chorz', icon: <ClipboardList style={iconStyle} /> } // Added new Chorz option
      ],
      active: currentPage === 'lottery' || currentPage === 'chorz'
    },
    {
      name: 'Smartz',
      icon: <BookOpen style={iconStyle} />,
      dropdown: [],
      active: false
    },
    {
      name: 'Startz',
      icon: <Rocket style={iconStyle} />,
      dropdown: [],
      active: false
    }
  ];

  // Determine if we're on mobile based on viewport width
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  
  // Add resize listener to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <div style={navContentStyle}>
          {/* Logo - clickable to navigate to home */}
          <button 
            onClick={() => handleNavigate('home')} 
            style={{...logoStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
          >
            <PiggyBank style={{ ...iconStyle, marginRight: '0.5rem' }} />
            iCentzCalc
          </button>

          {/* Desktop Navigation - only visible on larger screens */}
          <div style={{ 
            display: 'none',
            alignItems: 'center',
            gap: '1.5rem',
            '@media (min-width: 768px)': { display: 'flex' },
            ...(window.innerWidth >= 768 ? { display: 'flex' } : {})
          }}>
            {navLinks.map((link) => (
              <div key={link.name} style={{ position: 'relative' }}>
                <button 
                  style={{
                    ...dropdownButtonStyle,
                    ...(link.active ? activeButtonStyle : {})
                  }}
                  onClick={() => toggleDropdown(link.name)}
                  aria-expanded={openDropdown === link.name}
                >
                  {link.icon}
                  {link.name}
                  <ChevronDown 
                    style={{ 
                      width: '1rem', 
                      height: '1rem',
                      transform: openDropdown === link.name ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s'
                    }} 
                  />
                </button>

                {openDropdown === link.name && link.dropdown.length > 0 && (
                  <div style={{ ...dropdownStyle, position: 'absolute', width: '12rem' }}>
                    {link.dropdown.map((item) => (
                      <button 
                        key={item.name}
                        onClick={() => handleNavigate(item.path)}
                        style={{
                          ...dropdownItemStyle,
                          ...(currentPage === item.path ? { backgroundColor: '#f3f0ff', color: '#9333ea' } : {})
                        }}
                      >
                        {item.icon}
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button - only visible on smaller screens */}
          <button 
            style={{ 
              ...menuButtonStyle, 
              display: 'none',
              '@media (max-width: 767px)': { display: 'flex' },
              ...(window.innerWidth < 768 ? { display: 'flex' } : {})
            }}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X style={{ width: '1.5rem', height: '1.5rem' }} />
            ) : (
              <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={navLinksMobileStyle}>
            {navLinks.map((link) => (
              <div key={link.name} style={{ marginBottom: '0.5rem' }}>
                <button 
                  style={{ 
                    ...dropdownButtonStyle, 
                    width: '100%', 
                    justifyContent: 'space-between',
                    ...(link.active ? activeButtonStyle : {})
                  }}
                  onClick={() => toggleDropdown(link.name)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {link.icon}
                    {link.name}
                  </span>
                  <ChevronDown 
                    style={{ 
                      width: '1rem', 
                      height: '1rem',
                      transform: openDropdown === link.name ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s'
                    }} 
                  />
                </button>

                {openDropdown === link.name && link.dropdown.length > 0 && (
                  <div style={{ padding: '0.5rem 0 0.5rem 1.5rem' }}>
                    {link.dropdown.map((item) => (
                      <button 
                        key={item.name}
                        onClick={() => handleNavigate(item.path)}
                        style={{ 
                          ...dropdownItemStyle, 
                          padding: '0.5rem 1rem',
                          ...(currentPage === item.path ? { backgroundColor: '#f3f0ff', color: '#9333ea' } : {})
                        }}
                      >
                        {item.icon}
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default SimpleNavbar;