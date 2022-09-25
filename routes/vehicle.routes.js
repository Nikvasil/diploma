const { Router } = require('express');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/add_vehicle', auth, async (req, res) => {
    try {
        const { registrationPlate, mark, model } = req.body

        const existing = await Vehicle.findOne({ registrationPlate })

        if (existing) {
            return res.json({ vehicle: existing })
        }

        const vehicle = new Vehicle({
            registrationPlate, mark, model, owner: req.user.userId
        })

        await vehicle.save()

        res.status(201).json({ vehicle })
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ owner: req.params.id })
        res.json(vehicles)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.get('/trip/:id', auth, async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ _id: req.params.id })
        res.json(vehicle)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ owner: req.user.userId })
        res.json(vehicles)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

module.exports = router;
