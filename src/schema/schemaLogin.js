const joi = require('joi');

const schemaLogin = joi.object({
    email: joi.string().trim().email().required().messages({
        "any.required": "E-mail is required",
        "string.empty": "E-mail is required",
        "string.email": "Email must be a valid email"
    }),
    password: joi.string().trim().min(6).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters"
    }),
});

module.exports = { schemaLogin }