export class Item {
    constructor({ title, price, category, condition, description, status, createdAt, createdBy, updatedAt = null, updatedBy = null }) {
        this.title = title;
        this.price = price;
        this.category = category;
        this.condition = condition;
        this.description = description;
        this.status = status;

        this.createdAt = createdAt;
        this.createdBy = createdBy;

        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
    }

    toFirestore() {
        return { ...this };
    }

}
