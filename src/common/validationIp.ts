import { Request, Response, NextFunction } from "express";

export const ipList = ['127.0.0.2']

export const checkIp = (req: Request, res: Response, next: NextFunction) => {
	let ip = req.ip || req.socket.remoteAddress;
	if (ip) {
		ip = ip.replace('::ffff:','');
	}
	const result = ipList.find((elem) => elem === ip);
	if(result) {
		res.sendStatus(423);
		return;
	}
	next();
}

