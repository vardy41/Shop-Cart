"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_1 = require("../Cart");
const Item_1 = require("../Cart/Item");
const Discount_1 = require("../Discount");
describe("Checking if Cart functions correctly", () => {
    let cart;
    let itemList;
    const discount = new Discount_1.Discount({
        name: "10% off",
        label: "10OFF",
        discountPercentage: 10,
    });
    beforeEach(() => {
        itemList = [
            new Item_1.CartItem({
                name: "Item1",
                category: ["Category1"],
                originalPrice: 100,
                price: 100,
                percentageDiscount: 0,
                quantity: 1,
            }),
        ];
        cart = new Cart_1.Cart({ itemList });
    });
    test("addItem adds a new item to the cart", () => {
        const newItem = new Item_1.CartItem({
            name: "Item2",
            category: ["Category2"],
            originalPrice: 50,
            price: 50,
            percentageDiscount: 0,
            quantity: 2,
        });
        cart.addItem(newItem);
        expect(cart.itemList).toContainEqual(newItem);
    });
    test("removeItem removes an item from the cart", () => {
        cart.removeItem("Item1");
        expect(cart.itemList.find((item) => item.name === "Item1")).toBeUndefined();
    });
    test("removeItem throws an error if item is not found", () => {
        expect(() => cart.removeItem("NonExistentItem")).toThrow("Produkt nie znaleziony w koszyku.");
    });
    test("changeItemQuantity updates the quantity of an item", () => {
        const item = cart.itemList[0];
        if (!item) {
            throw new Error("Item not found in cart");
        }
        cart.changeItemQuantity(item, 5);
        expect(item.quantity).toBe(5);
    });
    test("changeItemQuantity throws an error if item is not found", () => {
        const invalidItem = new Item_1.CartItem({
            name: "InvalidItem",
            category: ["InvalidCategory"],
            originalPrice: 10,
            price: 10,
            percentageDiscount: 0,
            quantity: 1,
        });
        expect(() => cart.changeItemQuantity(invalidItem, 5)).toThrow("Produkt nie znaleziony w koszyku.");
    });
    test("addDiscount applies discount to the cart", () => {
        cart.addDiscount(discount);
        expect(cart.discountOnCart).toBe(10);
    });
    test("updateCartSummary calculates total value correctly with discount", () => {
        cart.addDiscount(discount);
        cart.updateCartSummary();
        expect(cart.totalValue).toBe(90); // 100 - 10% of 100
    });
    test("getItemByName retrieves an item by name", () => {
        const item = cart.getItemByName("Item1");
        expect(item).toBe(cart.itemList.find((item) => item.name === "Item1"));
    });
    test("getItemByName throws an error if item is not found", () => {
        expect(() => cart.getItemByName("NonExistentItem")).toThrow("Nie znaleziono produktu o nazwie: NonExistentItem");
    });
});
