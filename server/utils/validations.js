import { body } from 'express-validator';

export const loginValidation = [
    body('email', "Email is incorrect").isEmail(),
    body('password', "Password length is < 5").isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', "Email is incorrect").isEmail(),
    body('password', "Password length is < 1").isLength({ min: 1 }),
    body('fullName', "Set Name").isLength({ min: 3 }),
    body('avatarUrl', "Please set url for avatar image").isString()
];

export const messageCreateValidation = [
    body('text', "Text is not found").isString(),
    body('imageUrl', "Please set url for image").optional().isArray(),
    body('userId', "user is not accepted").optional()
]