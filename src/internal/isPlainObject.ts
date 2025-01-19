export default function isPlainObject( value: unknown, ): value is Record<string, unknown> {
	return value !== null
		&& typeof value === 'object'
		&& Object.getPrototypeOf( value, ) === Object.prototype;
}
