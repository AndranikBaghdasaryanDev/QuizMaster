import type { Request, Response } from "express";
import { Category } from "../models/index.ts";

class CategoryController {
    async getAllCategories(req: Request, res: Response) {
        try {
            const result = await Category.find({});
            return res.send({ error: false, message: "Success", payload: result });
        } catch(err) {
            return res.status(500).send({ error: true, message: "Server error", payload: err });
        }
    }    
}

export default new CategoryController();