const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Create a new class
router.post('/create', classController.createClass);

// Book a slot in a class
router.post('/book', classController.bookSlot);

// Cancel a class
router.post('/cancel', classController.cancelClass);

// Get all active classes
router.get('/', classController.getClasses);

module.exports = router;
