import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award,
  Target,
  Shuffle, 
  Trophy,
  RefreshCcw,
  ChevronsUp,
  Percent,
  Zap,
  Edit,
  Users
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

const BocceCalculator = () => {
  // State variables
  const [teamOne, setTeamOne] = useState('Son of a Be-occe');
  const [teamTwo, setTeamTwo] = useState('Shitheads');
  const [customTeam, setCustomTeam] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // League teams
  const leagueTeams = [
    'Son of a Be-occe',
    'Shitheads',
    'Bocce Brigade',
    'Ball Knockers',
    'JoeJobs',
    'Bitches and Beau',
    'Lawn Loonies'
  ];

  // Funny victory messages for when Son of a Be-occe wins
  const victoryMessages = [
    "Son of a Be-occe is 100% gonna put foot to ass!",
    "Son of a Be-occe is gonna roll! Hard and DEEP!",
    "Son of a Be-occe will crush them like cheap beer cans!",
    "Son of a Be-occe will dominate so hard they'll rename the sport!",
    "Absolute massacre incoming! Son of a Be-occe taking no prisoners!",
    "Victory parade already scheduled for Son of a Be-occe!",
    "Son of a Be-occe about to make the opponent question their life choices!",
    "Son of a Be-occe will be living rent-free in their heads after this beatdown!",
    "Son of a Be-occe already practicing their victory dance!",
    "Son of a Be-occe will embarrass them worse than dad jokes at prom!",
    "Son of a Be-occe bringing the pain like spicy food regret!",
    "Prepare for total annihilation by Son of a Be-occe!",
    "Son of a Be-occe - turning opponents into participation trophy recipients since forever!"
  ];

  // Random excuses for when other teams lose
  const excuseMessages = [
    "will blame it on the sun's position",
    "will claim their lucky socks weren't washed properly",
    "forgot to do their pre-game ritual",
    "didn't eat their lucky breakfast",
    "will say Mercury was in retrograde",
    "will insist the court was tilted",
    "will demand ball inspection after losing",
    "was distracted by a squirrel",
    "will definitely be crying in the car later",
    "forgot how to roll a ball today",
    "should consider taking up knitting instead"
  ];

  // Calculate button click handler
  const calculateProbability = () => {
    // Start calculation animation
    setIsCalculating(true);
    setResult(null);
    
    // Determine which team 2 name to use
    const actualTeamTwo = showCustomInput ? customTeam : teamTwo;
    
    setTimeout(() => {
      // Generate a random result for normal teams
      let winProbability = Math.floor(Math.random() * 101);
      let message = "";
      let teamOneWin = winProbability > 50;
      
      // If Son of a Be-occe is involved, they always win with 100% probability
      if (teamOne === 'Son of a Be-occe' || (showCustomInput && actualTeamTwo === 'Son of a Be-occe')) {
        // Determine which team is Son of a Be-occe
        if (teamOne === 'Son of a Be-occe') {
          winProbability = 100;
          teamOneWin = true;
          // Pick a random victory message
          message = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];
        } else {
          winProbability = 0;
          teamOneWin = false;
          // Pick a random victory message
          message = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];
        }
      } else {
        // For matches not involving Son of a Be-occe, create a funny message
        const losingTeam = teamOneWin ? actualTeamTwo : teamOne;
        const excuse = excuseMessages[Math.floor(Math.random() * excuseMessages.length)];
        message = `${losingTeam} ${excuse}`;
      }
      
      // Set the result
      setResult({
        teamOne,
        teamTwo: actualTeamTwo,
        probability: teamOneWin ? winProbability : 100 - winProbability,
        winner: teamOneWin ? teamOne : actualTeamTwo,
        loser: teamOneWin ? actualTeamTwo : teamOne,
        message: message
      });
      
      // End calculation animation
      setIsCalculating(false);
    }, 1500); // Simulate calculation delay for dramatic effect
  };

  // Handle team selection changes
  const handleTeamOneChange = (e) => {
    setTeamOne(e.target.value);
  };

  const handleTeamTwoChange = (e) => {
    setTeamTwo(e.target.value);
  };

  const handleCustomTeamChange = (e) => {
    setCustomTeam(e.target.value);
  };

  const toggleCustomTeam = () => {
    setShowCustomInput(!showCustomInput);
    if (showCustomInput) {
      setTeamTwo('Shitheads'); // Reset to default when switching back
    } else {
      setCustomTeam(''); // Clear custom input when enabling
    }
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

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    marginBottom: '1.5rem'
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

  const selectStyle = {
    width: '100%',
    height: '42px',
    padding: '0.5rem',
    paddingLeft: '2.5rem',
    border: '1px solid #ddd6fe',
    borderRadius: '0.5rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '1rem',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22292.4%22 height=%22292.4%22%3E%3Cpath fill=%22%23a78bfa%22 d=%22M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.7rem top 50%',
    backgroundSize: '0.65rem auto'
  };

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

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '0.875rem',
    textDecoration: 'underline',
    padding: '0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const resultSectionStyle = {
    backgroundColor: '#f3f0ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #ddd6fe',
    marginTop: '2rem',
    overflow: 'hidden',
    position: 'relative'
  };

  const resultHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#581c87'
  };

  const teamsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const teamCardStyle = {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  };
  
  const winnerTeamCardStyle = {
    ...teamCardStyle,
    backgroundColor: '#ecfdf5',
    borderColor: '#86efac',
    borderWidth: '2px',
    borderStyle: 'solid'
  };
  
  const loserTeamCardStyle = {
    ...teamCardStyle,
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: '1px',
    borderStyle: 'solid',
    opacity: 0.8
  };

  const teamNameStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'center',
    wordBreak: 'break-word'
  };

  const probabilityStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#581c87',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  const messageStyle = {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    fontSize: '1.125rem',
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#581c87',
    marginTop: '1rem',
    textAlign: 'center',
    border: '1px dashed #ddd6fe'
  };

  const animatedIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '4rem',
    width: '4rem',
    color: '#9333ea',
    animation: 'spin 2s linear infinite'
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader style={{ textAlign: 'center', paddingBottom: '0.5rem' }}>
          <CardTitle style={titleStyle}>
            <Shuffle style={iconStyle} />
            Bocce Win Probability Calculator
          </CardTitle>
          <p style={{ color: '#4b5563', marginTop: '0.5rem' }}>
            Our highly advanced machine learning AI will accurately* predict your Bocce match outcomes
          </p>
          <p style={{ color: '#9333ea', fontSize: '0.75rem', marginTop: '0.25rem', fontStyle: 'italic' }}>
            *Results guaranteed to be 50% accurate 100% of the time
          </p>
        </CardHeader>

        <CardContent>
          <div style={cardStyle}>
            <h3 style={headingStyle}>
              <Users style={smallIconStyle} />
              Select Teams
            </h3>
            
            <div>
              {/* Team 1 Selection */}
              <div style={inputContainerStyle}>
                <label style={labelStyle}>
                  Team 1
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={teamOne}
                    onChange={handleTeamOneChange}
                    style={selectStyle}
                  >
                    {leagueTeams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                  <Trophy style={inputIconStyle} />
                </div>
              </div>

              {/* Team 2 Selection or Custom Input */}
              <div style={inputContainerStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={labelStyle}>
                    Team 2
                  </label>
                  <button 
                    onClick={toggleCustomTeam}
                    style={toggleButtonStyle}
                  >
                    <Edit size={14} />
                    {showCustomInput ? 'Select from league' : 'Enter custom team'}
                  </button>
                </div>
                
                <div style={{ position: 'relative' }}>
                  {showCustomInput ? (
                    <input
                      type="text"
                      value={customTeam}
                      onChange={handleCustomTeamChange}
                      style={inputStyle}
                      placeholder="Enter team name"
                    />
                  ) : (
                    <select
                      value={teamTwo}
                      onChange={handleTeamTwoChange}
                      style={selectStyle}
                    >
                      {leagueTeams.map((team) => (
                        <option key={team} value={team} disabled={team === teamOne}>
                          {team}
                        </option>
                      ))}
                    </select>
                  )}
                  <Trophy style={inputIconStyle} />
                </div>
              </div>
              
              <button
                onClick={calculateProbability}
                style={buttonStyle}
                disabled={isCalculating || (showCustomInput && !customTeam.trim())}
              >
                <Target size={16} />
                Calculate Win Probability
              </button>
            </div>
          </div>

          {/* Results Section */}
          {(result || isCalculating) && (
            <div style={resultSectionStyle}>
              {isCalculating ? (
                <>
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <p style={{ marginBottom: '1rem', fontWeight: '500', color: '#6b7280' }}>
                      Crunching probabilities...
                    </p>
                    <RefreshCcw style={animatedIconStyle} />
                    <style>
                      {`
                        @keyframes spin {
                          0% { transform: translate(-50%, -50%) rotate(0deg); }
                          100% { transform: translate(-50%, -50%) rotate(360deg); }
                        }
                      `}
                    </style>
                  </div>
                </>
              ) : (
                <>
                  <div style={resultHeaderStyle}>
                    <Zap style={smallIconStyle} />
                    Match Prediction Results
                  </div>
                  
                  <div style={teamsContainerStyle}>
                    <div style={result.winner === result.teamOne ? winnerTeamCardStyle : loserTeamCardStyle}>
                      <div style={teamNameStyle}>{result.teamOne}</div>
                      <div style={probabilityStyle}>
                        {result.teamOne === result.winner ? result.probability : 100 - result.probability}
                        <Percent size={20} />
                      </div>
                      {result.teamOne === result.winner && (
                        <div style={{ 
                          backgroundColor: '#10b981', 
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Trophy size={12} />
                          WINNER
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
                      <span style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold',
                        color: '#6b7280'
                      }}>
                        VS
                      </span>
                    </div>
                    
                    <div style={result.winner === result.teamTwo ? winnerTeamCardStyle : loserTeamCardStyle}>
                      <div style={teamNameStyle}>{result.teamTwo}</div>
                      <div style={probabilityStyle}>
                        {result.teamTwo === result.winner ? result.probability : 100 - result.probability}
                        <Percent size={20} />
                      </div>
                      {result.teamTwo === result.winner && (
                        <div style={{ 
                          backgroundColor: '#10b981', 
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Trophy size={12} />
                          WINNER
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div style={messageStyle}>
                    "{result.message}"
                  </div>
                  
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.75rem', 
                    marginTop: '1rem', 
                    fontStyle: 'italic',
                    textAlign: 'center' 
                  }}>
                    *These predictions are guaranteed to be occasionally accurate. No refunds on incorrect predictions.
                    Past performance is not indicative of future results. Your actual match results may vary.
                  </p>
                </>
              )}
            </div>
          )}

          <div style={{
            backgroundColor: '#fffbeb',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1.5rem',
            border: '1px solid #fef3c7'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              color: '#92400e',
              fontWeight: '500'
            }}>
              <Trophy size={16} color="#92400e" />
              Fun Fact
            </div>
            <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
              Our algorithm employs quantum entanglement of bocce balls to predict outcomes with a remarkable accuracy 
              that entirely depends on which teams are playing. Results may be influenced by the phases of the moon, 
              what you had for breakfast, and whether Mercury is in retrograde.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BocceCalculator;