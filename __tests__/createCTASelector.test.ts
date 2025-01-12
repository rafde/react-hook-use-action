import { act, renderHook, } from '@testing-library/react';
import { createCTASelector, } from '../src';
import { CustomCTAHistory, } from '../src/types/CustomCTAHistory';

describe( 'createCTASelector', () => {
	const initial = {
		count: 0,
		message: 'initial',
	};
	const afterActionChange = jest.fn( () => {}, );
	const compare = jest.fn( ( a, b, { cmp, }, ) => cmp( a, b, ), );
	const transform = jest.fn( payload => payload, );
	const actions = {
		increment: jest.fn( ( { current, }: CustomCTAHistory<typeof initial>, ) => ( { count: current.count + 1, } ), ),
	};
	const getters = jest.fn(
		dispatch => ( {
			doubleCount: () => dispatch.history.current.count * 2,
		} ),
	);
	let useTestSelector = createCTASelector(
		{
			initial: {
				count: 0,
				message: 'initial',
			},
			actions,
			afterActionChange,
			compare,
			transform,
		},
		getters,
	);

	afterEach( () => {
		useTestSelector = createCTASelector(
			{
				initial,
				actions,
				afterActionChange,
				compare,
				transform,
			},
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
			func,
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
			func,
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
		expect( actions.increment, ).toHaveBeenCalledTimes( 1, );

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

		expect( result1.current, ).toStrictEqual( initial, );
	}, );

	test( 'should handle getters correctly', () => {
		const { result, } = renderHook( () => useTestSelector( ( { dispatch, }, ) => dispatch.cta, ), );

		act( () => {
			result.current.increment();
		}, );

		const { result: result1, } = renderHook( () => useTestSelector( ( { func, }, ) => func.doubleCount(), ), );
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

		expect( result1.current, ).toEqual( initial, );
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
