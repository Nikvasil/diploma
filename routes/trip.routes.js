const { Router } = require('express');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth.middleware');
const router = Router();
const { check, validationResult } = require('express-validator');

router.post(
    '/create',
    [
        check('from', 'Incorrect city name').isAlphanumeric(),
        check('to', 'Incorrect city name').isAlphanumeric()
    ],
    auth, async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incrorrect input data'
                });
            }

            const { from, to, date, price, vehicle } = req.body

            const regDate = new Date();

            const trip = new Trip({
                owner: req.user.userId, joiner: null, from, to, depDate: date, price, vehicle, regDate, isDone: false
            })

            await trip.save()

            res.status(201).json({ vehicle })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something go wrong, try again' })
        }
    })

router.post('/remove_trip', auth, async (req, res) => {
    try {
        const tripId = req.body

        const trip = await Trip.findOne({ tripId })

        await trip.delete()

        res.status(201).json({ trip })
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.post('/done_trip', auth, async (req, res) => {
    try {
        const tripId = req.body

        const trip = await Trip.findOneAndUpdate(
            {
                _id: tripId.tripId.tripId
            },
            {
                isDone: true
            },
            {
                upsert: true
            }
        )

        res.status(201).json({ trip })
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.post('/join_trip', auth, async (req, res) => {
    try {
        const { userId, tripId } = req.body

        const trip = await Trip.findOneAndUpdate(
            {
                _id: tripId.tripId
            },
            {
                joiner: userId
            }
        )

        res.status(201).json({ trip })
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.post('/leave_trip', auth, async (req, res) => {
    try {
        const tripId = req.body

        const trip = await Trip.findOneAndUpdate(
            {
                _id: tripId.tripId.tripId
            },
            {
                joiner: null
            },
            {
                upsert: true
            }
        )

        res.status(201).json({ trip })
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.post('/search', auth, async (req, res) => {
    try {
        const { from, to, date } = req.body;

        const trips = await Trip.find(
            {
                from: from,
                to: to,
                date: date,
                joiner: null,
                isDone: false
            }
        ).sort('price');

        res.json(trips)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.get('/created', auth, async (req, res) => {
    try {
        const trips = await Trip.find({ owner: req.user.userId }).sort('isDone');
        res.json(trips)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.get('/joined', auth, async (req, res) => {
    try {
        const trips = await Trip.find({ joiner: req.user.userId }).sort('isDone');
        res.json(trips)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Something go wrong, try again' });
    }
})

module.exports = router;
