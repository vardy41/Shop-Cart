import { Cart } from "./Cart";
import { CartItem } from "./Cart/Item";
import { Discount } from "./Discount";
import { Product } from "./Product";
import { Discounts } from "./Discounts";

const product1 = new Product({
	name: "Iphone 15 Pro",
	category: ["Elektronika"],
	price: 3000,
});

const product2 = new Product({
	name: "Samsung Galaxy S23",
	category: ["Elektronika"],
	price: 2800,
});

const discounts = new Discounts();
const discount1 = new Discount({
	name: "SUMMER10",
	code: "SM10",
	discountPercentage: 10,
});
const discount2 = new Discount({
	name: "WINTER20",
	code: "WM20",
	discountPercentage: 20,
});
discounts.addDiscount(discount1);
discounts.addDiscount(discount2);

const cart = new Cart({
	itemList: [],
	discountOnCart: 0,
	discounts: discounts,
});

const cartItem1 = new CartItem({
	product: product1,
	quantity: 1,
});
const cartItem2 = new CartItem({
	product: product2,
	quantity: 2,
});

cart.addItem(cartItem1);
cart.addItem(cartItem1);
cart.addItem(cartItem2);

cart.addDiscount("SM10");

product1.updateValue("name", "Iphone 15 Pro MaxXDDDDD");
product1.updateValue("price", 3500);
product1.updateValue("category", ["Home"]);

// cart.changeItemQuantity(cartItem1.id, 3);

// cart.removeItem(cartItem2.id);

// cartItem1.setQuantity(6);
// cartItem1.increment();
// cartItem1.setQuantity(1);
// cartItem1.setQuantity(-);
// cartItem1.setQuantity(2);

console.log("\nUpdated Product:");
// console.log(product1);
// console.log(cartItem1);
console.log(cart);
