const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

// Habit list page
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: 'desc' });
    res.render('index', { habits });
  } catch (err) {
    console.error('Error retrieving habits:', err);
    res.redirect('/');
  }
});

// Add new habit
router.post('/habits', async (req, res) => {
  const { name, description } = req.body;

  try {
    await Habit.create({ name, description });
    res.redirect('/');
  } catch (err) {
    console.error('Error creating habit:', err);
    res.redirect('/');
  }
});

// Mark habit as completed
router.put('/habits/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habit.findById(id);
    habit.completed = !habit.completed;
    await habit.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error updating habit:', err);
    res.redirect('/');
  }
});

module.exports = router;
