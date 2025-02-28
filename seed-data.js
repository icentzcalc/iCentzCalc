const mongoose = require('mongoose');
const Chore = require('./models/Chore');
require('dotenv').config();

// Initial chore data
const chores = [
  { name: "Wash dishes", timeMinutes: 20, payRate: 3, frequency: "daily" },
  { name: "Mow the lawn", timeMinutes: 45, payRate: 10, frequency: "weekly" },
  { name: "Take out trash", timeMinutes: 5, payRate: 1, frequency: "daily" },
  { name: "Vacuum living room", timeMinutes: 15, payRate: 2, frequency: "daily" },
  { name: "Clean bathroom", timeMinutes: 30, payRate: 5, frequency: "weekly" },
  { name: "Fold laundry", timeMinutes: 20, payRate: 3, frequency: "daily" },
  { name: "Sweep and mop floors", timeMinutes: 30, payRate: 4, frequency: "weekly" },
  { name: "Dust furniture", timeMinutes: 25, payRate: 3, frequency: "daily" },
  { name: "Clean windows", timeMinutes: 40, payRate: 6, frequency: "weekly" },
  { name: "Make beds", timeMinutes: 10, payRate: 2, frequency: "daily" },
  { name: "Clean refrigerator", timeMinutes: 35, payRate: 5, frequency: "weekly" },
  { name: "Organize bookshelf", timeMinutes: 25, payRate: 4, frequency: "weekly" },
  { name: "Water plants", timeMinutes: 10, payRate: 2, frequency: "daily" },
  { name: "Walk the dog", timeMinutes: 30, payRate: 4, frequency: "daily" },
  { name: "Grocery shopping", timeMinutes: 60, payRate: 8, frequency: "weekly" },
  { name: "Weed garden", timeMinutes: 40, payRate: 6, frequency: "weekly" },
  { name: "Wash car", timeMinutes: 45, payRate: 7, frequency: "weekly" },
  { name: "Help with cooking", timeMinutes: 40, payRate: 5, frequency: "daily" },
  { name: "Clean garage", timeMinutes: 90, payRate: 15, frequency: "weekly" },
  { name: "Tidy bedroom", timeMinutes: 15, payRate: 2, frequency: "daily" },
  { name: "Wipe down kitchen counters", timeMinutes: 10, payRate: 2, frequency: "daily" },
  { name: "Empty dishwasher", timeMinutes: 10, payRate: 2, frequency: "daily" },
  { name: "Sort recycling", timeMinutes: 10, payRate: 2, frequency: "weekly" },
  { name: "Clean cat litter box", timeMinutes: 10, payRate: 3, frequency: "daily" },
  { name: "Clean microwave", timeMinutes: 5, payRate: 1, frequency: "weekly" },
  { name: "Clean baseboards", timeMinutes: 30, payRate: 6, frequency: "weekly" },
  { name: "Wash bedding", timeMinutes: 60, payRate: 8, frequency: "weekly" },
  { name: "Clean blinds", timeMinutes: 30, payRate: 4, frequency: "weekly" },
  { name: "Shake out rugs", timeMinutes: 15, payRate: 2, frequency: "weekly" },
  { name: "Wipe down mirrors", timeMinutes: 10, payRate: 2, frequency: "weekly" },
  { name: "Clean out car trunk", timeMinutes: 20, payRate: 3, frequency: "weekly" },
  { name: "Wipe doors and switches", timeMinutes: 15, payRate: 2, frequency: "weekly" },
  { name: "Pick up dog waste from yard", timeMinutes: 15, payRate: 3, frequency: "weekly" },
  { name: "Clean out closet", timeMinutes: 30, payRate: 5, frequency: "weekly" },
  { name: "Sort mail and discard junk", timeMinutes: 5, payRate: 1, frequency: "daily" },
  { name: "Clean grill", timeMinutes: 25, payRate: 4, frequency: "weekly" },
  { name: "Organize pantry", timeMinutes: 30, payRate: 5, frequency: "weekly" },
  { name: "Clean pool", timeMinutes: 60, payRate: 10, frequency: "weekly" },
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected to iCentz database');
    
    try {
      // Clear existing chores
      await Chore.deleteMany({});
      console.log('Cleared existing chores from Chorz collection');
      
      // Insert new chores
      const result = await Chore.insertMany(chores);
      console.log(`Added ${result.length} chores to database`);
      
      // Close the connection
      mongoose.connection.close();
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));