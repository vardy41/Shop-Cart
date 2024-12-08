"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findItemIndexById = exports.calculateTotalPrice = void 0;
function calculateTotalPrice(itemList) {
    if (!itemList || itemList.length === 0) {
        return 0;
    }
    return itemList.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0);
}
exports.calculateTotalPrice = calculateTotalPrice;
function findItemIndexById(itemList, itemId) {
    return itemList.findIndex((item) => item.id === itemId);
}
exports.findItemIndexById = findItemIndexById;
