const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('../middlewares/authenticate');
const Slot = require('../models/slot.model');
const Appointment = require('../models/appointment.model');
const User = require('../models/coach.model');


router.get('/coach/:id', auth, async (req, res) => {
  try {
    const slot = await Slot.findOne({ coach: req.params.id }).populate('coach', [
      'name'
    ]);

    if (!slot) {
      return res
        .status(400)
        .json({ msg: 'Available slot configuration not found' });
    }
    res.json(slot);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});


router.post(
  '/',
  [
    auth,
    [
      check('total', 'Number of slots is required')
        .isNumeric()
        .withMessage('Must be a numeric value')
     
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { total, time } = req.body;

    try {
      let slot = await Slot.findOne({ user: req.user.id });

      if (slot) {
        slot.total = total;
        if (time) slot.time = time;
        slot = await Slot.findOneAndUpdate(
          { user: req.user.id },
          { $set: slot },
          { new: true }
        );
        return res.json(slot);
      }

      // create
      const slotFields = { total, user: req.user.id,coach:req.body.coach_id };
      if (time) slotFields.time = time;
      slot = new Slot(slotFields);
      await slot.save();
      res.json(slot);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

router.get(
  '/search',
  [
    check('name', 'User name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;

      const user = await User.findOne({
        name: { $regex: new RegExp(name, 'ig') }
      });

      if (!user) {
        return res.status(400).json({ msg: 'No coach found!' });
      }

      const slots = await Slot.find({ user: user._id }).populate('user', [
        'name',
        'email'
        
      ]);

     

      res.json(slots);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find().populate('user', ['name', 'email']);
    res.json(slots);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/user/:user_id', auth,async (req, res) => {
  try {
    const slot = await Slot.findOne({
      user: req.user.id
    }).populate('user', ['name', 'email']);

    if (!slot) {
      return res.status(400).json({ msg: 'Slot not found' });
    }

    const appointments = await Appointment.find({
      coach: req.user.id,
      status: 'accepted'
    });

    const accepted = appointments.length;

    res.json({ slot, accepted });
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Slot not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
