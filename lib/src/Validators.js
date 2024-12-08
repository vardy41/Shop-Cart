"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const Item_1 = require("./Cart/Item");
const Discount_1 = require("./Discount");
class Validator {
    static checkIfCartIsValid(cart) {
        const { itemList, discountOnCart } = cart;
        Validator.validateItemList(itemList);
        Validator.validateDiscountOnCart(discountOnCart);
    }
    static checkIfCartItemIsValid(item) {
        const { product, price, percentageDiscount, quantity } = item;
        Validator.checkIfProductIsValid(product);
        Validator.validateNumber(price, "Cena");
        Validator.validatePercentageDiscount(percentageDiscount);
        Validator.validateTotalQuantity(quantity);
    }
    static checkIfProductIsValid(product) {
        const { name, category, price } = product;
        Validator.validateString(name, "Nazwa");
        Validator.validateCategory(category);
        Validator.validateNumber(price, "Cena");
    }
    static checkIfDiscountIsValid(discount) {
        const { name, label, discountPercentage } = discount;
        Validator.validateString(name, "Nazwa");
        Validator.validateString(label, "Etykieta");
        Validator.validatePercentageDiscount(discountPercentage);
    }
    static validateString(value, fieldName) {
        if (typeof value !== "string") {
            throw new Error(`${fieldName} musi być stringiem`);
        }
        if (value.trim() === "") {
            throw new Error(`${fieldName} nie może być pustym stringiem`);
        }
    }
    static validateInstance(value, instanceType, fieldName) {
        if (!(value instanceof instanceType)) {
            throw new Error(`${fieldName} musi być instancją ${instanceType.name}`);
        }
    }
    static validateArray(value, fieldName) {
        if (!Array.isArray(value)) {
            throw new Error(`${fieldName} musi być tablicą`);
        }
    }
    static validateNumber(value, fieldName) {
        if (typeof value !== "number") {
            throw new Error(`${fieldName} musi być typu number`);
        }
        if (Validator.isNaN(value)) {
            throw new Error(`${fieldName} musi być liczbą całkowitą`);
        }
        if (value < 0) {
            throw new Error(`${fieldName} musi być liczbą dodatnią`);
        }
    }
    static isNaN(value) {
        return Number.isNaN(value);
    }
    static validateCategory(category) {
        Validator.validateArray(category, "Kategoria");
        category.forEach((item) => Validator.validateString(item, "Element kategorii"));
    }
    static validateTotalQuantity(quantity) {
        Validator.validateNumber(quantity, "Ilość produktów");
    }
    static validateDiscountOnCart(discountOnCart = 0) {
        Validator.validateNumber(discountOnCart, "Zniżka na koszyk");
        if (discountOnCart > 100) {
            throw new Error("Zniżka na koszyk nie może przekraczać 100");
        }
    }
    static validatePercentageDiscount(discountPercentage) {
        Validator.validateNumber(discountPercentage, "Procent zniżki");
        if (discountPercentage > 100) {
            throw new Error("Procent zniżki nie może przekraczać 100");
        }
    }
    static validateItemList(itemList) {
        Validator.validateArray(itemList, "Lista przedmiotów");
        itemList.forEach((item) => Validator.validateItemInstance(item));
    }
    static validateItemInstance(item) {
        Validator.validateInstance(item, Item_1.CartItem, "Element");
    }
    static validateDiscountInstance(discount) {
        Validator.validateInstance(discount, Discount_1.Discount, "Zniżka");
    }
    static validateID(id) {
        Validator.validateString(id, "ID");
    }
}
exports.Validator = Validator;
