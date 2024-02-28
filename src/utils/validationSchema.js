import joi from "joi";

export const userValidation = {
  signUpSchema: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
    passwordConfirm: joi.string().min(6).max(20).required(),
    name: joi.string().min(2).max(20).required(),
    address: joi.string().min(5).required(),
    role: joi.string().min(4).max(5).lowercase(),
  }),

  signInSchema: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
  }),

  passwordSchema: joi.object({
    password: joi.string().min(6).max(20).required(),
  }),

  userUpdateSchema: joi.object({
    password: joi.string().min(6).max(20).optional(),
    passwordConfirm: joi.string().min(6).max(20).optional(),
    name: joi.string().min(2).max(20).optional(),
    address: joi.string().min(5).optional(),
    role: joi.string().min(4).max(5).optional(),
  }),
};

export const menuValidation = {
  menuSchema: joi.object({
    price: joi.number(),
    stock: joi.number(),
    name: joi.string().min(1).max(20),
    category: joi.string().min(1).max(20),
    status: joi.string().min(1).max(20),

  })

}
