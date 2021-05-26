const express = require('express');
const router = express.Router();
const auth = require('../../routes/middleware/auth')

// Item Model
const Checkin = require('../../models/Checkin');
const User = require('../../models/User');


// @route GET api/checkins
// @desc Get All Checkins of the Authenticated user
// @access Public
router.get('/', auth, async (req, res) => {
    const userId = req.user.id
    // Find current user and populate the checkins
    const currentUser = await User.findById(userId).populate('checkins')
    res.json(currentUser.checkins)
})

// @route POST api/checkins
// @desc Create a checkin for the Authenticated user
// @access Private
router.post('/', auth, async (req, res) => {
    const userId = req.user.id
    // Create a new checkin
    const newCheckin = new Checkin(req.body)
    // Find current user
    const currentUser = await User.findById(userId)
    // Assign current user to the checkin
    newCheckin.user = currentUser;
    // Save the new checkin
    newCheckin.save();
    // Add checkin to the user's checkins array
    currentUser.checkins.push(newCheckin._id);
    // Save the user
    currentUser.save();
    res.status(201).json(newCheckin)
})

// @route DELETE api/checkins/:id
// @desc Delete a checkin of the Authenticated user
// @access Private
router.delete('/:id', auth, (req, res) => {
    Checkin.findById(req.params.id)
        .then(checkin => checkin.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;