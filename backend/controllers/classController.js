const Class = require('../models/Class');
const User = require('../models/User');

// Create a new class
const createClass = async (req, res) => {
  try {
    const { name, type, capacity, date, bookings = [], waitlist = [] } = req.body;

    if (!name || !type || !capacity || !date) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    const newClass = await Class.create({
      name,
      type,
      capacity,
      bookings,
      waitlist,
      date: new Date(date)
    });

    res.status(201).json({ newClass, msg: 'Class created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Book a slot in a class
const bookSlot = async (req, res) => {
  try {
    const { classId, userId } = req.body;

    if (!classId || !userId) {
      return res.status(400).json({ msg: 'Please provide both classId and userId' });
    }

    // Validate classId
    const classRecord = await Class.findById(classId).populate('bookings').populate('waitlist');
    if (!classRecord) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    // Validate userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Proceed with booking logic
    if (classRecord.bookings.length < classRecord.capacity) {
      // Space available, book the slot
      classRecord.bookings.push(userId);
    } else {
      // No space, add user to waitlist
      classRecord.waitlist.push(userId);
    }

    await classRecord.save();

    // Allocate slot from waitlist if space becomes available
    if (classRecord.bookings.length > classRecord.capacity) {
      const waitingUser = classRecord.waitlist.shift();
      if (waitingUser) {
        classRecord.bookings.push(waitingUser);
        await classRecord.save();
      }
    }

    // Populate user data in the response
    const populatedClass = await Class.findById(classId).populate('bookings').populate('waitlist');

    res.status(200).json({
      msg: 'Slot booked successfully',
      class: populatedClass,
      user: user
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Cancel a class
const cancelClass = async (req, res) => {
  try {
    const { classId } = req.body;

    if (!classId) {
      return res.status(400).json({ msg: 'Please provide classId' });
    }

    // Validate classId
    const classRecord = await Class.findById(classId);
    if (!classRecord) {
      return res.status(404).json({ msg: 'Class not found' });
    }

    // Mark class as canceled
    classRecord.status = 'canceled';
    await classRecord.save();

    res.status(200).json({ msg: 'Class canceled successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get all active classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({ status: 'active' }).populate('bookings').populate('waitlist');
    res.status(200).json({classes,message:"class getting active successfully"});
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = {
  createClass,
  bookSlot,
  cancelClass,
  getClasses
};
