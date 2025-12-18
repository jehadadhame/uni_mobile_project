export class Message {
    constructor({ uid, message, status, sentAt, recivedAt, readAt }) {
        this.uid = uid;
        this.message = message;
        this.status = status
        this.sentAt = sentAt;
        this.recivedAt = recivedAt;
        this.readAt = readAt;
    }
}