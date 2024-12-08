import { v4 as uuidv4 } from "uuid";
import { DiscountBasicProperties, IDiscount } from "../types";
import { Validator } from "../Validators";

export class Discount implements IDiscount {
	readonly id: string;
	name: string;
	code: string;
	discountPercentage: number;

	constructor({ name, code, discountPercentage }: DiscountBasicProperties) {
		Validator.checkIfDiscountIsValid({
			name,
			code,
			discountPercentage,
		});

		this.id = uuidv4();
		this.name = name;
		this.code = code;
		this.discountPercentage = discountPercentage;
	}
}
