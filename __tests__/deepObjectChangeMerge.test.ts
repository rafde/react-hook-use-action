import compareCallback from '../src/internal/compareCallback';
import { describe, test, expect, } from 'vitest';
import deepObjectChangeMerge from '../src/internal/deepObjectChangeMerge';

const compare = compareCallback();
describe( 'deepObjectChangeMerge', () => {
	test( 'returns undefined when no changes', () => {
		const target = { name: 'John',
			age: 25, };
		const source = { name: 'John',
			age: 25, };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toBeUndefined();
	}, );

	test( 'merges shallow changes', () => {
		const target = { name: 'John',
			age: 25, };
		const source = { age: 30, };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toStrictEqual( { name: 'John',
			age: 30, }, );
	}, );

	test( 'merges nested changes', () => {
		const target = { user: { name: 'John',
			settings: { theme: 'light', }, }, };
		const source = { user: { settings: { theme: 'dark', }, }, };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toStrictEqual( {
			user: { name: 'John',
				settings: source.user.settings, },
		}, );
	}, );

	test( 'merge when there is one change', () => {
		const target = { user: { name: 'John',
			settings: { theme: 'dark', }, }, };
		const source = { user: { name: 'Jon',
			settings: { theme: 'dark', }, }, };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toStrictEqual( {
			user: {
				...source.user,
				settings: source.user.settings,
			},
		}, );
	}, );

	test( 'returns undefined for identical nested structures', () => {
		const target = { user: { name: 'John',
			settings: { theme: 'dark', }, }, };
		const source = { user: { name: 'John',
			settings: { theme: 'dark', }, }, };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toBeUndefined();
	}, );

	test( 'handles arrays with the same values', () => {
		const target = { items: [1, 2, 3,], };
		const source = { items: [1, 2, 3,], };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toBeUndefined();
	}, );

	test( 'handles arrays of same length', () => {
		const target = { items: [1, 2, 3,], };
		const source = { items: [1, 2, 4,], };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toStrictEqual( { items: [1, 2, 4,], }, );
	}, );

	test( 'handles target array shorter than source', () => {
		const target = { items: [1,], };
		const source = { items: [2, 2, 4,], };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toStrictEqual( { items: [2, 2, 4,], }, );
	}, );

	test( 'handles target array longer than source', () => {
		const target = { items: [1, 7, 8, 9,], };
		const source = { items: [2, 2,], };
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toStrictEqual( { items: [2, 2, 8, 9,], }, );
	}, );

	test( 'handles complex nested structures with mixed types', () => {
		const target = {
			user: {
				profile: {
					name: 'John',
					contacts: [
						{ type: 'email',
							value: 'john@example.com', },
						{ type: 'phone',
							value: '123-456-7890', },
					],
					settings: {
						notifications: {
							email: true,
							push: false,
							frequency: {
								daily: 3,
								weekly: 10,
							},
						},
						theme: {
							mode: 'light',
							colors: {
								primary: '#000',
								secondary: '#fff',
							},
						},
					},
				},
				metadata: {
					lastLogin: new Date( '2023-01-01', ),
					visits: 42,
					preferences: new Set( ['music',], ),
				},
			},
		};

		const source = {
			user: {
				profile: {
					contacts: [
						{ type: 'email',
							value: 'john.doe@example.com', },
					],
					settings: {
						notifications: {
							push: true,
							frequency: {
								daily: 5,
							},
						},
						theme: {
							colors: {
								primary: '#111',
							},
						},
					},
				},
				metadata: {
					lastLogin: new Date( '2023-04-01', ),
					visits: 43,
					preferences: new Set( ['music', 'sports',], ),
				},
			},
		};

		const expected = {
			user: {
				metadata: {
					lastLogin: new Date( '2023-04-01', ),
					visits: 43,
					preferences: new Set( ['music', 'sports',], ),
				},
				profile: {
					name: 'John',
					contacts: [
						{ type: 'email',
							value: 'john.doe@example.com', },
						{ type: 'phone',
							value: '123-456-7890', },
					],
					settings: {
						notifications: {
							email: true,
							push: true,
							frequency: {
								daily: 5,
								weekly: 10,
							},
						},
						theme: {
							mode: 'light',
							colors: {
								primary: '#111',
								secondary: '#fff',
							},
						},
					},
				},
			},
		};
		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toStrictEqual( expected, );
	}, );

	test( 'handles edge cases with mixed data types', () => {
		const target = {
			data: {
				buffer: Buffer.from( 'test', ),
				date: new Date( '2023-01-01', ),
				func: () => true,
				map: new Map( [['key', 'value',],], ),
				mixed: [1, 'string', { nested: true, },],
				numbers: [1, 2, [3, 4, { x: 5, },],],
				regex: /test/,
				symbol: Symbol( 'test', ),
			},
		};

		const source = {
			data: {
				date: new Date( '2023-01-02', ),
				map: new Map( [['key', 'newValue',],], ),
				mixed: [1, 'string', { nested: false, },],
				numbers: [1, 2, [3, 4, { x: 6, },],],
				regex: /test/i,
			},
		};

		const result = deepObjectChangeMerge( target, source, compare, );
		expect( result, ).toBeDefined();
		expect( result, ).toHaveProperty( 'data.buffer', target.data.buffer, );
		expect( result, ).toHaveProperty( 'data.date', source.data.date, );
		expect( result, ).toHaveProperty( 'data.func', target.data.func, );
		expect( result, ).toHaveProperty( 'data.map', source.data.map, );
		expect( result, ).toHaveProperty( 'data.mixed', source.data.mixed, );
		expect( result, ).toHaveProperty( 'data.mixed[2]', { nested: false, }, );
		expect( result, ).toHaveProperty( 'data.numbers', source.data.numbers, );
		expect( result, ).toHaveProperty( 'data.numbers[2][2]', { x: 6, }, );
		expect( result, ).toHaveProperty( 'data.regex', source.data.regex, );
		expect( result, ).toHaveProperty( 'data.symbol', target.data.symbol, );
	}, );
}, );
