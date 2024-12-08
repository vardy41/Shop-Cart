"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../Product");
const Cart_1 = require("../Cart");
describe("Checking if Product functions correctly", () => {
    let product;
    let cart;
    beforeEach(() => {
        product = new Product_1.Product({
            name: "Product1",
            category: ["Category1"],
            price: 100,
            totalQuantity: 10,
        });
        cart = new Cart_1.Cart({ itemList: [] });
    });
    test("addCart adds the product to the cart", () => {
        product.addCart(cart, 2);
        const cartItem = cart.itemList.find((item) => item.name === "Product1");
        expect(cartItem).toBeTruthy();
        expect(cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity).toBe(2);
        expect(product.totalQuantity).toBe(8); // 10 - 2
    });
    test("addCart throws an error if quantity exceeds totalQuantity", () => {
        expect(() => product.addCart(cart, 15)).toThrow("Niewystarczająca ilość produktu na stanie.");
    });
});
