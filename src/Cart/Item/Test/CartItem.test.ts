import { CartItem } from "..";
import { IProduct, ProductBasicProperties } from "../../../types";
import { Product } from "../../../Product";
describe("Checking if CartItem class works correctly", () => {
	let productProps: ProductBasicProperties;
	let mockProduct: IProduct;
	let mockCartItem: CartItem;

	beforeEach(() => {
		productProps = {
			name: "Test Product",
			category: ["Electronics"],
			price: 100,
		};

		mockProduct = new Product(productProps);
		mockCartItem = new CartItem({ product: mockProduct, quantity: 1 });
	});

	test("creates a new CartItem instance with the default quantity set to 1", () => {
		const cartItem = mockCartItem;
		expect(cartItem.quantity).toBe(1);
	});

	test("creates a CartItem with a specified quantity of 5 and confirms the quantity", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 5 });
		expect(cartItem.quantity).toBe(5);
	});

	test("calculates the total price of the CartItem correctly with an initial quantity of 1", () => {
		const cartItem = mockCartItem;
		expect(cartItem.totalPrice).toBe(100);
	});

	test("updates the total price correctly when quantity is increased from 1 to 3", () => {
		const cartItem = mockCartItem;
		cartItem.setQuantity(3);
		expect(cartItem.totalPrice).toBe(300);
	});

	test("increases the quantity correctly when setting a positive change, resulting in a total quantity of 3", () => {
		const cartItem = mockCartItem;
		cartItem.setQuantity(3);
		expect(cartItem.quantity).toBe(3);
	});

	test("decreases the quantity correctly when setting a negative change, reducing the quantity from 5 to 2", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 5 });
		cartItem.setQuantity(2);
		expect(cartItem.quantity).toBe(2);
	});

	test("correctly updates quantity when adding and subtracting values", () => {
		const cartItem = mockCartItem;

		cartItem.setQuantity(2);
		expect(cartItem.quantity).toBe(2);

		cartItem.setQuantity(1);
		expect(cartItem.quantity).toBe(1);
	});

	test("applies a discount correctly by setting a percentage of 20% and verifies the discounted price", () => {
		const cartItem = mockCartItem;
		cartItem.percentageDiscount = 20;
		cartItem.updatePrice();
		expect(cartItem.totalPrice).toBe(80);
	});

	test("calculates the total price correctly when no discount is applied, confirming the price remains at 100", () => {
		const cartItem = mockCartItem;
		cartItem.percentageDiscount = 0;
		cartItem.updatePrice();
		expect(cartItem.totalPrice).toBe(100);
	});

	test("calculates the total price correctly for a quantity greater than 1, specifically quantity of 3", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 3 });
		expect(cartItem.totalPrice).toBe(300);
	});

	test("ensures each CartItem has a unique identifier by comparing IDs of two different items", () => {
		const cartItem1 = mockCartItem;
		const cartItem2 = new CartItem({ product: mockProduct, quantity: 1 });
		expect(cartItem1.id).not.toBe(cartItem2.id);
	});

	test("does not change the quantity when setting a change of zero, maintaining the quantity at 5", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 5 });
		cartItem.setQuantity(0);
		expect(cartItem.quantity).toBe(1);
	});

	test("throws an error when attempting to set the quantity to zero or below", () => {
		const cartItem = mockCartItem;
		expect(() => cartItem.setQuantity(-1)).toThrow(
			"Ilość nie może być mniejsza lub równa zeru."
		);
	});

	test("throws an error when quantity is set to a value lower than zero, specifically -2", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 1 });
		expect(() => cartItem.setQuantity(-2)).toThrow(
			"Ilość nie może być mniejsza lub równa zeru."
		);
	});

	test("throws an error when initializing CartItem with an invalid product object", () => {
		expect(
			() => new CartItem({ product: null as unknown as IProduct, quantity: 1 })
		).toThrow();
	});

	test("increments the quantity correctly, ensuring it increases by 1", () => {
		const cartItem = mockCartItem;
		cartItem.increment();
		expect(cartItem.quantity).toBe(2);
	});

	test("throws an error when incrementing quantity beyond the maximum limit of 99", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 99 });
		expect(() => cartItem.increment()).toThrow(
			"Maksymalna ilość produktu w koszyku nie może przekroczyć 99"
		);
	});

	test("decrements the quantity correctly, ensuring it decreases by 1", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 2 });
		cartItem.decrement();
		expect(cartItem.quantity).toBe(1);
	});

	test("throws an error when decrementing quantity below zero", () => {
		const cartItem = new CartItem({ product: mockProduct, quantity: 0 });
		expect(() => cartItem.decrement()).toThrow(
			"Ilośc nie może byc mniejsza niż 0"
		);
	});
});
