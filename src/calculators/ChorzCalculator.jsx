import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  DollarSign, 
  Calculator, 
  Clock, 
  CheckCircle,
  Target,
  Coins,
  ClipboardList,
  Star,
  Award,
  Smile,
  Edit,
  RefreshCcw,
  Calendar
} from 'lucide-react';

// API URL 
const API_URL = 'http://localhost:5001/api'; 

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

// Fallback chore data in case the API connection fails
const fallbackChores = [
  { id: 1, name: "Wash dishes", timeMinutes: 20, payRate: 3, frequency: "daily" },
  { id: 2, name: "Mow the lawn", timeMinutes: 45, payRate: 10, frequency: "weekly" },
  { id: 3, name: "Take out trash", timeMinutes: 5, payRate: 1, frequency: "daily" },
  { id: 4, name: "Vacuum living room", timeMinutes: 15, payRate: 2, frequency: "daily" },
  { id: 5, name: "Clean bathroom", timeMinutes: 30, payRate: 5, frequency: "weekly" },
  { id: 6, name: "Fold laundry", timeMinutes: 20, payRate: 3, frequency: "daily" },
  { id: 7, name: "Sweep and mop floors", timeMinutes: 30, payRate: 4, frequency: "weekly" },
  { id: 8, name: "Dust furniture", timeMinutes: 25, payRate: 3, frequency: "daily" },
  { id: 9, name: "Clean windows", timeMinutes: 40, payRate: 6, frequency: "weekly" },
  { id: 10, name: "Rake leaves", timeMinutes: 35, payRate: 5, frequency: "weekly" },
  { id: 11, name: "Make beds", timeMinutes: 10, payRate: 2, frequency: "daily" },
  { id: 12, name: "Clean refrigerator", timeMinutes: 35, payRate: 5, frequency: "weekly" },
  { id: 13, name: "Organize bookshelf", timeMinutes: 25, payRate: 4, frequency: "weekly" },
  { id: 14, name: "Water plants", timeMinutes: 10, payRate: 2, frequency: "daily" },
  { id: 15, name: "Walk the dog", timeMinutes: 30, payRate: 4, frequency: "daily" },
  { id: 16, name: "Grocery shopping", timeMinutes: 60, payRate: 8, frequency: "weekly" },
  { id: 17, name: "Weed garden", timeMinutes: 40, payRate: 6, frequency: "weekly" },
  { id: 18, name: "Wash car", timeMinutes: 45, payRate: 7, frequency: "weekly" },
  { id: 19, name: "Help with cooking", timeMinutes: 40, payRate: 5, frequency: "daily" },
  { id: 20, name: "Clean garage", timeMinutes: 90, payRate: 12, frequency: "weekly" }
];

