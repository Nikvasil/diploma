const { Router } = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/:id', auth, async (req, res) => {
    try {  
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something go wrong, try again' });
    }
})

module.exports = router;