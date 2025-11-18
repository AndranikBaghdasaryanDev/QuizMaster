<<<<<<< HEAD
import type { ObjectId } from "mongodb";
import type { ICategories } from "./categories";

=======
>>>>>>> c898f16bd02ed15d2840dbaadfc1e9761b8c796d
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
<<<<<<< HEAD
  level:string
  category:ICategories
  access:string
  isActive:boolean
  image?: string | null;
  owner_id: string | ObjectId;
=======
  image: string | null;
  owner_id: string;
>>>>>>> c898f16bd02ed15d2840dbaadfc1e9761b8c796d
  questions: IQuestion[];
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
