import type { Request, Response } from "express";
import { Level } from "../models/index.ts";

class LevelController {
	async getAllLevel(req: Request, res: Response) {
		try {
			const result = await Level.find({});
			return res.send({ error: false, message: "Success", payload: result });
		} catch(err) {
			return res.status(500).send({ error: true, message: "Server error", payload: err });
		}
	}    
}

export default new LevelController();