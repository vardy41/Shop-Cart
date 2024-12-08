import { Discount } from "../Discount";
import { IDiscounts } from "../types";

export class Discounts implements IDiscounts {
	discounts: Discount[] = [];

	addDiscount(discount: Discount): void {
		const existingDiscountIndex = this.findDiscountIndexById(
			this.discounts,
			discount.id
		);
		if (existingDiscountIndex !== -1) {
			throw new Error("Zniżka o tym ID już istnieje.");
		}

		const existingDiscountByLabel = this.discounts.find(
			(d) => d.code === discount.code
		);
		if (existingDiscountByLabel) {
			throw new Error("Zniżka o tym labelu już istnieje.");
		}

		this.discounts.push(discount);
	}
	getDiscountByCode(code: string): Discount {
		const discount = this.discounts.find((d) => d.code === code);
		if (!discount) {
			throw new Error("Nie znaleziono zniżki o podanym kodzie.");
		}
		return discount;
	}
	findDiscountIndexById(discountList: Discount[], discountId: string): number {
		return discountList.findIndex((discount) => discount.id === discountId);
	}
}
