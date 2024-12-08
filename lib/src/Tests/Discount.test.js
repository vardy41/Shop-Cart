"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discount_1 = require("../Discount");
describe("Checking if Discount functions correctly", () => {
    let discount;
    beforeEach(() => {
        discount = new Discount_1.Discount({
            name: "10% off",
            label: "10OFF",
            discountPercentage: 10,
        });
    });
    test("Discount is created with correct properties", () => {
        expect(discount.name).toBe("10% off");
        expect(discount.label).toBe("10OFF");
        expect(discount.discountPercentage).toBe(10);
    });
});
