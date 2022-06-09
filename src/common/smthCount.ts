import { Request, Response, NextFunction } from "express";

let reqCount = 0;

export const requestCount = (req: Request, res: Response, next: NextFunction) => {
	reqCount += 1;
	res.setHeader('reqCount', reqCount);
	next();
}
