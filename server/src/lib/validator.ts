import type { IResponse } from "@/response.ts";
import type { IQuestion } from "@/quiz.ts";

class Validator {
    isValidLen(val: string, minLength = 2, maxLength = 100) {
        return val.length >= minLength && val.length <= maxLength;
    }
    isValidUsername(val: string) {
        return /^[a-z0-9_-]{3,15}$/.test(val);
    }
    isValidPassword(val: string) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(val);
    }
    isValidEmail(val: string) {
        return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(val);
    }
    isValidQuestion(val: IQuestion): IResponse {
        const { text, type, options, points = 1, inputAnswer } = val;
        if (!text || !this.isValidLen(text, 3, 500)) {
            return { error: true, message: "Question text must be 3-500 character long." };
        }
        switch(type) {
            case "single": {
                if (!options || options.length <= 0) {
                    return { error: true, message: "Single choice quesion must have options." };
                }
                if (options.filter(op => op.isCorrect).length != 1) {
                    return { error: true, message: "Single choice question must have exactly 1 correct answer" };
                }
                break;
            };
            case "multiple": {
                if (!options || options.length <= 0) {
                    return { error: true, message: "Multiple choice question must have options." };
                }
                if (options.filter(op => op.isCorrect).length < 1) {
                    return { error: true, message: "Multiple choice question must have at least one correct answer." };
                }
                break;
            };
            case "input": {
                if (!inputAnswer || inputAnswer.trim() === "") {
                    return { error: true, message: "Input choice question must have input answer." };
                }
                break;
            };
            default: {
                return { error: true, message: "Invalid question type." };
            }
        }

        if (points < 1) {
            return { error: true, message: "Invalid points for question" };
        }
        return { error: false, message: "Valid" };
    }
}
export default new Validator();