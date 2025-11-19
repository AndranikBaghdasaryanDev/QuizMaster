import type { Types } from "mongoose";
export interface IAnswer {
  _id: string;
  text: string;
  isCorrect: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IAnswerFront {
  id:number
  text: string;
  isCorrect: boolean | string;
  isClicked?:boolean
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IQuestion {
  _id: string;
  text: string;
  type: "single" | "multiple" | "input";
  image: string | null;
  options: IAnswerFront[];
  inputAnswer: string | null;
  points: number; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuiz {
  _id?: string;
  title: string;
  description: string;
  image: string | null;
  owner_id: string;
  questions: IQuestion[];
  isActive: boolean;
  availableFrom: Date;
  availableUntil: Date;
  access: "free" | "pro" | "premium";
  level: "easy" | "medium" | "hard";
  category: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IQuizFront {
  image: string;
  title: string;
  description: string;
  owner_id: string;
  access: string;
  isActive: boolean;
  availableFrom: string;
  availableUntil: string;
  level: string;
  category: string;
  questions: any[];
}
export interface IQuizUploadFiles {
  quizImage?: Express.Multer.File[];
  questionImages?: Express.Multer.File[];
}

export interface IAddQuizProps{
  active: boolean
  setActive(active: boolean): void
}
export interface ICraeteQuestion {
  quizData:IQuizFront
  setQuiz(quiz:IQuizFront):void
  setNextActive(nextActive: boolean): void
  setActive(active: boolean): void
}
export type IQuizAnswersSubmit = {
  quizId:string
  answers:IUserAnswer[]
}
export interface IUserAnswer {
  questionId: string;
  answer: string | string[]; // For single: string, for multiple: string[], for input: string
}

export interface IScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
}
