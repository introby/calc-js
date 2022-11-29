export class Memory {

    mValue;

    constructor() {
        this.mValue = 0;
    }

    addToMemory(value) {
        this.mValue += (+value);
    }

    removeFromMemory(value) {
        this.mValue -= (+value);
    }

    recoverMemory() {
        return this.mValue;
    }

    clearMemory() {
        this.mValue = 0;
    }
}