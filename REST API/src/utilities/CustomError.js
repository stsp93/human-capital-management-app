module.exports = class CustomError {
    constructor(message, status) {
        this.message = message;
        this.status = status
    }
}