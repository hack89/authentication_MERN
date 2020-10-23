const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Guest = require('../models/Guest')
const { check, validationResult } = require('express-validator')

router.get('/', auth, async(req, res) => {
    try {
        const guests = await Guest.find({ user: req.user.id });
        res.json(guests)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


router.post('/', auth, [
    check('name', 'Please enter a valid name').not().isEmpty(),
    check('phone', 'Please enter a valid phone number').not().isEmpty(),

], async(req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    try {
        const { name, phone, diet, isConfirmed } = req.body;
        let guest = new Guest({
            user: req.user.id,
            name,
            phone,
            diet,
            isConfirmed
        })

        guest = await guest.save()
        res.json(guest)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }



})


router.delete('/:id', auth, async(req, res) => {
    try {
        let guest = await Guest.findById(req.params.id);
        if (!guest) {
            return res.status(404).json({ msg: 'Guest not found' });
        }
        await Guest.findByIdAndRemove(req.params.id)
        res.send('Guest removed')
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async(req, res) => {
    const { name, phone, diet, isConfirmed } = req.body;
    const updatedGuest = { name, phone, diet, isConfirmed }
    try {
        let guest = await Guest.findById(req.params.id);
        if (!guest) {
            return res.status(404).json({ msg: 'Guest not found' });
        }

        guest = await Guest.findByIdAndUpdate(req.params.id, { $set: updatedGuest }, { new: true });
        res.send(guest)


    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

})


module.exports = router;