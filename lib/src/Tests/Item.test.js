"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("../Cart/Item");
const Discount_1 = require("../Discount");
describe("Checking if CartItem functions correctly", () => {
    let item;
    const discount = new Discount_1.Discount({
        name: "10% off",
        label: "10OFF",
        discountPercentage: 10,
    });
    beforeEach(() => {
        item = new Item_1.CartItem({
            name: "Item1",
            category: ["Category1"],
            originalPrice: 100,
            price: 100,
            percentageDiscount: 0,
            quantity: 1,
        });
    });
    test("updatePrice updates the price based on discount", () => {
        item.addDiscount(discount);
        expect(item.price).toBe(90); // 100 - 10% of 100
    });
    test("setQuantity updates the quantity", () => {
        item.setQuantity(5);
        expect(item.quantity).toBe(5);
    });
    test("get totalPrice calculates total price correctly", () => {
        item.setQuantity(3);
        expect(item.totalPrice).toBe(300); // 100 * 3
    });
});
