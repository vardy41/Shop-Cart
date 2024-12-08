"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
class CartItem {
    constructor(name = "", category = [], price = 0, percentageDiscount = 0, quantity = 1, uuid = "", totalPrice = 0) {
        this.name = name;
        this.category = category;
        this.originalPrice = price;
        this.price = price;
        this.percentageDiscount = percentageDiscount;
        this.quantity = quantity;
        this.uuid = uuid;
        this.totalPrice = totalPrice;
        this.updatePriceAfterDiscount();
        this.updateTotalPrice();
    }
    updatePriceAfterDiscount() {
        this.price = this.originalPrice * (1 - this.percentageDiscount / 100);
    }
    updateTotalPrice() {
        this.totalPrice = this.price * this.quantity;
    }
    setQuantity(newQuantity) {
        this.quantity = newQuantity;
        this.updateTotalPrice();
    }
    changePrice(newPrice) {
        this.originalPrice = newPrice;
        this.updatePriceAfterDiscount();
        this.updateTotalPrice();
    }
}
exports.CartItem = CartItem;
