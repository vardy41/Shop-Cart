"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CartItemClass_1 = require("./CartItemClass");
const CartClass_1 = require("./CartClass");
const myCart = new CartClass_1.Cart();
myCart.addItem(new CartItemClass_1.CartItem("Laptop", ["Elektronika"], 1000, 0, 1));
myCart.addItem(new CartItemClass_1.CartItem("Telewizor", ["Elektronika"], 1000, 10, 1, "id"));
console.log("Initial cart:", myCart);
myCart.changeItemQuantity("Laptop", 1);
console.log("Cart after changing quantity:", myCart);
console.log("Total value of the cart:", myCart.cartSummary());
// Przykładowe użycie kodu rabatowego
myCart.applyDiscountCode("SAVE10"); // Ustawia rabat na koszyk 10%
console.log("Cart after applying SAVE10 code:", myCart);
console.log("Total value of the cart after SAVE10 code:", myCart.cartSummary());
// Przykładowe użycie kodu rabatowego z błędnym kodem
myCart.applyDiscountCode("INVALIDCODE"); // Ustawia rabat na koszyk 0%
console.log("Cart after applying INVALIDCODE:", myCart);
console.log("Total value of the cart after INVALIDCODE:", myCart.cartSummary());
