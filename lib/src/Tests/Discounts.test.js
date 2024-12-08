"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discounts_1 = require("../Discounts");
describe("Checking if Discounts functions correctly", () => {
    let discounts;
    const discountProps = {
        name: "10% off",
        label: "10OFF",
        discountPercentage: 10,
    };
    beforeEach(() => {
        discounts = new Discounts_1.Discounts();
    });
    test("addDiscount adds a new discount", () => {
        discounts.addDiscount(discountProps);
        expect(discounts.getDiscountByLabel("10OFF")).toBeTruthy();
    });
    test("addDiscount throws an error if label already exists", () => {
        discounts.addDiscount(discountProps);
        expect(() => discounts.addDiscount(discountProps)).toThrow("Zniżka o tym labelu już istnieje.");
    });
    test("getDiscountByLabel retrieves a discount by label", () => {
        discounts.addDiscount(discountProps);
        const discount = discounts.getDiscountByLabel("10OFF");
        expect(discount).toBeTruthy();
        expect(discount.discountPercentage).toBe(10);
    });
    test("getDiscountByLabel throws an error if label does not exist", () => {
        expect(() => discounts.getDiscountByLabel("NonExistentLabel")).toThrow("Nie znaleziono zniżki o podanym labelu.");
    });
});
