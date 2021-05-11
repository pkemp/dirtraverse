module.exports = {
	parser: "@typescript-eslint/parser", // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: "module" // Allows for the use of imports
	},
	extends: [
		"plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		"prettier"
	],
	rules: {
		"@typescript-eslint/naming-convention": [
			"error",
			{ "selector": "default", "format": ["camelCase"] },
			{ "selector": "variable", "format": ["camelCase", "UPPER_CASE"] },
			{ "selector": "parameter", "format": ["camelCase"], "leadingUnderscore": "allow" },
			{ "selector": "memberLike", "modifiers": ["private"], "format": ["camelCase"], "leadingUnderscore": "require" },
			{ "selector": "typeLike", "format": ["PascalCase"] }
		],
		"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
	}
};