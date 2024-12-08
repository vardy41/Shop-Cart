
import { CartItem } from "./Item";


export function calculateTotalPrice(itemList: CartItem[]): number {
	if (!itemList || itemList.length === 0) {
		return 0;
	}
	return itemList.reduce(
		(accumulator, currentValue) => accumulator + currentValue.totalPrice,
		0
	);
}
export function findItemIndexById(itemList: CartItem[], itemId: string): number {
    return itemList.findIndex((item) => item.id === itemId);
}