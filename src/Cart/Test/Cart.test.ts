import { Cart } from "..";
import { CartItem } from "../Item";
import { Discounts } from "../../Discounts";
import { Discount } from "../../Discount";
import { Product } from "../../Product";
import { ProductBasicProperties, DiscountBasicProperties } from "../../types";

describe("Checking if Cart class", () => {
	let cart: Cart;
	let discounts: Discounts;
	let productProps: ProductBasicProperties;
	let discountProps: DiscountBasicProperties;

	beforeEach(() => {
		discounts = new Discounts();
		cart = new Cart({
			itemList: [],
			discountOnCart: 0,
			discounts: discounts,
		});

		productProps = {
			name: "Test Product",
			category: ["Electronics"],
			price: 100,
		};

		discountProps = {
			name: "New Year Discount",
			code: "NY2023",
			discountPercentage: 10,
		};
	});

	test("changes the quantity of an existing item in the cart and verifies the updated quantity", () => {
		const product = new Product(productProps);
		const item = new CartItem({
			product: product,
			quantity: 1,
		});
		cart.addItem(item);
		cart.changeItemQuantity(item.id, 2);
		expect(item.quantity).toBe(2);
	});

	test("applies a valid discount to the cart, reducing the total value by the discount percentage", () => {
		const discount = new Discount(discountProps);
		discounts.addDiscount(discount);

		const product = new Product(productProps);
		const item = new CartItem({
			product: product,
			quantity: 1,
		});
		cart.addItem(item);

		cart.addDiscount("NY2023");
		expect(cart.discountOnCart).toBe(10);
		expect(cart.totalValue).toBe(90);
	});

	test("calculates the total value of the cart correctly after adding multiple items", () => {
		const product1 = new Product(productProps);
		const product2 = new Product({
			...productProps,
			price: 200,
			category: ["Home"],
		});

		const item1 = new CartItem({
			product: product1,
			quantity: 1,
		});
		const item2 = new CartItem({
			product: product2,
			quantity: 1,
		});

		cart.addItem(item1);
		cart.addItem(item2);

		expect(cart.totalValue).toBe(300);
	});

	test("updates the total value of the cart correctly after removing an item", () => {
		const product1 = new Product(productProps);
		const product2 = new Product({
			...productProps,
			price: 200,
			category: ["Home"],
		});

		const item1 = new CartItem({
			product: product1,
			quantity: 1,
		});
		const item2 = new CartItem({
			product: product2,
			quantity: 1,
		});

		cart.addItem(item1);
		cart.addItem(item2);
		cart.removeItem(item1.id);

		expect(cart.totalValue).toBe(200);
	});

	test("checks if the total value of the cart is zero when there are no items", () => {
		expect(cart.totalValue).toBe(0);
	});

	test("checks if the total value of the cart is calculated correctly after adding an item with a discount", () => {
		const product = new Product(productProps);
		const item = new CartItem({
			product: product,
			quantity: 1,
		});
		cart.addItem(item);

		const discount = new Discount({
			...discountProps,
			name: "Big Sale",
			code: "SALE50",
			discountPercentage: 50,
		});
		discounts.addDiscount(discount);

		cart.addDiscount("SALE50");
		expect(cart.totalValue).toBe(50);
	});

	test("checks if the total value of the cart accounts for a 100% discount", () => {
		const discount = new Discount({
			...discountProps,
			name: "Super Discount",
			code: "SUPER100",
			discountPercentage: 100,
		});
		discounts.addDiscount(discount);

		const product = new Product(productProps);
		const item = new CartItem({
			product: product,
			quantity: 2,
		});
		cart.addItem(item);

		cart.addDiscount("SUPER100");
		expect(cart.totalValue).toBe(0);
	});

	test("throws an error when attempting to remove an item that does not exist in the cart", () => {
		expect(() => {
			cart.removeItem("non-existing-id");
		}).toThrow(new Error("Produkt nie znaleziony w koszyku"));
	});

	test("throws an error when attempting to change the quantity of a non-existing item in the cart", () => {
		expect(() => {
			cart.changeItemQuantity("non-existing-id", 2);
		}).toThrow(new Error("Produkt nie znaleziony w koszyku"));
	});

	test("throws an error when attempting to add an invalid item to the cart", () => {
		const invalidItem: any = {};
		expect(() => {
			cart.addItem(invalidItem);
		}).toThrow();
	});

	test("throws an error when attempting to apply a discount that does not exist", () => {
		expect(() => {
			cart.addDiscount("INVALID_CODE");
		}).toThrow();
	});

	test("adds a new item to the cart and confirms its presence in the itemList", () => {
		const product = new Product(productProps);
		const item = new CartItem({
			product: product,
			quantity: 1,
		});
		cart.addItem(item);
		expect(cart.itemList).toContain(item);
	});

	test("removes an existing item from the cart and confirms its absence in the itemList", () => {
		const product = new Product(productProps);
		const item = new CartItem({
			product: product,
			quantity: 1,
		});
		cart.addItem(item);
		cart.removeItem(item.id);
		expect(cart.itemList).not.toContain(item);
	});

	test("initializes the Cart object with an empty itemList by default", () => {
		expect(cart.itemList).toEqual([]);
	});
});
