"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discount = void 0;
const uuid_1 = require("uuid");
const Validators_1 = require("../Validators");
class Discount {
    constructor({ name, label, discountPercentage }) {
        Validators_1.Validator.checkIfDiscountIsValid({
            name,
            label,
            discountPercentage,
        });
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.label = label;
        this.discountPercentage = discountPercentage;
    }
}
exports.Discount = Discount;
