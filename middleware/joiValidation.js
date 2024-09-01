const Joi = require('joi');

const productValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    imageSrc: Joi.string().optional().uri(),
    category: Joi.string().required(),
    isDeleted: Joi.boolean().optional(),
    quantity: Joi.number().optional().min(0), 
});

module.exports = {productValidation};
