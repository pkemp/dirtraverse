/* This is added to bypass AVA issue: https://github.com/avajs/ava/issues/2332 TODO: update to AVA 3.x */

declare interface SymbolConstructor {
	readonly observable: symbol;
}
