import type { ObjectId } from "mongodb";

export interface IAnswer {
  _id: string | ObjectId;
  text: string;
  isCorrect: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuestion {
  _id: string;
  text: string;
  type: "single" | "multiple" | "input";
  options: IAnswer[] | null;
  inputAnswer: string | null;
  points: number; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  owner_id: string | ObjectId;
  questions: IQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddQuizProps{
  active: boolean
  setActive(active: boolean): void
}

export interface ICraeteQuestion {
  setNextActive(nextActive: boolean): void
  setActive(active: boolean): void
}