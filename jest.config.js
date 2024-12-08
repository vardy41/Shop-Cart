/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	preset: "ts-jest", // Użyj preset ts-jest
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": "ts-jest", // Używaj ts-jest dla plików TypeScript
		"^.+\\.jsx?$": "babel-jest", // Używaj babel-jest dla plików JavaScript
	},
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Rozszerzenia plików, które będą rozpoznawane
};