const ChorzCalculator = () => {
  const [choresData, setChoresData] = useState(fallbackChores);
  const [targetAmount, setTargetAmount] = useState('');
  const [targetInput, setTargetInput] = useState('');
  const [selectedChores, setSelectedChores] = useState([]);
  const [choreResults, setChoreResults] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredChores, setFilteredChores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chores from the API on component mount
  useEffect(() => {
    const fetchChores = async () => {
      try {
        setIsLoading(true);
        // Try to fetch from API
        const response = await axios.get(`${API_URL}/chores`);
        if (response.data && response.data.length > 0) {
          setChoresData(response.data);
          setFilteredChores(response.data);
        } else {
          // If API returns empty, use fallback data
          console.log('API returned empty chores list, using fallback data');
          setChoresData(fallbackChores);
          setFilteredChores(fallbackChores);
        }
        setError(null);
      } catch (err) {
        // If API fails, use fallback data
        console.error('Error fetching chores:', err);
        setError('Could not connect to database. Using default chore list.');
        setChoresData(fallbackChores);
        setFilteredChores(fallbackChores);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChores();
  }, []);

  // Format time from minutes to hours and minutes
  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  // Format time period (days and weeks)
  const formatTimePeriod = (days, weeks) => {
    let result = '';
    
    if (weeks > 0) {
      result += `${weeks} week${weeks !== 1 ? 's' : ''}`;
    }
    
    if (days > 0) {
      if (result) result += ', ';
      result += `${days} day${days !== 1 ? 's' : ''}`;
    }
    
    return result || 'Less than a day';
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Filter chores when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = choresData.filter(chore => 
        chore.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChores(filtered);
    } else {
      setFilteredChores(choresData);
    }
  }, [searchTerm, choresData]);

  // Calculate total earnings and time
  useEffect(() => {
    // Calculate regular totals
    const earnings = selectedChores.reduce((sum, chore) => sum + chore.payRate, 0);
    const time = selectedChores.reduce((sum, chore) => sum + chore.timeMinutes, 0);
    
    // Calculate days and weeks based on frequency
    // Group selected chores by their ID to count occurrences
    const choreOccurrences = {};
    selectedChores.forEach(chore => {
      const id = chore.id || chore._id;
      choreOccurrences[id] = (choreOccurrences[id] || 0) + 1;
    });
    
    // Count max daily and weekly chore occurrences
    let maxDailyOccurrences = 0;
    let maxWeeklyOccurrences = 0;

    Object.keys(choreOccurrences).forEach(id => {
      const chore = choresData.find(c => (c.id || c._id) == id);
      if (chore) {
        if (chore.frequency === 'daily') {
          maxDailyOccurrences = Math.max(maxDailyOccurrences, choreOccurrences[id]);
        } else if (chore.frequency === 'weekly') {
          maxWeeklyOccurrences = Math.max(maxWeeklyOccurrences, choreOccurrences[id]);
        }
      }
    });
    
    // Calculate total days and weeks
    // Assumption: Daily chores can be done once per day, weekly chores once per week
    const days = maxDailyOccurrences;
    const weeks = Math.max(Math.ceil(days / 7), maxWeeklyOccurrences);
    
    setTotalEarnings(earnings);
    setTotalTime(time);
    setTotalDays(days);
    setTotalWeeks(weeks);
  }, [selectedChores, choresData]);

  // Handle calculate button click
  const handleCalculate = async () => {
    if (targetInput && !isNaN(targetInput) && parseFloat(targetInput) > 0) {
      // Set the target amount from the input
      const amount = parseFloat(targetInput);
      setTargetAmount(amount);
      
      try {
        // Try to use the API for calculation
        const response = await axios.post(`${API_URL}/chores/calculate`, {
          targetAmount: amount,
          strategies: ['quickest', 'easiest', 'balanced']
        });
        
        // If API responds successfully, use the response
        if (response.data && response.data.results) {
          setChoreResults(response.data.results);
          return;
        }
      } catch (err) {
        // If API fails, calculate locally
        console.error('Error calculating chore plan from API:', err);
        console.log('Performing local calculation instead');
      }
      
      // Local calculation as fallback
      // Calculate different chore combinations
      // Option 1: Quickest path to target (highest paying chores first)
      const quickestPath = findChoresCombination(amount, 'quickest');
      
      // Option 2: Easiest path (shortest duration chores first)
      const easiestPath = findChoresCombination(amount, 'easiest');
      
      // Option 3: Balanced approach (mix of high pay and short duration)
      const balancedPath = findChoresCombination(amount, 'balanced');
      
      // Set the results
      setChoreResults([
        { 
          title: "Quickest Earning Path", 
          description: "Reach your goal with fewer chores (highest paying first)",
          chores: quickestPath.chores,
          totalPay: quickestPath.totalPay,
          totalTime: quickestPath.totalTime,
          totalDays: quickestPath.totalDays,
          totalWeeks: quickestPath.totalWeeks,
          icon: <Target />
        },
        { 
          title: "Easiest Path", 
          description: "Easier chores that take less time",
          chores: easiestPath.chores,
          totalPay: easiestPath.totalPay,
          totalTime: easiestPath.totalTime,
          totalDays: easiestPath.totalDays,
          totalWeeks: easiestPath.totalWeeks,
          icon: <Smile />
        },
        { 
          title: "Balanced Approach", 
          description: "Mix of quick and high-paying chores",
          chores: balancedPath.chores,
          totalPay: balancedPath.totalPay,
          totalTime: balancedPath.totalTime,
          totalDays: balancedPath.totalDays,
          totalWeeks: balancedPath.totalWeeks,
          icon: <Award />
        }
      ]);
    } else {
      setChoreResults([]);
    }
  };

  // Find chore combinations based on strategy with frequency limits
  const findChoresCombination = (target, strategy) => {
    let allChores = [...choresData];
    
    // Sort based on strategy
    if (strategy === 'quickest') {
      // Sort by pay rate (highest first)
      allChores.sort((a, b) => b.payRate - a.payRate);
    } else if (strategy === 'easiest') {
      // Sort by time (shortest first)
      allChores.sort((a, b) => a.timeMinutes - b.timeMinutes);
    } else if (strategy === 'balanced') {
      // Sort by pay rate per minute (most efficient first)
      allChores.sort((a, b) => (b.payRate / b.timeMinutes) - (a.payRate / a.timeMinutes));
    }
    
    // Separate daily and weekly chores
    const dailyChores = allChores.filter(chore => chore.frequency === 'daily');
    const weeklyChores = allChores.filter(chore => chore.frequency === 'weekly');
    
    // Find combination with realistic frequency limits
    const selectedChores = [];
    let totalPay = 0;
    let totalTime = 0;
    
    // Track chore usage
    const dailyChoreUsage = {};
    const weeklyChoreUsage = {};
    let dailyCycle = 1; // Track cycles through all daily chores
    let weeklyCycle = 1; // Track cycles through all weekly chores
    
    // Keep adding chores until we reach or exceed the target
    while (totalPay < target) {
      let addedChore = false;
      
      // First try to use weekly chores if we haven't used them all yet in this cycle
      for (const chore of weeklyChores) {
        const id = chore.id || chore._id;
        const currentUsage = weeklyChoreUsage[id] || 0;
        
        // Weekly chores can only be done once per week
        if (currentUsage < weeklyCycle) {
          // Add this chore
          selectedChores.push({
            ...chore,
            cycle: currentUsage + 1
          });
          totalPay += chore.payRate;
          totalTime += chore.timeMinutes;
          
          // Update usage count
          weeklyChoreUsage[id] = currentUsage + 1;
          addedChore = true;
          break;
        }
      }
      
      // If we couldn't add a weekly chore, try daily chores
      if (!addedChore) {
        let allDailyUsed = true;
        
        // Check if all daily chores have been used 7 times in this cycle
        for (const chore of dailyChores) {
          const id = chore.id || chore._id;
          const currentUsage = dailyChoreUsage[id] || 0;
          
          // Daily chores can be done once per day, up to 7 times before needing to use other chores
          if (currentUsage < dailyCycle * 7) {
            allDailyUsed = false;
            
            // Add this chore
            selectedChores.push({
              ...chore,
              cycle: Math.floor(currentUsage / 7) + 1,
              dayInCycle: (currentUsage % 7) + 1
            });
            totalPay += chore.payRate;
            totalTime += chore.timeMinutes;
            
            // Update usage count
            dailyChoreUsage[id] = currentUsage + 1;
            addedChore = true;
            break;
          }
        }
        
        // If all daily chores have been used 7 times, start a new cycle
        if (!addedChore && !allDailyUsed) {
          continue; // Try again with the same list
        }
        
        // If really all chores (daily and weekly) have been maximally used, start new cycles
        if (!addedChore) {
          // First, try to start a new weekly cycle
          if (Object.keys(weeklyChoreUsage).length === weeklyChores.length) {
            weeklyCycle++;
            continue; // Try again with weekly chores
          }
          
          // If we've used all weekly chores too, start a new daily cycle
          if (Object.keys(dailyChoreUsage).length === dailyChores.length) {
            dailyCycle++;
            continue; // Try again with daily chores
          }
          
          // If we get here, there's an issue with our logic or data
          console.error('Unable to add more chores - check frequency limits');
          break;
        }
      }
    }
    
    // Calculate time period
    // Find the maximum number of times any daily chore was used
    let maxDailyUsage = 0;
    Object.values(dailyChoreUsage).forEach(count => {
      maxDailyUsage = Math.max(maxDailyUsage, count);
    });
    
    // Find the maximum number of times any weekly chore was used
    let maxWeeklyUsage = 0;
    Object.values(weeklyChoreUsage).forEach(count => {
      maxWeeklyUsage = Math.max(maxWeeklyUsage, count);
    });
    
    // Calculate total days and weeks
    const totalDays = maxDailyUsage;
    const totalWeeks = Math.max(Math.ceil(totalDays / 7), maxWeeklyUsage);
    
    // Group chores by type and count for a more compact display
    const choreCount = {};
    selectedChores.forEach(chore => {
      const id = chore.id || chore._id;
      if (!choreCount[id]) {
        choreCount[id] = {
          ...chore,
          count: 1
        };
      } else {
        choreCount[id].count++;
      }
    });
    
    // Convert back to array
    const compactChores = Object.values(choreCount).map(chore => ({
      ...chore,
      totalPayRate: chore.payRate * chore.count,
      totalTimeMinutes: chore.timeMinutes * chore.count
    }));
    
    return {
      chores: compactChores,
      totalPay,
      totalTime,
      totalDays,
      totalWeeks
    };
  };

  // Toggle chore selection
  const toggleChoreSelection = (chore) => {
    // Since we now support multiple instances of the same chore,
    // we'll add a unique identifier for each chore instance
    const choreCopy = { ...chore, instanceId: Date.now() };
    setSelectedChores([...selectedChores, choreCopy]);
  };

  // Clear selections
  const clearSelections = () => {
    setSelectedChores([]);
  };

  // Adopt a suggested plan
  const adoptPlan = (plan) => {
    // Convert the plan's compact chores format to individual chore instances
    let expandedChores = [];
    plan.chores.forEach(chore => {
      for (let i = 0; i < chore.count; i++) {
        expandedChores.push({
          ...chore,
          instanceId: Date.now() + i // Ensure unique IDs
        });
      }
    });
    setSelectedChores(expandedChores);
  };

  // Common styles (matching your existing component styles)
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

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6b7280',
    marginTop: '0.5rem'
  };

  const adoptButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    padding: '0.5rem',
    fontSize: '0.875rem'
  };

  const planCardStyle = {
    backgroundColor: '#f3f0ff',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ddd6fe'
  };

  const choreItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.4rem',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer',
    fontSize: '0.875rem'
  };

  const selectedChoreStyle = {
    ...choreItemStyle,
    backgroundColor: '#f3f0ff'
  };

  const choreTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const choreDetailStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#6b7280',
    fontSize: '0.75rem'
  };

  const choreValueStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  const resultSectionStyle = {
    border: '1px solid #ddd6fe',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem'
  };

  const resultHeaderStyle = {
    backgroundColor: '#f3f0ff',
    padding: '1rem',
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
    borderBottom: '1px solid #ddd6fe',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const resultContentStyle = {
    padding: '1rem',
    backgroundColor: 'white'
  };

  const summaryStyle = {
    backgroundColor: '#f3f0ff',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const summaryItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const summaryLabelStyle = {
    fontSize: '0.875rem',
    color: '#6b7280'
  };

  const summaryValueStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#581c87'
  };

  const dividerStyle = {
    margin: '1.25rem 0',
    borderBottom: '1px solid #e5e7eb'
  };

  const searchInputStyle = {
    ...inputStyle,
    marginBottom: '1rem'
  };

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '0.875rem',
    textDecoration: 'underline',
    padding: '0.5rem 0'
  };

  const errorNoticeStyle = {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader style={{ textAlign: 'center', paddingBottom: '0.5rem' }}>
          <CardTitle style={titleStyle}>
            <ClipboardList style={iconStyle} />
            Chorz Calculator
          </CardTitle>
          <p style={{ color: '#4b5563', marginTop: '0.5rem' }}>
            Find the chores you need to do to earn what you want
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div style={errorNoticeStyle}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading chores data...
            </div>
          ) : (
            <>
              {/* Input Section */}
              <div style={twoColumnGridStyle}>
                <div style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={headingStyle}>
                      <Target style={smallIconStyle} />
                      Set Your Goal
                    </h3>
                    
                    <button
                      onClick={() => {
                        setTargetInput('');
                        setTargetAmount('');
                        setSelectedChores([]);
                        setChoreResults([]);
                      }}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      <RefreshCcw size={16} />
                      Reset Calculator
                    </button>
                  </div>
                  
                  {targetAmount && (
                    <div style={{
                      backgroundColor: '#f0fdf4',
                      border: '1px solid #86efac',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Target size={16} color="#16a34a" />
                      <span style={{ color: '#16a34a', fontWeight: '500' }}>
                        Your target goal: {formatCurrency(targetAmount)}
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <div style={inputContainerStyle}>
                      <label style={labelStyle}>
                        How much do you need to earn?
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          value={targetInput}
                          onChange={(e) => setTargetInput(e.target.value)}
                          style={inputStyle}
                          placeholder="e.g., 50"
                          min="1"
                          step="1"
                        />
                        <DollarSign style={inputIconStyle} />
                      </div>
                    </div>
                    
                    <button
                      onClick={handleCalculate}
                      style={buttonStyle}
                    >
                      <Calculator size={16} />
                      Calculate Chore Plan
                    </button>

                    <div style={dividerStyle}></div>

                    <h4 style={subheadingStyle}>Currently Selected Chores</h4>
                    
                    {selectedChores.length > 0 ? (
                      <div>
                        <div style={summaryStyle}>
                          <div style={summaryItemStyle}>
                            <div style={summaryLabelStyle}>Total Earnings</div>
                            <div style={summaryValueStyle}>{formatCurrency(totalEarnings)}</div>
                          </div>
                          
                          <div style={summaryItemStyle}>
                            <div style={summaryLabelStyle}>Work Time</div>
                            <div style={summaryValueStyle}>{formatTime(totalTime)}</div>
                          </div>
                          
                          <div style={summaryItemStyle}>
                            <div style={summaryLabelStyle}>Time Period</div>
                            <div style={summaryValueStyle}>
                              {formatTimePeriod(totalDays % 7, Math.floor(totalDays / 7))}
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                          {selectedChores.map((chore) => (
                            <div 
                              key={chore.instanceId || chore.id || chore._id} 
                              style={selectedChoreStyle}
                              onClick={() => setSelectedChores(selectedChores.filter(c => 
                                (c.instanceId || c.id || c._id) !== (chore.instanceId || chore.id || chore._id)
                              ))}
                            >
                              <div style={choreTitleStyle}>
                                <CheckCircle size={16} color="#9333ea" />
                                <span>{chore.name}</span>
                              </div>
                              <div style={choreDetailStyle}>
                                <div style={choreValueStyle}>
                                  <Clock size={14} />
                                  {formatTime(chore.timeMinutes)}
                                </div>
                                <div style={choreValueStyle}>
                                  <DollarSign size={14} />
                                  {formatCurrency(chore.payRate)}
                                </div>
                                {chore.frequency && (
                                  <div style={choreValueStyle}>
                                    <Calendar size={14} />
                                    {chore.frequency === 'daily' ? 'Daily' : 'Weekly'}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={clearSelections}
                          style={secondaryButtonStyle}
                        >
                          <RefreshCcw size={16} />
                          Clear Selections
                        </button>
                      </div>
                    ) : (
                      <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                        No chores selected yet. Select chores from the list below or use one of our suggested plans.
                      </p>
                    )}
                  </div>
                </div>

                <div style={cardStyle}>
                  <h3 style={headingStyle}>
                    <ClipboardList style={smallIconStyle} />
                    Available Chores
                  </h3>
                  
                  <div>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={searchInputStyle}
                        placeholder="Search chores..."
                      />
                      <Edit style={inputIconStyle} />
                    </div>
                    
                    <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                      {filteredChores
                        .slice(0, showAll ? filteredChores.length : 5)
                        .map((chore) => (
                          <div 
                            key={chore.id || chore._id} 
                            style={choreItemStyle}
                            onClick={() => toggleChoreSelection(chore)}
                          >
                            <div style={choreTitleStyle}>
                              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid #d1d5db' }}></div>
                              <span>{chore.name}</span>
                            </div>
                            <div style={choreDetailStyle}>
                              <div style={choreValueStyle}>
                                <Clock size={14} />
                                {formatTime(chore.timeMinutes)}
                              </div>
                              <div style={choreValueStyle}>
                                <DollarSign size={14} />
                                {formatCurrency(chore.payRate)}
                              </div>
                              <div style={choreValueStyle}>
                                <Calendar size={14} />
                                {chore.frequency === 'daily' ? 'Daily' : 'Weekly'}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    
                    {filteredChores.length > 5 && (
                      <button 
                        style={toggleButtonStyle}
                        onClick={() => setShowAll(!showAll)}
                      >
                        {showAll ? 'Show Less' : 'Show All'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Suggested Chore Plans */}
              {choreResults.length > 0 && (
                <div style={cardStyle}>
                  <h3 style={headingStyle}>
                    <Star style={smallIconStyle} />
                    Suggested Chore Plans for {formatCurrency(targetAmount)}
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    {choreResults.map((result, index) => (
                      <div key={index} style={resultSectionStyle}>
                        <div style={resultHeaderStyle}>
                          {React.cloneElement(result.icon, { style: smallIconStyle })}
                          <div>
                            <div style={{ fontWeight: '600' }}>{result.title}</div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{result.description}</div>
                          </div>
                        </div>
                        
                        <div style={resultContentStyle}>
                          <div style={summaryStyle}>
                            <div style={summaryItemStyle}>
                              <div style={summaryLabelStyle}>Earnings</div>
                              <div style={summaryValueStyle}>{formatCurrency(result.totalPay)}</div>
                            </div>
                            
                            <div style={summaryItemStyle}>
                              <div style={summaryLabelStyle}>Work Time</div>
                              <div style={summaryValueStyle}>{formatTime(result.totalTime)}</div>
                            </div>
                            
                            <div style={summaryItemStyle}>
                              <div style={summaryLabelStyle}>Time Period</div>
                              <div style={summaryValueStyle} title={`${result.totalDays} days, ${result.totalWeeks} weeks`}>
                                {formatTimePeriod(result.totalDays % 7, Math.floor(result.totalDays / 7))}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '1rem' }}>
                            {result.chores.map((chore) => (
                              <div key={`${chore.id || chore._id}-${chore.count}`} style={choreItemStyle}>
                                <div style={choreTitleStyle}>
                                  <span>{chore.name} {chore.count > 1 ? `(${chore.count}×)` : ''}</span>
                                </div>
                                <div style={choreDetailStyle}>
                                  <div style={choreValueStyle}>
                                    <Clock size={14} />
                                    {formatTime(chore.timeMinutes * chore.count)}
                                  </div>
                                  <div style={choreValueStyle}>
                                    <DollarSign size={14} />
                                    {formatCurrency(chore.payRate * chore.count)}
                                  </div>
                                  <div style={choreValueStyle}>
                                    <Calendar size={14} />
                                    {chore.frequency === 'daily' ? 'Daily' : 'Weekly'}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => adoptPlan(result)}
                            style={adoptButtonStyle}
                          >
                            <CheckCircle size={16} />
                            Use This Plan
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChorzCalculator;