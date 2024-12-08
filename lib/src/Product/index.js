"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const uuid_1 = require("uuid");
const Validators_1 = require("../Validators");
class Product {
    constructor(props) {
        this.onUpdateCallbacks = [];
        Validators_1.Validator.checkIfProductIsValid(props);
        const { name, category, price } = props;
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.category = category;
        this.price = price;
    }
    updateValue(key, value) {
        const isStringType = typeof value !== "string" || value.trim().length === 0;
        const isNumberType = typeof value !== "number" || isNaN(value) || value <= 0;
        const isArrayType = !Array.isArray(value) || value.some((cat) => typeof cat !== "string");
        switch (key) {
            case "name":
                if (isStringType) {
                    throw new Error("Nazwa musi być niepustym ciągiem znaków");
                }
                break;
            case "price":
                if (isNumberType) {
                    throw new Error("Cena musi być dodatnią liczbą");
                }
                break;
            case "category":
                if (isArrayType) {
                    throw new Error("Kategoria musi być tablicą ciągów znaków");
                }
                break;
            default:
                throw new Error(`Nie można zaktualizować pola: ${key}`);
        }
        this[key] = value;
        this.onUpdateCallbacks.forEach((callback) => callback());
    }
    registerUpdateCallback(callback) {
        this.onUpdateCallbacks.push(callback);
    }
}
exports.Product = Product;
