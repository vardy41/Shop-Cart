"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const Cart_1 = require("./Cart");
const Item_1 = require("./Cart/Item");
const Discount_1 = require("./Discount");
const Product_1 = require("./Product");
const Discounts_1 = require("./Discounts");
// Create products
const product1 = new Product_1.Product({
    name: "Iphone 15 Pro",
    category: ["Elektronika"],
    price: 3000,
});
const product2 = new Product_1.Product({
    name: "Samsung Galaxy S23",
    category: ["Elektronika"],
    price: 2800,
});
// Create discounts
const discounts = new Discounts_1.Discounts();
const discount1 = new Discount_1.Discount({
    name: "SUMMER10",
    label: "SM10",
    discountPercentage: 15,
});
const discount2 = new Discount_1.Discount({
    name: "WINTER20",
    label: "WM20",
    discountPercentage: 20,
});
discounts.addDiscount(discount1);
discounts.addDiscount(discount2);
const cart = new Cart_1.Cart({
    itemList: [],
    discountOnCart: 0,
    discounts: discounts,
});
const cartItem1 = new Item_1.CartItem({
    product: product1,
    quantity: 1,
});
const cartItem2 = new Item_1.CartItem({
    product: product2,
    quantity: 2,
});
cart.addItem(cartItem1);
cart.addItem(cartItem2);
cart.addDiscount("SM10");
// Update product values
product1.updateValue("name", "Iphone 15 Pro Max");
product1.updateValue("price", 3500);
// Change quantity of a cart item
cart.changeItemQuantity(cartItem1, 2); // Change quantity of cartItem1 to 2
// Remove an item from the cart
cart.removeItem(cartItem2.id);
// Set a new quantity for cartItem1
cartItem1.setQuantity(3); // Set quantity to 3
// Log the cart and product details
console.log("Cart Summary:");
console.log("Total Value: ", cart.totalValue);
console.log("Total Sale Value: ", cart.totalSaleValue);
console.log("Total Regular Price: ", cart.totalRegularPrice);
console.log("Items in Cart: ", cart.itemList);
console.log("\nUpdated Product:");
console.log(product1);
console.log(cart);
