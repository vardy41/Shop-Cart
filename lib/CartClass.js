"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    constructor(itemList = [], discountOnCart = 0, discountCode = "", uuid = "") {
        this.itemList = itemList;
        this.discountOnCart = discountOnCart;
        this.discountCode = discountCode;
        this.totalValue = 0;
        this.uuid = uuid;
        this.updateCartSummary();
    }
    addItem(item) {
        this.itemList.push(item);
        this.updateCartSummary();
    }
    removeItem(itemName) {
        const itemIndex = this.itemList.findIndex((cartItem) => cartItem.name === itemName);
        if (itemIndex !== -1) {
            this.itemList.splice(itemIndex, 1);
            this.updateCartSummary();
        }
    }
    changeItemQuantity(itemName, newQuantity) {
        const item = this.itemList.find((cartItem) => cartItem.name === itemName);
        if (item) {
            item.setQuantity(newQuantity);
            this.updateCartSummary();
        }
    }
    applyDiscountCode(code) {
        const discountCodes = {
            SAVE10: 10,
            SAVE20: 20,
            SAVE30: 30,
        };
        if (discountCodes.hasOwnProperty(code)) {
            this.discountCode = code;
            this.discountOnCart = discountCodes[code];
        }
        else {
            console.log("Invalid discount code.");
            this.discountCode = "";
            this.discountOnCart = 0;
        }
        this.updateCartSummary();
    }
    setCartDiscount(discount) {
        this.discountOnCart = discount;
        this.updateCartSummary();
    }
    updateCartSummary() {
        let total = 0;
        this.itemList.forEach((item) => {
            total += item.totalPrice;
        });
        if (this.discountOnCart > 0) {
            total -= (total * this.discountOnCart) / 100;
        }
        this.totalValue = total;
    }
    cartSummary() {
        return this.totalValue;
    }
}
exports.Cart = Cart;
