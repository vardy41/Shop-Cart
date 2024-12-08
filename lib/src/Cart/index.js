"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const uuid_1 = require("uuid");
const Validators_1 = require("../Validators");
const utils_1 = require("./utils");
class Cart {
    constructor({ itemList = [], discountOnCart, discounts, }) {
        Validators_1.Validator.checkIfCartIsValid({
            itemList,
            discountOnCart,
            discounts,
        });
        this.id = (0, uuid_1.v4)();
        this.itemList = itemList;
        this.discountOnCart = discountOnCart;
        this.discounts = discounts;
        this.totalValue = 0;
        this.totalSaleValue = 0;
        this.totalRegularPrice = 0;
        this.updateDiscountsOnItems();
    }
    updateDiscountsOnItems() {
        for (const item of this.itemList) {
            item.percentageDiscount = this.discountOnCart;
            item.updatePrice();
        }
    }
    addItem(item) {
        Validators_1.Validator.validateItemInstance(item);
        const itemIndex = (0, utils_1.findItemIndexById)(this.itemList, item.id);
        const existingItem = this.itemList[itemIndex];
        if (existingItem) {
            existingItem.setQuantity(existingItem.quantity);
        }
        item.percentageDiscount = this.discountOnCart;
        item.updatePrice();
        this.itemList.push(item);
        this.updateCartSummary();
    }
    removeItem(itemId) {
        Validators_1.Validator.validateString(itemId, "ItemId");
        const itemIndex = (0, utils_1.findItemIndexById)(this.itemList, itemId);
        const isItemIndexValid = itemIndex === -1;
        if (isItemIndexValid)
            throw new Error("Produkt nie znaleziony w koszyku");
        this.itemList.splice(itemIndex, 1);
        this.updateCartSummary();
    }
    changeItemQuantity(item, newQuantity) {
        Validators_1.Validator.validateItemInstance(item);
        Validators_1.Validator.validateTotalQuantity(newQuantity);
        const itemIndex = (0, utils_1.findItemIndexById)(this.itemList, item.id);
        const isItemIndexValid = itemIndex === -1;
        if (isItemIndexValid)
            throw new Error("Produkt nie znaleziony w koszyku");
        const existingItem = this.itemList[itemIndex];
        if (!existingItem) {
            throw new Error("Produkt nie znaleziony w koszyku");
        }
        existingItem.setQuantity(newQuantity);
        this.updateCartSummary();
    }
    addDiscount(code) {
        Validators_1.Validator.validateString(code, "code");
        const discount = this.discounts.getDiscountByLabel(code);
        if (!discount) {
            throw new Error("Nie znaleziono zniżki o podanym kodzie.");
        }
        this.discountOnCart = discount.discountPercentage;
        this.updateDiscountsOnItems();
    }
    updateCartSummary() {
        const totalRegularPrice = this.itemList.reduce((accumulator, currentValue) => accumulator + currentValue.product.price * currentValue.quantity, 0);
        const total = (0, utils_1.calculateTotalPrice)(this.itemList);
        this.totalRegularPrice = totalRegularPrice;
        const totalSaleValue = totalRegularPrice - total;
        this.totalSaleValue = totalSaleValue;
        const discountOnCart = this.discountOnCart;
        if (discountOnCart && discountOnCart > 0) {
            const discountValue = 1 - discountOnCart / 100;
            const actualTotalValue = total * discountValue;
            this.totalValue = actualTotalValue;
        }
        else {
            this.totalValue = total;
        }
    }
}
exports.Cart = Cart;
