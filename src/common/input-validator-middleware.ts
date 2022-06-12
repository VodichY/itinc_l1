import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const inputValidatorMiddleware = body('author').isLength({ max: 15 }).withMessage('Max 15 symbols').matches(/[a-zA-Z]/);

export const validateHandler = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}