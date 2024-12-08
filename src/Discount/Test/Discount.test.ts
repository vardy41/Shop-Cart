import { Discount } from "..";
import { IDiscount, DiscountBasicProperties } from "../../types";

describe("Checking if Discount class", () => {
	let discountProps: DiscountBasicProperties;

	beforeEach(() => {
		discountProps = {
			name: "Black Friday",
			code: "BF2023",
			discountPercentage: 20,
		};
	});

	test("creates a Discount object with valid properties: 'Black Friday' name, 'BF2023' code, and 20% discount percentage", () => {
		const discount = new Discount(discountProps);
		expect(discount.name).toBe("Black Friday");
		expect(discount.code).toBe("BF2023");
		expect(discount.discountPercentage).toBe(20);
		expect(discount.id).toBeDefined();
	});

	test("creates a Discount object with a discount percentage of 0 without throwing an error", () => {
		const discount = new Discount({
			...discountProps,
			name: "Free Shipping",
			code: "FREESHIP2023",
			discountPercentage: 0,
		});
		expect(discount.discountPercentage).toBe(0);
	});

	test("generates a unique ID for each Discount, verifying that 'Summer Sale' and 'Winter Sale' have different IDs", () => {
		const discount1 = new Discount(discountProps);
		const discount2 = new Discount({
			...discountProps,
			name: "Winter Sale",
			code: "WINTER2023",
			discountPercentage: 25,
		});
		expect(discount1.id).not.toBe(discount2.id);
	});

	test("assigns the correct name to the Discount: 'Holiday Discount'", () => {
		const discount = new Discount({
			...discountProps,
			name: "Holiday Discount",
			code: "HOLIDAY2023",
			discountPercentage: 10,
		});
		expect(discount.name).toBe("Holiday Discount");
	});

	test("assigns the correct code to the Discount: 'NY2023'", () => {
		const discount = new Discount({
			...discountProps,
			name: "New Year Sale",
			code: "NY2023",
			discountPercentage: 30,
		});
		expect(discount.code).toBe("NY2023");
	});

	test("assigns the correct discount percentage to the Discount: 5%", () => {
		const discount = new Discount({
			...discountProps,
			name: "Spring Discount",
			code: "SPRING2023",
			discountPercentage: 5,
		});
		expect(discount.discountPercentage).toBe(5);
	});

	test("throws an error if the name is missing when creating a Discount, even if other fields are valid", () => {
		expect(() => {
			new Discount({
				...discountProps,
				name: "",
				code: "EMPTYNAME2023",
				discountPercentage: 10,
			});
		}).toThrow();
	});

	test("throws an error if the code is missing when creating a Discount, even if other fields are valid", () => {
		expect(() => {
			new Discount({
				...discountProps,
				name: "No Code",
				code: "",
				discountPercentage: 10,
			});
		}).toThrow();
	});

	test("throws an error if the discount percentage is negative: -10%", () => {
		expect(() => {
			new Discount({
				...discountProps,
				name: "Negative Discount",
				code: "NEGATIVE2023",
				discountPercentage: -10,
			});
		}).toThrow();
	});

	test("throws an error if the discount percentage exceeds 100: 150%", () => {
		expect(() => {
			new Discount({
				...discountProps,
				name: "Too High Discount",
				code: "TOOHIGH2023",
				discountPercentage: 150,
			});
		}).toThrow();
	});
});
