import { Request, Response, NextFunction } from "express";

export const checkContentType = (req: Request, res: Response, next: NextFunction) => {
	const contentType = req.headers['content-type'];
	const isMethodPutPost = (req.method === 'PUT' || req.method === 'POST');
	if(isMethodPutPost && contentType !== 'application/json') {
		res.sendStatus(400);
		return;
	}
	next();
}
