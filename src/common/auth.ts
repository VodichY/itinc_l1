import { Request, Response, NextFunction } from "express";

export const checkAuthorization  = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers['authorization'];
	if(authorization !== 'Basic YWRtaW46cXdlcnR5') {
		res.sendStatus(401);
		return;
	}
	next();
}
