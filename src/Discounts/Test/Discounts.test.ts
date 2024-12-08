import { Discount } from "../../Discount";
import { Discounts } from "..";
import { IDiscount, DiscountBasicProperties } from "../../types";

describe("Checking if Discounts class", () => {
	let discounts: Discounts;
	let discountProps: DiscountBasicProperties;

	beforeEach(() => {
		discounts = new Discounts();
		discountProps = {
			name: "Spring Discount",
			code: "SPRING2023",
			discountPercentage: 5,
		};
	});

	test("finds the index of a Discount by tests ID", () => {
		const discount = new Discount(discountProps);
		discounts.addDiscount(discount);
		const index = discounts.findDiscountIndexById(
			discounts["discounts"],
			discount.id
		);
		expect(index).toBe(0);
	});

	test("returns -1 when looking for a non-existing Discount ID", () => {
		const index = discounts.findDiscountIndexById(
			discounts["discounts"],
			"NON_EXISTING_ID"
		);
		expect(index).toBe(-1);
	});

	test("can add multiple Discounts and retrieve them", () => {
		const discount1 = new Discount(discountProps);
		const discount2 = new Discount({
			...discountProps,
			name: "Late Bird Discount",
			code: "LATEBIRD2023",
			discountPercentage: 20,
		});
		discounts.addDiscount(discount1);
		discounts.addDiscount(discount2);

		const retrievedDiscount1 = discounts.getDiscountByCode("SPRING2023");
		const retrievedDiscount2 = discounts.getDiscountByCode("LATEBIRD2023");

		expect(retrievedDiscount1).toBe(discount1);
		expect(retrievedDiscount2).toBe(discount2);
	});

	test("maintains the correct number of Discounts after additions", () => {
		const discount1 = new Discount(discountProps);
		const discount2 = new Discount({
			...discountProps,
			name: "Discount 2",
			code: "DISCOUNT2",
			discountPercentage: 20,
		});
		discounts.addDiscount(discount1);
		discounts.addDiscount(discount2);

		expect(discounts["discounts"].length).toBe(2);
	});

	test("retrieves a Discount by its code", () => {
		const discount = new Discount(discountProps);
		discounts.addDiscount(discount);
		const retrievedDiscount = discounts.getDiscountByCode("SPRING2023");
		expect(retrievedDiscount).toBe(discount);
	});

	test("adds a new Discount by label successfully", () => {
		const discount = new Discount(discountProps);
		discounts.addDiscount(discount);
		const retrievedDiscount = discounts.getDiscountByCode("SPRING2023");
		expect(retrievedDiscount).toBe(discount);
	});

	test("throws an error when adding a Discount with an existing ID", () => {
		const discount1 = new Discount(discountProps);
		discounts.addDiscount(discount1);

		expect(() => {
			discounts.addDiscount(discount1);
		}).toThrow(new Error("Zniżka o tym ID już istnieje."));
	});

	test("throws an error when adding a Discount with an existing code", () => {
		const discount1 = new Discount(discountProps);
		discounts.addDiscount(discount1);

		const discount2 = new Discount({
			...discountProps,
			name: "Another Spring Discount",
			discountPercentage: 15,
		});
		expect(() => {
			discounts.addDiscount(discount2);
		}).toThrow(new Error("Zniżka o tym labelu już istnieje."));
	});

	test("throws an error when getting a Discount with a non-existing code", () => {
		expect(() => {
			discounts.getDiscountByCode("NON_EXISTING_CODE");
		}).toThrow(new Error("Nie znaleziono zniżki o podanym kodzie."));
	});
});
