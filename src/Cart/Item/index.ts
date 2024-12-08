import { v4 as uuidv4 } from "uuid";
import { ICartItem, CartItemProperties, IProduct } from "../../types";
import { Validator } from "../../Validators";

const MAX_QUANTITY = 99;

export class CartItem implements ICartItem {
	readonly id: string;
	product: IProduct;
	quantity: number;
	percentageDiscount: number;
	priceForOneItem: number;
	private _totalRegularPrice: number;
	private _discountedPrice: number;
	private _totalPrice: number;

	private priceUpdateCallback: Function | null = null;

	constructor({ product, quantity = 1 }: CartItemProperties) {
		Validator.checkIfProductIsValid(product);
		this.id = uuidv4();
		this.product = product;
		this.quantity = quantity;
		this.percentageDiscount = 0;
		this.priceForOneItem = product.price;
		this._totalRegularPrice = this.calculateRegularPrice();
		this._discountedPrice = this.calculateDiscountedPrice();
		this._totalPrice = this.calculateTotalPrice();
	}

	registerPriceUpdateCallback(callback: Function): void {
		this.priceUpdateCallback = callback;
	}

	private calculateRegularPrice(): number {
		const regularPrice = this.product.price * this.quantity;
		return regularPrice;
	}

	private calculateDiscountedPrice(): number {
		const calculatedDiscount = this.percentageDiscount / 100;
		const calculateDiscountedPrice =
			this.calculateRegularPrice() * calculatedDiscount;
		return calculateDiscountedPrice;
	}

	private calculateTotalPrice(): number {
		const calculatedTotalPrice =
			this.calculateRegularPrice() - this.calculateDiscountedPrice();
		return calculatedTotalPrice;
	}

	updatePrice(): void {
		this._totalRegularPrice = this.calculateRegularPrice();
		this._discountedPrice = this.calculateDiscountedPrice();
		this._totalPrice = this.calculateTotalPrice();

		if (this.priceUpdateCallback) {
			this.priceUpdateCallback();
		}
	}

	
	setQuantity(value: number): void {
		const isChangeNumber = typeof value === "number";
		if (!isChangeNumber) {
			throw new Error("Change must be a number type");
		}
		if (Validator.isNaN(value)) {
			throw new Error("Change must be a number type");
		}

		const isValuePositive = value > 0;
		if (!isValuePositive) throw new Error("Ilość nie może być mniejsza lub równa zeru.");

		this.quantity = value;
		this.updatePrice();
	}
	
	increment() {
		const isQuantityMoreThanMax = this.quantity > MAX_QUANTITY;
		
		if (isQuantityMoreThanMax) throw new Error(
			"Maksymalna ilość produktu w koszyku nie może przekroczyć 99"
		)
						
		this.quantity++;
		this.updatePrice();
		return this.quantity
	}
		
		// duzo pozwalasz klientowi :D
	decrement() {
		this.quantity--;
		this.updatePrice();
		
		return this.quantity;
	}

	get totalRegularPrice(): number {
		return this._totalRegularPrice;
	}

	get discountedPrice(): number {
		return this._discountedPrice;
	}

	get totalPrice(): number {
		return this._totalPrice;
	}
}
