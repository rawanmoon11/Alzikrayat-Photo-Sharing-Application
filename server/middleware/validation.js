const Joi = require('joi');
const registerSchema = Joi.object(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        location: Joi.string().allow("").optional(),
        description: Joi.string().allow("").optional(),
        occupation: Joi.string().allow("").optional()
    });

const validateRegister = (req, res, next) => {

    const { error } = registerSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};


const loginSchema = Joi.object(
    {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

const validateLogin = (req, res, next) => {

    const { error } = loginSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};



//photo schema
const photoSchema = Joi.object(
    {
        userId: Joi.string().required(),
        title: Joi.string().trim().required(),
        description: Joi.string().allow("").optional()

    });

const validatePhoto = (req, res, next) => {

    const { error } = photoSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    if (!req.file)
        return res.status(400).json({ message: "photo file is required" });

    next();
};






//comment schema
const commentSchema = Joi.object(
    {
        photoId: Joi.string().required(),
        userId: Joi.string().required(),
        comment: Joi.string().trim().required(),
    });

const validateComment = (req, res, next) => {

    const { error } = commentSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};


module.exports = { validateRegister, validateLogin, validateComment, validatePhoto };