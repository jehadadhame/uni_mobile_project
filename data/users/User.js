export class User {
    constructor({
        uid,
        name,
        email,
        role,
        createdAt,
    }) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
    }
}