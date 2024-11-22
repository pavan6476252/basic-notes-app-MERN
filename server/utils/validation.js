import Joi from "joi";

export const noteSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid('Work', 'Personal', 'Others'),
    completed: Joi.boolean(),
});

 