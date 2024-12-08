import { v4 as uuidv4 } from "uuid";
import { Validator } from "../Validators";
import {
	IProduct,
	ProductBasicProperties,
	AvailableKeysToModify,
} from "../types";
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MAX_CATEGORIES = 5;
const MAX_PRICE = 1000000;

export class Product implements IProduct {
	readonly id: string;
	name: string;
	category: string[];
	price: number;

	updatedAt: Date;
	onUpdateCallbacks: (() => void)[] = [];

	constructor(props: ProductBasicProperties) {
		Validator.checkIfProductIsValid(props);
		const { name, category, price } = props;

		const currentTime = new Date();

		this.id = uuidv4();
		this.name = name;
		this.category = category;
		this.price = price;

		this.updatedAt = currentTime;
	}

	updateValue<K extends AvailableKeysToModify & keyof this>(
		key: K,
		value: this[K]
	) {
		try {
			const isString = typeof value === "string";
			const isStringType = isString && value.trim().length > 0;
			const isNumberType =
				typeof value === "number" && !isNaN(value) && value > 0;
			const isArrayType =
				Array.isArray(value) &&
				value.every(
					(category) =>
						typeof category === "string" && category.trim().length > 0
				);

			if (isString) {
				const forbiddenFormats = {
					barcode: /^\d{8,13}$/,
					postalCode: /^\d{2}-\d{3}$/,
					phone: /^\d{9}$/,
					url: /https?:\/\/[^\s]+/,
				};

				const hasValidFormat = !Object.values(forbiddenFormats).some((regex) =>
					regex.test(value)
				);
				if (!hasValidFormat) {
					throw new Error(
						"Wartość nie może być kodem kreskowym, kodem pocztowym, numerem telefonu ani adresem URL"
					);
				}
			}

			if (key === "name") {
				try {
					const hasValidNameLength =
						isStringType && value.trim().length >= MIN_NAME_LENGTH;
					const isNameInLengthLimit =
						typeof value === "string" && value.length <= MAX_NAME_LENGTH;

					if (!hasValidNameLength) {
						throw new Error(
							`Nazwa musi być niepustym ciągiem znaków o długości min. ${MIN_NAME_LENGTH} znaki`
						);
					}
					if (!isNameInLengthLimit) {
						throw new Error(
							`Nazwa nie może być dłuższa niż ${MAX_NAME_LENGTH} znaków`
						);
					}
					this.name = value;
					for (const callback of this.onUpdateCallbacks) {
						callback();
					}
				} catch (err) {
					const error = err as Error;
					throw new Error(`Błąd podczas aktualizacji nazwy: ${error.message}`);
				}
			}

			if (key === "category") {
				try {
					const isValidCategoryArray = isArrayType;
					const isCategoryCountValid =
						Array.isArray(value) && value.length <= MAX_CATEGORIES;

					if (!isValidCategoryArray) {
						throw new Error(
							"Kategoria musi być tablicą niepustych ciągów znaków"
						);
					}
					if (!isCategoryCountValid) {
						throw new Error(`Maksymalna liczba kategorii to ${MAX_CATEGORIES}`);
					}
					this.category = value;
				} catch (err) {
					const error = err as Error;
					throw new Error(
						`Błąd podczas aktualizacji kategorii: ${error.message}`
					);
				}
			}

			if (key === "price") {
				try {
					const isStringPrice = typeof value === "string";
					const parsedPrice = isStringPrice
						? parseFloat(value as string)
						: (value as number);

					const isValidPrice = !isNaN(parsedPrice);
					if (!isValidPrice) {
						throw new Error("Nieprawidłowy format ceny");
					}

					if (parsedPrice < 0) {
						throw new Error("Cena nie może być null.");
					}
					if (!isNumberType) {
						throw new Error("Cena musi byc typem number");
					}
					const decimalPlaces = (parsedPrice.toString().split(".")[1] || "")
						.length;
					const hasValidDecimals = decimalPlaces <= 2;
					const isPriceInRange = parsedPrice >= 0.01;

					if (!hasValidDecimals) {
						throw new Error(
							"Cena może mieć maksymalnie dwa miejsca po przecinku"
						);
					}
					if (!isPriceInRange) {
						throw new Error("Cena musi być większa niż 0.01");
					}
					this.price = parsedPrice;
				} catch (err) {
					const error = err as Error;
					throw new Error(`Błąd podczas aktualizacji ceny: ${error.message}`);
				}
			}
		} catch (err) {
			const error = err as Error;
			throw new Error(`Błąd podczas aktualizacji produktu: ${error.message}`);
		}
	}
	registerUpdateCallback(callback: () => void) {
		this.onUpdateCallbacks.push(callback);
	}
}
