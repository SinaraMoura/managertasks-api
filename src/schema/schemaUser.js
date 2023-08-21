const joi = require('joi');

const schemaUser = joi.object({
    name: joi.string().required().trim().messages({
        "any.required": "Name is required",
        "string.empty": "Name id required",
    }),
    password: joi.string().required().max(30).min(6).messages({
        "any.required": "Password is required",
        "string.empty": "Password is required",
        "string.max": "Password must be a maximum of 30 characters",
        "string.min": "Password must be at least 6 characters"
    }),
    email: joi.string().required().trim().email().messages({
        "any.required": "E-mail is required",
        "string.empty": "E-mail is required",
        "string.email": "Email must be a valid email"
    }),

});

module.exports = { schemaUser }