import { UUID } from "crypto";

// PRODUCT
export type AvailableKeysToModify = keyof Pick<
	IProduct,
	"name" | "price" | "category"
>;
export interface ProductBasicProperties {
	name: string;
	category: string[];
	price: number;
}

export interface ProductMethods {
	updateValue<K extends AvailableKeysToModify>(
		key: K,
		value: IProduct[K]
	): void;

	registerUpdateCallback(callback: () => void): void;
}

export interface IProduct extends ProductBasicProperties, ProductMethods {}

// DISCOUNT / DISCOUNTS
export interface DiscountBasicProperties {
	name: string;
	code: string;
	discountPercentage: number;
}

export interface IDiscount extends DiscountBasicProperties {}

export interface DiscountsMethods {
	addDiscount(discount: IDiscount): void;
	getDiscountByCode(label: string): IDiscount;
}

export interface IDiscounts extends DiscountsMethods {}

// CartItem
export interface CartItemProperties {
	product: IProduct;
	quantity: number;
}

export interface CartItemBasicProperties {
	id: string;
	product: IProduct;
	quantity: number;
	percentageDiscount: number;
}

export interface CartItemMethods {
	updatePrice(): void;
	setQuantity(change: number): void;
	get totalPrice(): number;
	get totalRegularPrice(): number;
	get discountedPrice(): number;
	registerPriceUpdateCallback(callback: () => void): void;
	increment: () => void;
	decrement: () => void;
}

export interface ICartItem extends CartItemBasicProperties, CartItemMethods {}

export interface CartBasicProperties {
	itemList: ICartItem[];
	discountOnCart: number;
	discounts: IDiscounts;
}

export interface CartProperties extends CartBasicProperties {
	discounts: IDiscounts;
}

export interface CartMethods {
	updateDiscountsOnItems(): void;
	addItem(item: ICartItem): void;
	removeItem(itemId: string): void;
	changeItemQuantity(itemId: string, newQuantity: number): void;
	updateCartSummary(): void;
	addDiscount(code: string): void;
}

export interface ICart extends CartBasicProperties, CartMethods {}

export interface Observer {
	update(): void;
}
