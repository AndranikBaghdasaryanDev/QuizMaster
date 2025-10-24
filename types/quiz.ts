import { Schema, model, Types } from "mongoose";

interface IQuestion {
  text: string;
  options: string[];
  answer: number; // index of the correct option
  quiz_id?: Types.ObjectId; // optional back-reference
  createdAt?: Date;
  updatedAt?: Date;
}