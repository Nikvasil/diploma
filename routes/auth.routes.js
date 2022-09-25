const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator')
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must contains from 6 to 20 symbols')
            .isLength({ min: 6, max: 20 }),
        check('firstName', 'Incorrect name').isAlphanumeric(),
        check('lastName', 'Incorrect name').isAlphanumeric()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incrorrect registration data'
                });
            }

            const { email, password, firstName, lastName, gender, tel, date } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: "Such user is already exist" });
            }

            const rating = 0;
            const regDate = new Date();
            const uaTel = '+38' + tel;
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword, firstName, lastName, gender, tel: uaTel, birthDate: date, regDate, rating });

            await user.save();

            res.status(201).json({ message: 'User has created' });

        } catch (error) {
            res.status(500).json({ message: 'Something go wrong, try again' })
        }
    })

router.post(
    '/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Enter a password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incrorrect authorization data'
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "Cannot find such user" });
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password, try again" });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id });

        } catch (error) {
            console(error.message);
            res.status(500).json({ message: 'Something go wrong, try again' })
        }
    })

module.exports = router;