const bcrypt = require('bcrypt');
const User = require('../models/User');
const register = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            location,
            description,
            occupation
        } = req.body;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json(
                { message: "this email is already registered" }
            );
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                location,
                description,
                occupation
            }
        );
        await newUser.save();
        return res.status(201).json({ message: "Register completed Successfully" });
    } catch (error) {
        next(error);
    }
}
//login
const login = async (req, res, next) => {
    try {
        const { email, password, } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {

            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (isPasswordValid) {
                return res.status(200).json({
                    message: "Login Successfully",
                    user: {
                        _id: existingUser._id,
                        firstName: existingUser.firstName,
                        lastName: existingUser.lastName,
                        email: existingUser.email,
                        location: existingUser.location,
                        description: existingUser.description,
                        occupation: existingUser.occupation
                    }
                });
            }
            else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        };

        if (!existingUser) {
            return res.status(401).json({ message: "Unauthorized:Invalid email or password" });
        };

    } catch (error) {
        next(error);
    }
}
module.exports = { register, login };