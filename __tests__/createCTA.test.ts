import { describe, test, vi, expect, } from 'vitest';
import { waitFor, } from '@testing-library/react';
import { createCTA, returnCTAParameter, } from '../src';
import createCTAHistory from '../src/internal/createCTAHistory';
import { CTAHistory, } from '../src/types/CTAHistory';

describe( 'createCTA', () => {
	const initial = {
		count: 0,
		text: 'initial',
		isActive: false,
		2: 'number',
	};

	const props = returnCTAParameter( {
		initial,
		afterActionChange: () => {},
		compare: ( a, b, { cmp, }, ) => cmp( a, b, ),
		transform: payload => payload,
		onInit: initial => initial,
	}, );

	const afterActionChange = vi.spyOn( props, 'afterActionChange', );
	const compare = vi.spyOn( props, 'compare', );
	const transform = vi.spyOn( props, 'transform', );
	const onInit = vi.spyOn( props, 'onInit', );

	test( 'should initialize with correct default state', async() => {
		const [state,] = createCTA( {
			...props,
			actions: {},
		}, );

		expect( state, ).toEqual( createCTAHistory( { initial, }, ), );

		expect( compare, ).not.toHaveBeenCalled();
		expect( transform, ).not.toHaveBeenCalled();
		expect( onInit, ).not.toHaveBeenCalled();

		await waitFor( async() => {
			expect( afterActionChange, ).not.toHaveBeenCalled();
		}, );
	}, );

	test( 'should initialize with history equal to dispatch.history', () => {
		const [
			state,
			dispatch,
		] = createCTA( {
			initial,
			actions: {},
		}, );

		expect( state, ).toEqual( dispatch.history, );
	}, );

	test( 'should handle update action', async() => {
		const [, dispatch,] = createCTA( props, );
		const count = 1;
		const newState = dispatch.cta.update( { count, }, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { count, }, );

		expect( compare, ).toHaveBeenCalled();
		expect( transform, ).toHaveBeenCalledTimes( 1, );
		expect( onInit, ).not.toHaveBeenCalled();

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		}, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledWith( dispatch.history, 'update', undefined, );
		}, );
	}, );

	test( 'should handle update(string, value) action', () => {
		const [, dispatch,] = createCTA( { initial, }, );
		const count = 1;
		const newState = dispatch.cta.update( 'count', count, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { count, }, );
	}, );

	test( 'should handle update(number, value) action', () => {
		const [, dispatch,] = createCTA( { initial, }, );
		const val = 'count';
		const newState = dispatch.cta.update( 2, val, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			2: val,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( { 2: val, }, );
	}, );

	test( 'should handle reset action', () => {
		const [, dispatch,] = createCTA( { initial, }, );
		const count = 1;
		dispatch.cta.update( { count, }, );
		const resetState = dispatch.cta.reset();

		expect( resetState, ).toStrictEqual( dispatch.history, );
		expect( resetState.current, ).toStrictEqual( initial, );
		expect( resetState.previous, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( resetState.initial, ).toStrictEqual( initial, );
		expect( resetState.previousInitial, ).toBeNull( );
		expect( resetState.changes, ).toBeNull( );
	}, );

	test( 'should handle custom actions', async() => {
		const customProps = {
			...props,
			actions: {
				increment( ctaParam: CTAHistory<typeof props.initial>, ) {
					const { current, } = ctaParam;
					return {
						count: current.count + 1,
					};
				},
			},
		};
		const [history, dispatch,] = createCTA( customProps, );
		const newState = dispatch.cta.increment();

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			count: history.current.count + 1,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( {
			count: history.current.count + 1,
		}, );

		expect( compare, ).toHaveBeenCalled();
		expect( transform, ).toHaveBeenCalledTimes( 1, );
		expect( onInit, ).not.toHaveBeenCalled();

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		}, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledWith( dispatch.history, 'update', 'increment', );
		}, );
	}, );

	test( 'should handle custom update action', () => {
		const count = 1;
		const text = 'customUpdate';
		const [, dispatch,] = createCTA( {
			initial,
			actions: {
				update( ctaParam, payload, ) {
					return {
						...payload,
						count: ctaParam.current.count + 1,
					};
				},
			},
		}, );

		const newState = dispatch.cta.update( { text, }, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( {
			...initial,
			text,
			count,
		}, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( {
			count,
			text,
		}, );
	}, );

	test( 'should handle updateInitial action', () => {
		const count = 1;
		const [, dispatch,] = createCTA( { initial, }, );

		const newState = dispatch.cta.updateInitial( { count, }, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( initial, );
		expect( newState.previous, ).toBeNull( );
		expect( newState.initial, ).toStrictEqual( {
			...initial,
			count,
		}, );
		expect( newState.previousInitial, ).toEqual( initial, );
		expect( newState.changes, ).toStrictEqual( { count: initial.count, }, );
	}, );

	test( 'should handle replaceInitial action', () => {
		const [, dispatch,] = createCTA( { initial, }, );

		const newInitial = {
			2: 'replaceInitial',
			count: 20,
			isActive: true,
			text: 'new',
		};
		const newState = dispatch.cta.replaceInitial( newInitial, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( initial, );
		expect( newState.previous, ).toBeNull( );
		expect( newState.initial, ).toEqual( newInitial, );
		expect( newState.previousInitial, ).toEqual( initial, );
		expect( newState.changes, ).toStrictEqual( initial, );
	}, );

	test( 'should handle replace action', () => {
		const [, dispatch,] = createCTA( { initial, }, );

		const newInitial = {
			2: 'replace',
			count: 20,
			isActive: true,
			text: 'new',
		};
		const newState = dispatch.cta.replace( newInitial, );

		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.current, ).toStrictEqual( newInitial, );
		expect( newState.previous, ).toStrictEqual( initial, );
		expect( newState.initial, ).toStrictEqual( initial, );
		expect( newState.previousInitial, ).toBeNull( );
		expect( newState.changes, ).toStrictEqual( newInitial, );
	}, );

	test( 'should handle optional parameters', () => {
		const payload = { count: 3, };
		const compare = vi.fn( ( a: unknown, b: unknown, ) => JSON.stringify( a, ) === JSON.stringify( b, ), );
		const afterActionChange = vi.fn( () => {
			// ensure this is called after the action has changed data
		}, );
		const transform = vi.fn( payload => payload, );
		const [, dispatch,] = createCTA( {
			initial,
			compare,
			afterActionChange,
			transform,
		}, );

		const newState = dispatch.cta.update( payload, );
		expect( newState, ).toStrictEqual( dispatch.history, );
		expect( newState.changes, ).toStrictEqual( payload, );
		expect( compare, ).toHaveBeenCalled();
		expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		expect( transform, ).toHaveBeenCalledTimes( 1, );
	}, );
}, );
