import { Product } from "..";
import { v4 as uuidv4 } from "uuid";
import { IProduct, ProductBasicProperties } from "../../types";

describe("Checking if Product Class", () => {
	let productProps: ProductBasicProperties;

	beforeEach(() => {
		productProps = {
			name: "Product 1",
			category: ["Electronics"],
			price: 10.99,
		};
	});

	test("creates a new product with valid properties: name 'Product 1', category ['Electronics'], price 10.99", () => {
		const product = new Product(productProps);

		expect(product.name).toBe("Product 1");
		expect(product.category).toEqual(["Electronics"]);
		expect(product.price).toBe(10.99);
		expect(product.id).toBeDefined();
	});

	test("correctly updates the product name to 'Updated Product 1'", () => {
		const product = new Product(productProps);
		product.updateValue("name", "Updated Product 1");
		expect(product.name).toBe("Updated Product 1");
	});

	test("correctly updates the product price to 12.99", () => {
		const product = new Product(productProps);
		product.updateValue("price", 12.99);
		expect(product.price).toBe(12.99);
	});

	test("correctly updates the product category to ['Home Appliances'] from ['Home Aplciances', 'qwe']", () => {
		const product = new Product(productProps);
		product.updateValue("category", ["Home Appliances"]);
		expect(product.category).toEqual(["Home Appliances"]);
	});

	test("registers a callback function and calls it after updating the product name on New Name", () => {
		const product = new Product(productProps);
		const callback = jest.fn();

		product.registerUpdateCallback(callback);
		product.updateValue("name", "New Name");

		expect(callback).toHaveBeenCalled();
	});

	test("does not change the product price if the passed value is the same as the previous one: 10.99", () => {
		const product = new Product(productProps);
		product.updateValue("price", 10.99);
		expect(product.price).toBe(10.99);
	});

	test("ensures the product category is an array type", () => {
		const product = new Product(productProps);
		expect(Array.isArray(product.category)).toBe(true);
	});

	test("generates a unique ID for each product", () => {
		const product1 = new Product(productProps);
		const productProps2 = {
			...productProps,
			name: "Product 2",
			category: ["Home Appliances"],
			price: 15.99,
		};
		const product2 = new Product(productProps2);

		expect(product1.id).not.toBe(product2.id);
	});

	test("ensures the product price is of type number", () => {
		const product = new Product(productProps);
		expect(typeof product.price).toBe("number");
	});

	test("throws an error when trying to set a negative price: -5", () => {
		const product = new Product(productProps);

		expect(() => product.updateValue("price", -5)).toThrow(
			"Cena nie może być null."
		);
	});

	test("throws an error when setting a product name shorter than allowed: 'ab'", () => {
		const product = new Product(productProps);

		expect(() => product.updateValue("name", "ab")).toThrow(
			"Nazwa musi być niepustym ciągiem znaków"
		);
	});
});
