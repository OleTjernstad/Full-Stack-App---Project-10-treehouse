const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const asyncHandler = require('../tools/handler');

const { User } = require('../models');

router.get(
    '',
    authenticateUser,
    asyncHandler(async (req, res, next) => {
        const user = await User.findByPk(req.currentUser.id, {
            attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        });
        res.json({ user });
    })
);

router.post(
    '',
    asyncHandler(async (req, res, next) => {
        let user;
        const { firstName, lastName, emailAddress, password } = req.body;
        try {
            user = await User.create({
                firstName,
                lastName,
                emailAddress,
                passwordValidate: password
            });
            res.location('/');
            res.status(201).end();
        } catch (error) {
            console.log(error);
            if (
                error.name === 'SequelizeValidationError' ||
                error.name === 'SequelizeUniqueConstraintError'
            ) {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    })
);

module.exports = router;
