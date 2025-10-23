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
}
export default new Validator();