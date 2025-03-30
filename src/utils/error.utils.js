
export class ServerError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status; // Asegurate de tener esta línea
    }
}