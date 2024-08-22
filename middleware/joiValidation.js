const Joi = require('joi');

const productValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    image: Joi.string().optional().uri(),
    category: Joi.string().required(),
    isDeleted: Joi.boolean().optional(),
    quantity: Joi.number().optional().min(0), 
});

module.exports = {productValidation};
