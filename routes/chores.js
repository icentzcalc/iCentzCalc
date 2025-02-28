const express = require('express');
const router = express.Router();
const Chore = require('../models/Chore');

// Get all chores
router.get('/', async (req, res) => {
  try {
    const chores = await Chore.find();
    res.json(chores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new chore
router.post('/', async (req, res) => {
  const chore = new Chore({
    name: req.body.name,
    timeMinutes: req.body.timeMinutes,
    payRate: req.body.payRate,
    frequency: req.body.frequency,
    category: req.body.category
  });

  try {
    const newChore = await chore.save();
    res.status(201).json(newChore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Calculate chore plan based on target amount
router.post('/calculate', async (req, res) => {
  try {
    const { targetAmount, strategy } = req.body;
    
    // Get all chores from database
    const chores = await Chore.find();
    
    // Implement your chore plan calculation logic here
    // (This is where you would add the logic for daily/weekly chores)
    
    // For now, return a simple response
    res.json({
      targetAmount,
      strategy,
      message: "Calculation endpoint working, logic to be implemented"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;