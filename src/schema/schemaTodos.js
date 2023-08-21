const joi = require('joi');

const schemaTodos = joi.object({
    task: joi.string().trim().required().messages({
        "any.required": "Task is required",
        "string.empty": "Task is required"
    }),
    active: joi.boolean().required().messages({
        "any.required": "Active is required",
        "string.empty": "Active is required"
    }),
});

module.exports = { schemaTodos }