import { act, renderHook, } from '@testing-library/react';
import { createCTASelector, returnCTAParameter, } from '../src';
import createCTAHistory from '../src/internal/createCTAHistory';

describe( 'createCTASelector', () => {
	const props = returnCTAParameter( {
		initial: {
			count: 0,
			message: 'initial',
			isTest: true,
		},
		actions: {
			increment: ( { current, }, ) => ( { count: current.count + 1, } ),
		},
		afterActionChange: () => {},
		compare: ( a, b, { cmp, }, ) => cmp( a, b, ),
		transform: payload => payload,
	}, );

	const afterActionChange = jest.spyOn( props, 'afterActionChange', );
	const compare = jest.spyOn( props, 'compare', );
	const transform = jest.spyOn( props, 'transform', );
	// @ts-expect-error TS is picky about the type of this
	const increment = jest.spyOn( props.actions, 'increment', );

	const getters = jest.fn(
		dispatch => ( {
			doubleCount: () => dispatch.history.current.count * 2,
		} ),
	);

	let useTestSelector = createCTASelector(
		props,
		getters,
	);

	afterEach( () => {
		useTestSelector = createCTASelector(
			props,
			getters,
		);
	}, );

	test( 'should create selector with initial state', () => {
		const { result: snapshot, } = renderHook( () => useTestSelector( snapshot => snapshot, ), );
		const {
			changes,
			current,
			dispatch,
			initial,
			previous,
			previousInitial,
		} = snapshot.current;

		expect( current, ).toStrictEqual( initial, );
		const initialHistory = {
			changes,
			current,
			initial,
			previous,
			previousInitial,
		};
		expect( dispatch.history, ).toStrictEqual( initialHistory, );
		expect( useTestSelector.getHistory(), ).toStrictEqual( initialHistory, );
	}, );

	test( 'should useTestSelector without parameters', () => {
		const { result: snapshot, } = renderHook( () => useTestSelector(), );
		const [
			history,
			dispatch,
		] = snapshot.current;

		expect( history, ).toStrictEqual( createCTAHistory( {
			current: props.initial,
		}, ), );
		expect( useTestSelector.dispatch, ).toBe( dispatch, );
	}, );

	test( 'should allow selector to return with specific object', () => {
		const { result: snapshot, } = renderHook( () => useTestSelector( ( { current, }, ) => ( {
			msg: current.message,
			isT: current.isTest,
		} ), ), );

		expect( snapshot.current, ).toStrictEqual( {
			msg: props.initial.message,
			isT: props.initial.isTest,
		}, );

		act( () => {
			useTestSelector.dispatch.cta.update( {
				message: 'updated',
				isTest: false,
			}, );
		}, );

		expect( snapshot.current, ).toStrictEqual( {
			msg: 'updated',
			isT: false,
		}, );
	}, );

	test( 'should should update externally', () => {
		const {
			dispatch,
		} = useTestSelector;
		const {
			current,
			initial,
			previousInitial,
		} = dispatch.history;

		const payload = { count: 10, };
		act( () => {
			dispatch.cta.update( payload, );
		}, );
		const nextHistory = {
			changes: payload,
			current: {
				...current,
				...payload,
			},
			initial,
			previous: current,
			previousInitial,
		};
		expect( dispatch.history, ).toStrictEqual( nextHistory, );
		expect( useTestSelector.getHistory(), ).toStrictEqual( nextHistory, );
	}, );

	test( 'should should update externally and the snapshot should be updated', () => {
		const { result: snapshot, } = renderHook( () => useTestSelector( snapshot => snapshot, ), );
		const {
			current,
			dispatch,
			initial,
			previousInitial,
		} = snapshot.current;

		const payload = { count: 10, };
		act( () => {
			useTestSelector.dispatch.cta.update( payload, );
		}, );
		const nextHistory = {
			changes: payload,
			current: {
				...current,
				...payload,
			},
			initial,
			previous: current,
			previousInitial,
		};
		const nextSnapshot = {
			...nextHistory,
			dispatch,
		};
		expect( snapshot.current, ).toStrictEqual( nextSnapshot, );
		expect( dispatch.history, ).toStrictEqual( nextHistory, );
		expect( useTestSelector.getHistory(), ).toStrictEqual( nextHistory, );
	}, );

	test( 'should update all subscribed selectors', () => {
		const { result: result1, } = renderHook( () => useTestSelector( ( { current, }, ) => current.count, ), );
		const { result, } = renderHook( () => useTestSelector( snapshot => snapshot, ), );
		const {
			dispatch,
		} = result.current;
		const previousHistory = dispatch.history;

		act( () => {
			dispatch.cta.increment();
		}, );
		const actionType = 'update';
		const customAction = 'increment';
		const payload = { count: 1, };
		expect( increment, ).toHaveBeenCalledTimes( 1, );

		expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		expect( afterActionChange, ).toHaveBeenLastCalledWith( dispatch.history, actionType, customAction, );
		expect( afterActionChange, ).toHaveLastReturnedWith( undefined, );

		expect( compare, ).toHaveBeenCalled();

		expect( transform, ).toHaveBeenCalledTimes( 1, );
		expect( transform, ).toHaveBeenLastCalledWith(
			payload,
			{
				...previousHistory,
				actionType,
				customAction,
			},
		);
		expect( transform, ).toHaveReturnedWith( payload, );

		expect( result1.current, ).toBe( 1, );
	}, );

	test( 'should not update all subscribed selectors', () => {
		const { result: result1, } = renderHook( () => useTestSelector( ( { current, }, ) => current, ), );
		const { result, } = renderHook( () => useTestSelector( snapshot => snapshot, ), );
		const {
			dispatch,
		} = result.current;
		const payload = { count: 0, };
		act( () => {
			dispatch.cta.update( payload, );
		}, );

		expect( afterActionChange, ).not.toHaveBeenCalled();
		expect( compare, ).toHaveBeenCalled();

		expect( transform, ).toHaveBeenCalledTimes( 1, );
		expect( transform, ).toHaveBeenCalledTimes( 1, );
		expect( transform, ).toHaveBeenLastCalledWith(
			payload,
			{
				...dispatch.history,
				actionType: 'update',
				customAction: undefined,
			},
		);
		expect( transform, ).toHaveReturnedWith( payload, );

		expect( result1.current, ).toStrictEqual( props.initial, );
	}, );

	test( 'should handle getters correctly', () => {
		const { result, } = renderHook( () => useTestSelector( ( { dispatch, }, ) => dispatch.cta, ), );

		act( () => {
			result.current.increment();
		}, );

		const { result: result1, } = renderHook( () => useTestSelector( ( { dispatch, }, ) => dispatch.func.doubleCount(), ), );
		expect( result1.current, ).toBe( 2, );
	}, );

	test( 'should maintain separate histories for different selectors', () => {
		const initial2 = {
			count: 1,
			message: 'initial',
		};
		const useSelector2 = createCTASelector( {
			initial: initial2,
		}, );

		const { result: result1, } = renderHook( () => useTestSelector( ( { current, }, ) => current, ), );
		const { result: result2, } = renderHook( () => useSelector2( ( { current, }, ) => current, ), );

		expect( result1.current, ).toEqual( props.initial, );
		expect( result2.current, ).toEqual( initial2, );
	}, );

	test( 'should cleanup subscribers on unmount', () => {
		const selector = jest.fn( (
			( ...args ) => args[ 0 ].current
		) as Parameters<typeof useTestSelector>[0], ) as Parameters<typeof useTestSelector>[0];
		const { unmount, } = renderHook( () => useTestSelector( selector, ), );
		unmount();

		const { result, } = renderHook( () => useTestSelector( ( { dispatch, }, ) => dispatch.cta, ), );

		act( () => {
			result.current.increment();
		}, );

		// React.useSyncExternalStore calls selector 3 times on first subscription.
		// @see {@link https://github.com/facebook/react/blob/main/packages/use-sync-external-store/src/useSyncExternalStoreShimClient.js}
		expect( selector, ).toHaveBeenCalledTimes( 3, );
	}, );
}, );
