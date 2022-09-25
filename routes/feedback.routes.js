const { Router } = require('express');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/add_feedback', auth, async (req, res) => {
    try {
        const { trip, whom, mark, feedbackText } = req.body;

        const feedback = new Feedback({
            trip, author: req.user.userId, whom, mark, feedbackText
        });

        await feedback.save();

        const feedbacks = await Feedback.find({ whom: whom });
        const feedbacksTrue = await Feedback.find({ whom: whom, mark: true });
        console.log((feedbacks.length / feedbacksTrue.length));

        await User.findOneAndUpdate(
            {
                _id: whom
            },
            {
                rating: (feedbacksTrue.length / feedbacks.length) * 100
            },
            {
                upsert: true
            }
        )

        res.status(201).json({ feedback });
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' });
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ owner: req.params.id })
        res.json(feedbacks)
    } catch (e) {
        res.status(500).json({ message: 'Something go wrong, try again' })
    }
})

module.exports = router;