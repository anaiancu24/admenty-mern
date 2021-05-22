const express = require('express');
const router = express.Router();
const auth = require('../../routes/middleware/auth')

// Item Model
const Checkin = require('../../models/Checkin');

// @route GET api/checkins
// @desc Get All Checkins
// @access Public
router.get('/', auth, (req, res) => {
    Checkin.find()
        .sort({date: -1})
        .then(checkins => res.json(checkins))
})

// @route POST api/checkins
// @desc Create a checkin
// @access Private
router.post('/', auth, (req, res) => {
    const newCheckin = new Checkin({
        mood: req.body.mood
    })
    newCheckin.save().then(checkin => res.json(checkin))
})

// @route DELETE api/checkins/:id
// @desc Delete a checkin
// @access Private
router.delete('/:id', auth, (req, res) => {
    Checkin.findById(req.params.id)
        .then(checkin => checkin.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}))
})

module.exports = router;