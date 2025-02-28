import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  PiggyBank, 
  Coins, 
  Clock, 
  Share2,
  Twitter,
  Facebook,
  Camera,
  Coffee,
  Smartphone,
  Plane,
  Gamepad2
} from 'lucide-react';

// Styled components using inline styles
const Card = ({ style, children }) => (
  <div style={{
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom right, #f9f7ff, #edf5ff)',
    ...style
  }}>
    {children}
  </div>
);

const CardHeader = ({ style, children }) => (
  <div style={{ padding: '1rem', ...style }}>
    {children}
  </div>
);

const CardTitle = ({ style, children }) => (
  <h2 style={{ 
    fontSize: '1.5rem', 
    fontWeight: '600',
    ...style 
  }}>
    {children}
  </h2>
);

const CardContent = ({ style, children }) => (
  <div style={{ padding: '1rem', paddingTop: 0, ...style }}>
    {children}
  </div>
);

const LotteryCal = () => {
  const [ticketsPerMonth, setTicketsPerMonth] = useState('5');
  const [ticketCost, setTicketCost] = useState('2');
  const [monthlyGaming, setMonthlyGaming] = useState('15');
  const [calculations, setCalculations] = useState({
    annual: '--',
    fiveYear: '--',
    tenYear: '--',
    investments: {
      5: '--',
      10: '--',
      20: '--',
      30: '--',
      50: '--'
    },
    couldBuy: {
      coffees: '--',
      phones: '--',
      burrito: '--'
    }
  });

  // Calculate on initial render
  useEffect(() => {
    calculate();
  }, []);

  const futureValueMonthlyAnnuity = (monthlyContribution, monthlyInterest, totalMonths) => {
    return monthlyContribution * ((Math.pow(1 + monthlyInterest, totalMonths) - 1) / monthlyInterest);
  };

  const formatCurrency = (value) => {
    if (value === '--') return '--';
    const num = parseFloat(value);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: num >= 1000000 ? 'compact' : 'standard'
    }).format(num);
  };

  const calculate = () => {
    const tickets = parseInt(ticketsPerMonth, 10) || 0;
    const cost = parseFloat(ticketCost) || 0;
    const gaming = parseFloat(monthlyGaming) || 0;
    
    // Calculate total monthly spending (lottery + gaming)
    const monthlySpend = (tickets * cost) + gaming;
    
    const annual = monthlySpend * 12;
    const fiveYear = annual * 5;
    const tenYear = annual * 10;

    const annualRate = 0.08;
    const monthlyRate = annualRate / 12;
    const yearsToCalculate = [5, 10, 20, 30, 50];
    
    const investmentResults = {};
    yearsToCalculate.forEach(years => {
      const totalMonths = years * 12;
      const fv = futureValueMonthlyAnnuity(monthlySpend, monthlyRate, totalMonths);
      investmentResults[years] = fv.toFixed(2);
    });

    // Calculate what you could buy instead
    const coffeePrice = 5;
    const smartphonePrice = 800;
    const burritosPrice = 12;

    const coffeeCount = fiveYear > 0 ? Math.floor(fiveYear / coffeePrice) : '--';
    const phoneCount = fiveYear > 0 ? (fiveYear / smartphonePrice).toFixed(1) : '--';
    const burritosCount = fiveYear > 0 ? (fiveYear / burritosPrice).toFixed(1) : '--';

    setCalculations({
      annual: annual.toFixed(2),
      fiveYear: fiveYear.toFixed(2),
      tenYear: tenYear.toFixed(2),
      investments: investmentResults,
      couldBuy: {
        coffees: coffeeCount,
        phones: phoneCount,
        burritos: burritosCount
      }
    });
  };

  // Handle ticket count change
  const handleTicketsChange = (e) => {
    const value = e.target.value;
    setTicketsPerMonth(value);
  };

  // Handle ticket cost change with $1 increments
  const handleCostChange = (e) => {
    const value = e.target.value;
    setTicketCost(value);
  };

  // Handle gaming expense change
  const handleGamingChange = (e) => {
    const value = e.target.value;
    setMonthlyGaming(value);
  };

  // Social sharing functions
  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      `I could save ${formatCurrency(calculations.fiveYear)} on lottery tickets and gaming over 5 years—that could grow to ${formatCurrency(calculations.investments[20])} in 20 years if invested!`
    );
    const url = encodeURIComponent('https://your-lottery-calculator.com');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent('https://your-lottery-calculator.com');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  // Common styles
  const containerStyle = {
    maxWidth: '64rem',
    margin: '0 auto',
    padding: '1.5rem'
  };

  const titleStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#581c87',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem'
  };

  const iconStyle = {
    height: '2rem', 
    width: '2rem', 
    color: '#9333ea'
  };

  const twoColumnGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  };

  const headingStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const subheadingStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#4b5563',
    marginTop: '1.25rem',
    marginBottom: '0.75rem'
  };

  const smallIconStyle = {
    height: '1.25rem', 
    width: '1.25rem', 
    color: '#9333ea'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.25rem'
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '1rem'
  };

  // Input style
  const inputStyle = {
    width: '100%',
    height: '42px',
    padding: '0.75rem',
    paddingLeft: '2.5rem',
    border: '1px solid #ddd6fe',
    borderRadius: '0.5rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '1rem'
  };

  // Input icon style
  const inputIconStyle = {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '1.25rem',
    width: '1.25rem',
    color: '#a78bfa',
    pointerEvents: 'none'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#9333ea',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const resultCardStyle = {
    backgroundColor: '#f3f0ff',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem'
  };

  const resultLabelStyle = {
    fontSize: '0.875rem',
    color: '#7e22ce'
  };

  const resultValueStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#581c87'
  };

  const investmentSectionStyle = {
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    color: 'white',
    marginBottom: '1.5rem'
  };

  const investmentHeadingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1.25rem',
    fontWeight: '600'
  };

  const investmentDescStyle = {
    color: '#bfdbfe',
    marginBottom: '1.5rem'
  };

  const investmentGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem'
  };

  const investmentCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(4px)',
    padding: '1rem',
    borderRadius: '0.5rem'
  };

  const yearLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    color: '#bfdbfe',
    fontSize: '0.875rem'
  };

  const investmentValueStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  };

  const alternativesStyle = {
    backgroundColor: '#f3f0ff',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginTop: '1rem'
  };

  const alternativesHeadingStyle = {
    fontWeight: '600',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem'
  };

  const alternativeItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    color: '#4b5563'
  };

  const socialSectionStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  };

  const socialButtonsStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  };

  const twitterButtonStyle = {
    backgroundColor: '#1DA1F2',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const facebookButtonStyle = {
    backgroundColor: '#4267B2',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const tipStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const dividerStyle = {
    margin: '1.25rem 0',
    borderBottom: '1px solid #e5e7eb'
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader style={{ textAlign: 'center', paddingBottom: '0.5rem' }}>
          <CardTitle style={titleStyle}>
            <PiggyBank style={iconStyle} />
            Lottery vs Investment Calculator
          </CardTitle>
          <p style={{ color: '#4b5563', marginTop: '0.5rem' }}>
            Compare lottery spending with potential investment returns
          </p>
        </CardHeader>

        <CardContent>
          {/* Input Section */}
          <div style={twoColumnGridStyle}>
            <div style={cardStyle}>
              <h3 style={headingStyle}>
                <Calculator style={smallIconStyle} />
                Calculate Your Spending
              </h3>
              
              <div>
                {/* Lottery Section */}
                <h4 style={subheadingStyle}>Lottery Expenses</h4>
                <div style={inputContainerStyle}>
                  <label style={labelStyle}>
                    Monthly Tickets
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      value={ticketsPerMonth}
                      onChange={handleTicketsChange}
                      onBlur={calculate}
                      style={inputStyle}
                      placeholder="e.g., 10"
                      min="0"
                    />
                    <Coins style={inputIconStyle} />
                  </div>
                </div>

                <div style={inputContainerStyle}>
                  <label style={labelStyle}>
                    Cost Per Ticket
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      value={ticketCost}
                      onChange={handleCostChange}
                      onBlur={calculate}
                      style={inputStyle}
                      placeholder="e.g., 1"
                      min="1"
                      step="1"
                    />
                    <DollarSign style={inputIconStyle} />
                  </div>
                </div>

                {/* Divider */}
                <div style={dividerStyle}></div>

                {/* Gaming Section */}
                <h4 style={subheadingStyle}>Video Game Expenses</h4>
                <div style={inputContainerStyle}>
                  <label style={labelStyle}>
                    Monthly Gaming Budget
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      value={monthlyGaming}
                      onChange={handleGamingChange}
                      onBlur={calculate}
                      style={inputStyle}
                      placeholder="e.g., 15"
                      min="0"
                      step="1"
                    />
                    <Gamepad2 style={inputIconStyle} />
                  </div>
                </div>
                
                <button
                  onClick={calculate}
                  style={buttonStyle}
                >
                  Calculate Results
                </button>
              </div>
            </div>

            {/* Direct Spending Results */}
            <div style={cardStyle}>
              <h3 style={headingStyle}>
                <Coins style={smallIconStyle} />
                Total Spending
              </h3>
              
              <div>
                {[
                  { label: '1 Year', value: calculations.annual },
                  { label: '5 Years', value: calculations.fiveYear },
                  { label: '10 Years', value: calculations.tenYear }
                ].map((period) => (
                  <div key={period.label} style={resultCardStyle}>
                    <div style={resultLabelStyle}>{period.label}</div>
                    <div style={resultValueStyle}>
                      {formatCurrency(period.value)}
                    </div>
                  </div>
                ))}
              </div>

              {/* What you could buy instead section */}
              <div style={alternativesStyle}>
                <h4 style={alternativesHeadingStyle}>
                  <Share2 style={{ height: '1rem', width: '1rem', color: '#9333ea' }} />
                  Over 5 years you could've bought:
                </h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  <li style={alternativeItemStyle}>
                    <Coffee style={{ height: '1rem', width: '1rem', color: '#9333ea' }} />
                    {calculations.couldBuy.coffees} coffees (@ $5 each)
                  </li>
                  <li style={alternativeItemStyle}>
                    <Smartphone style={{ height: '1rem', width: '1rem', color: '#9333ea' }} />
                    {calculations.couldBuy.phones} iPads (@ $800 each)
                  </li>
                  <li style={alternativeItemStyle}>
                    <Plane style={{ height: '1rem', width: '1rem', color: '#9333ea' }} />
                    {calculations.couldBuy.burritos} burritos (@ $12 each)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Investment Growth Section */}
          <div style={investmentSectionStyle}>
            <div style={investmentHeadingStyle}>
              <TrendingUp size={24} />
              <h3>Investment Potential (8% Annual Return)</h3>
            </div>
            
            <p style={investmentDescStyle}>
              If you invested your lottery and gaming budget instead, here's how much it could grow:
            </p>
            
            <div style={investmentGridStyle}>
              {[5, 10, 20, 30, 50].map((years) => (
                <div key={years} style={investmentCardStyle}>
                  <div style={yearLabelStyle}>
                    <Clock size={16} />
                    <div>{years} Years</div>
                  </div>
                  <div style={investmentValueStyle}>
                    {formatCurrency(calculations.investments[years])}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Sharing Section */}
          <div style={socialSectionStyle}>
            <h3 style={headingStyle}>
              <Share2 style={smallIconStyle} />
              Share Your Results
            </h3>
            
            <div style={socialButtonsStyle}>
              <button
                onClick={shareOnTwitter}
                style={twitterButtonStyle}
              >
                <Twitter size={16} />
                Share on Twitter
              </button>
              
              <button
                onClick={shareOnFacebook}
                style={facebookButtonStyle}
              >
                <Facebook size={16} />
                Share on Facebook
              </button>
            </div>
            
            <p style={tipStyle}>
              <Camera size={16} />
              For Instagram or TikTok, take a screenshot of your results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LotteryCal;