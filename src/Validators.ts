import { CartItem } from "./Cart/Item";
import { Discount } from "./Discount";
import {
	CartBasicProperties,
	CartItemBasicProperties,
	ProductBasicProperties,
	DiscountBasicProperties,
	ICartItem,
} from "./types";

export class Validator {
	static checkIfCartIsValid(cart: CartBasicProperties): void {
		const { itemList, discountOnCart } = cart;

		Validator.validateItemList(itemList);
		Validator.validateDiscountOnCart(discountOnCart);
	}

	static checkIfCartItemIsValid(item: CartItemBasicProperties): void {
		const { product, percentageDiscount, quantity } = item;

		Validator.checkIfProductIsValid(product);

		Validator.validatePercentageDiscount(percentageDiscount);
		Validator.validateTotalQuantity(quantity);
	}

	static checkIfProductIsValid(product: ProductBasicProperties): void {
		const { name, category, price } = product;

		Validator.validateString(name, "Nazwa");
		Validator.validateCategory(category);
		Validator.validateNumber(price, "Cena");
	}

	static checkIfDiscountIsValid(discount: DiscountBasicProperties): void {
		const { name, code, discountPercentage } = discount;

		Validator.validateString(name, "Nazwa");
		Validator.validateString(code, "Etykieta");
		Validator.validatePercentageDiscount(discountPercentage);
	}

	static validateString(value: string, fieldName: string): void {
		if (typeof value !== "string") {
			throw new Error(`${fieldName} musi być stringiem`);
		}
		if (value.trim() === "") {
			throw new Error(`${fieldName} nie może być pustym stringiem`);
		}
	}

	static validateInstance(
		value: any,
		instanceType: any,
		fieldName: string
	): void {
		if (!(value instanceof instanceType)) {
			throw new Error(`${fieldName} musi być instancją ${instanceType.name}`);
		}
	}

	static validateArray(value: any[], fieldName: string): void {
		if (!Array.isArray(value)) {
			throw new Error(`${fieldName} musi być tablicą`);
		}
	}

	static validateNumber(value: number, fieldName: string): void {
		if (typeof value !== "number") {
			throw new Error(`${fieldName} musi być typu number`);
		}
		if (Validator.isNaN(value)) {
			throw new Error(`${fieldName} musi być liczbą całkowitą`);
		}
		if (value < 0) {
			throw new Error(`${fieldName} musi być liczbą dodatnią`);
		}
	}

	static isNaN(value: any): boolean {
		return Number.isNaN(value);
	}

	static validateCategory(category: string[]): void {
		Validator.validateArray(category, "Kategoria");
		category.forEach((item) =>
			Validator.validateString(item, "Element kategorii")
		);
	}

	static validateTotalQuantity(quantity: number): void {
		Validator.validateNumber(quantity, "Ilość produktów");
	}

	static validateDiscountOnCart(discountOnCart: number = 0): void {
		Validator.validateNumber(discountOnCart, "Zniżka na koszyk");
		if (discountOnCart > 100) {
			throw new Error("Zniżka na koszyk nie może przekraczać 100");
		}
	}

	static validatePercentageDiscount(discountPercentage: number): void {
		Validator.validateNumber(discountPercentage, "Procent zniżki");
		if (discountPercentage > 100) {
			throw new Error("Procent zniżki nie może przekraczać 100");
		}
	}

	static validateItemList(itemList: ICartItem[]): void {
		Validator.validateArray(itemList, "Lista przedmiotów");
		itemList.forEach((item) => Validator.validateItemInstance(item));
	}

	static validateItemInstance(item: ICartItem): void {
		Validator.validateInstance(item, CartItem, "Element");
	}

	static validateDiscountInstance(discount: Discount): void {
		Validator.validateInstance(discount, Discount, "Zniżka");
	}

	static validateID(id: string): void {
		Validator.validateString(id, "ID");
	}
}
