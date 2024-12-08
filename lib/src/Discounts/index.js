"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discounts = void 0;
class Discounts {
    constructor() {
        this.discounts = [];
    }
    addDiscount(discount) {
        const existingDiscountIndex = this.findDiscountIndexById(this.discounts, discount.id);
        if (existingDiscountIndex !== -1) {
            throw new Error("Zniżka o tym ID już istnieje.");
        }
        const existingDiscountByLabel = this.discounts.find((d) => d.label === discount.label);
        if (existingDiscountByLabel) {
            throw new Error("Zniżka o tym labelu już istnieje.");
        }
        this.discounts.push(discount);
    }
    getDiscountByLabel(label) {
        const discount = this.discounts.find((d) => d.label === label);
        if (!discount) {
            throw new Error("Nie znaleziono zniżki o podanym labelu.");
        }
        return discount;
    }
    findDiscountIndexById(discountList, discountId) {
        return discountList.findIndex((discount) => discount.id === discountId);
    }
}
exports.Discounts = Discounts;
