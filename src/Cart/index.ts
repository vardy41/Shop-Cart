import { v4 as uuidv4 } from "uuid";
import { CartItem } from "./Item";
import { CartBasicProperties, CartProperties, ICart, ICartItem, IDiscounts } from "../types";
import { Validator } from "../Validators";
import { Discounts } from "../Discounts";

export class Cart implements ICart {
	readonly id: string;
	itemList: ICartItem[];
	discountOnCart: number;
	discounts: IDiscounts;

	private _totalRegularPrice: number;
	private _discountedPrice: number;
	private _totalPrice: number;

	constructor({
		itemList = [],
		discountOnCart,
		discounts,
	}: CartProperties) {
		Validator.checkIfCartIsValid({ itemList, discountOnCart, discounts });
		this.id = uuidv4();
		this.itemList = itemList;
		this.discountOnCart = discountOnCart;
		this.discounts = discounts;

		this._totalRegularPrice = 0;
		this._discountedPrice = 0;
		this._totalPrice = 0;
	}

	get totalRegularPrice(): number {
		return this._totalRegularPrice;
	}

	get totalSaleValue(): number {
		return this._discountedPrice;
	}

	get totalValue(): number {
		return this._totalPrice;
	}

	updateDiscountsOnItems(): void {
		for (const item of this.itemList) {
			item.percentageDiscount = this.discountOnCart;
			item.updatePrice();
		}

		this.updateCartSummary();
	}
	addItem(item: ICartItem): void {
		const existingItem = this.itemList.find(
			(cartItem) => cartItem.id === item.id
		);

		if (existingItem) {
			existingItem.increment();
		} else {
			this.itemList.push(item);
			item.registerPriceUpdateCallback(() => this.updateCartSummary());
		}

		this.updateCartSummary();
	}

	removeItem(itemId: string): void {
		const isItemIdString = typeof itemId === "string";
		const isItemIdFilledString = itemId.trim().length > 0;
		if (!isItemIdString) {
			throw new Error("Item ID must be a string");
		}
		if (!isItemIdFilledString) {
			throw new Error("Item ID must be a filled string");
		}
		const foundIndex = this.itemList.findIndex((item) => item.id === itemId);
		const isIndexInPositiveRange = foundIndex >= 0;
		if (!isIndexInPositiveRange)
			throw new Error("Produkt nie znaleziony w koszyku");

		this.itemList.splice(foundIndex, 1);

		this.updateCartSummary();

	}

	changeItemQuantity(itemId: string, newQuantity: number): void {
		const isItemIdStringType = typeof itemId === "string";
		if (!isItemIdStringType) {
			throw new Error("Item ID must be a string type");
		}
		const isItemIdFilledString = itemId.trim().length > 0;
		if (!isItemIdFilledString) {
			throw new Error("Item ID must be a filled string");
		}
		const isQuantityMoreThanNull = newQuantity > 0;
		if (!isQuantityMoreThanNull) {
			throw new Error("Quantity must be more than null");
		}
		const isNewQuantityNumberType = typeof newQuantity === "number";
		if (!isNewQuantityNumberType) {
			throw new Error("Quantity must be a number type");
		}

		const potentialItem = this.itemList.find((item) => item.id === itemId);
		if (!potentialItem) throw new Error("Produkt nie znaleziony w koszyku");
		// do zabicia i polamania zeber
		potentialItem.setQuantity(newQuantity);

		this.updateCartSummary();
	}

	addDiscount(code: string): void {
		const isCodeStringType = typeof code === "string";
		if (!isCodeStringType) {
			throw new Error("Code must be a string type");
		}

		const discount = this.discounts.getDiscountByCode(code);
		const isDiscountFound = discount !== undefined && discount !== null
		if (!isDiscountFound) throw new Error("Invalid discount code");

		this.discountOnCart = discount.discountPercentage;
		this.updateDiscountsOnItems();
	}
	
	updateCartSummary(): void {
		const summary = this.itemList.reduce(
			(acc, item) => {
				acc.totalRegularPrice += item.totalRegularPrice;
				acc.discountedPrice += item.discountedPrice;
				acc.totalPrice += item.totalPrice;
				return acc;
			},
			{ totalRegularPrice: 0, discountedPrice: 0, totalPrice: 0 } // wartosc poczatkowa akumulatora
		);

		this._totalRegularPrice = summary.totalRegularPrice;
		this._discountedPrice = summary.discountedPrice;
		this._totalPrice = summary.totalPrice;
	}
}
