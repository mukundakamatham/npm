const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');



const auth = require('../middlewares/authenticate');
const Slot = require('../models/slot.model');
const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');

router.get('/:user_type/:status?', auth, async (req, res) => {
  try {
    const { user_type, status } = req.params;

    if (user_type !== 'coach' && user_type !== 'user') {
      return res.status(400).json({ msg: 'Invalid user type' });
    }

    let appointmentStatus = ['success','rejected'];
    let condition = {};
    let populateBy = '';
    if (user_type === 'coach') {
      condition.coach = req.body.coach_id;
      populateBy = 'coach';
    } else if (user_type === 'user') {
      condition.user = req.user.id;
      populateBy = 'user';
    }

    if (status && appointmentStatus.includes(status)) {
      condition.status = status;
    }

    const appointments = await Appointment.find(condition).populate(
      populateBy,
      ['name', 'email']
    );

    if (appointments.length === 0) {
      return res.status(400).json({ msg: 'No appointments found' });
    }

    res.json(appointments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/add',
  [
    auth,
    [
     
      check('user')
        .not()
        .isEmpty()
        .withMessage('Please select a user slot')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user } = req.body;

    if (req.user.id === user) {
      return res
        .status(400)
        .json({ msg: "You can't allocate slot to yourself" });
    }

    try {
      const slot = await Slot.findOne({ user: user });

      if (!slot) {
        return res.status(400).json({
          msg: 'The requested user slot is not available at the moment'
        });
      }

      const appointments = await Appointment.find({
        user: user,
        status: 'accepted'
      });

      if (appointments.length >= slot.total) {
        return res.status(400).json({ msg: 'There is no slot available' });
      }

      const appointmentFields = { user: user, coach: req.body.coach_id };
      if (time) appointmentFields.time = time;

      const appointment = new Appointment(appointmentFields);
      await appointment.save();

      res.json(appointment);
    } catch (error) {
      console.log(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Slot not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

router.put(
  '/update',
  [
    auth,
    [
      check('id', 'Appointment is required')
        .not()
        .isEmpty(),
      check('status', 'Please select a valid status').isIn([
        'accepted',
        'rejected',
        'completed'
      ])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, status } = req.body;

    try {
      let appointment = await Appointment.findOne({
        _id: id,
        user: req.user.id
      });

      if (!appointment) {
        return res.status(400).json({
          msg: 'Appointment not found'
        });
      }

      appointment.status = status;

      appointment = await Appointment.findOneAndUpdate(
        { _id: id },
        { $set: appointment },
        { new: true }
      ).populate('user', ['name', 'email']);

      res.json(appointment);
    } catch (error) {
      console.log(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Appointment not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
