export interface IAnswer {
  _id: string;
  text: string;
  isCorrect: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQuestion {
  _id: string;
  text: string;
  type: "single" | "multiple" | "input";
  image: string | null;
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
  image: string | null;
  owner_id: string;
  questions: IQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
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
  quiz:IQuiz
  setQuiz(quiz:IQuiz):void
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
