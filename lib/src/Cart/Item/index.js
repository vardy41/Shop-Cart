"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const uuid_1 = require("uuid");
const Validators_1 = require("../../Validators");
class CartItem {
    constructor({ product, quantity = 1 }) {
        Validators_1.Validator.checkIfProductIsValid(product);
        this.id = (0, uuid_1.v4)();
        this.product = product;
        this.quantity = quantity;
        this.percentageDiscount = 0;
        this.price = product.price;
        this.product.registerUpdateCallback(() => this.updatePrice());
        this.updatePrice();
    }
    updatePrice() {
        const discountedPrice = this.product.price * (1 - this.percentageDiscount / 100);
        const actualPrice = discountedPrice * this.quantity;
        this.price = actualPrice;
    }
    // wlasciwosci - rzeczowniki
    // funkcje - czasowniki
    setQuantity(change) {
        const newQuantity = this.quantity + change;
        if (change > 0) {
            this.quantity += change;
        }
        if (change < 0) {
            newQuantity;
        }
        this.quantity = newQuantity;
        this.updatePrice();
    }
    get totalPrice() {
        return this.price;
    }
}
exports.CartItem = CartItem;
