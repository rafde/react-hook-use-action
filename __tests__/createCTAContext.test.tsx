import { render, screen, waitFor, } from '@testing-library/react';
import { useEffect, } from 'react';
import { createCTAContext, returnCTAParameter, } from '../src';

const initialChanges = {
	there: 'you',
	you: 'me?',
	2: 2,
};

describe( 'createCTAContext', () => {
	const props = returnCTAParameter( {
		initial: initialChanges,
		afterActionChange: () => {},
		compare: ( a, b, { cmp, }, ) => cmp( a, b, ),
		transform: payload => payload,
		onInit: initial => initial,
	}, );

	const afterActionChange = jest.spyOn( props, 'afterActionChange', );
	const compare = jest.spyOn( props, 'compare', );
	const transform = jest.spyOn( props, 'transform', );
	const onInit = jest.spyOn( props, 'onInit', );

	const ctaContext = createCTAContext( props, );

	const {
		CTAProvider,
		useCTAHistoryContext,
		useCTADispatchContext,
	} = ctaContext;

	test( 'should create a context', async() => {
		const ctaContext = createCTAContext( {
			...props,
			actions: {
				custom() {
					return {
						there: 'custom',
						you: 'custom',
					};
				},
			},
		}, );

		expect( ctaContext, ).toBeDefined();
		expect( compare, ).not.toHaveBeenCalled();
		expect( transform, ).not.toHaveBeenCalled();
		expect( onInit, ).not.toHaveBeenCalled();

		await waitFor( async() => {
			expect( afterActionChange, ).not.toHaveBeenCalled();
		}, );
	}, );

	test( 'should update when view is wrapped in a Provided', async() => {
		let ctaDispatchContext: ReturnType<typeof useCTADispatchContext>;
		const View = () => {
			const ctaStateContext = useCTAHistoryContext();
			ctaDispatchContext = useCTADispatchContext();
			useEffect(
				() => {
					ctaDispatchContext?.cta.update( 'there', 'there', );
				},
				[],
			);
			return <>
				<div data-testid="test-there">{ctaStateContext.current.there}</div>
				<div data-testid="test-you">{ctaStateContext.current.you}</div>
				<div data-testid="test-2">{ctaStateContext.current[ 2 ]}</div>
			</>;
		};
		const Consumer = () => <CTAProvider>
			<View />
		</CTAProvider>;

		render( <Consumer />, );

		expect( screen.getByTestId( 'test-there', ).textContent, ).toBe( 'there', );
		expect( screen.getByTestId( 'test-you', ).textContent, ).toBe( initialChanges.you, );
		expect( screen.getByTestId( 'test-2', ).textContent, ).toBe( String( initialChanges[ 2 ], ), );

		expect( compare, ).toHaveBeenCalled();
		expect( transform, ).toHaveBeenCalledTimes( 1, );
		expect( onInit, ).toHaveBeenCalledTimes( 1, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledTimes( 1, );
		}, );

		await waitFor( async() => {
			expect( afterActionChange, ).toHaveBeenCalledWith( ctaDispatchContext?.history, 'update', undefined, );
		}, );
	}, );

	test( 'should update when with `initial` prop', () => {
		const newInitial = {
			you: 'new initial',
			there: 'nothing',
			2: 22,
		};
		const View = () => {
			const ctaStateContext = useCTAHistoryContext();
			const ctaDispatchContext = useCTADispatchContext();
			useEffect(
				() => {
					ctaDispatchContext?.cta.update( 'there', 'there', );
				},
				[
					ctaDispatchContext,
				],
			);
			return <>
				<div data-testid="test-there">{ctaStateContext.current.there}</div>
				<div data-testid="test-you">{ctaStateContext.current.you}</div>
				<div data-testid="test-2">{ctaStateContext.current[ 2 ]}</div>
			</>;
		};
		const Consumer = () => <CTAProvider initial={newInitial}>
			<View />
		</CTAProvider>;

		render( <Consumer />, );

		expect( screen.getByTestId( 'test-there', ).textContent, ).toBe( 'there', );
		expect( screen.getByTestId( 'test-you', ).textContent, ).toBe( newInitial.you, );
		expect( screen.getByTestId( 'test-2', ).textContent, ).toBe( String( newInitial[ 2 ], ), );
	}, );

	test( 'should update when with `onInit` prop', () => {
		const View = () => {
			const ctaStateContext = useCTAHistoryContext();
			const ctaDispatchContext = useCTADispatchContext();
			useEffect(
				() => {
					ctaDispatchContext?.cta.update( 'there', 'there', );
				},
				[
					ctaDispatchContext,
				],
			);
			return <>
				<div data-testid="test-there">{ctaStateContext.current.there}</div>
				<div data-testid="test-you">{ctaStateContext.current.you}</div>
				<div data-testid="test-2">{ctaStateContext.current[ 2 ]}</div>
			</>;
		};
		const Consumer = () => <CTAProvider onInit={initial => ( {
			...initial,
			you: 'onInit',
		} )}>
			<View />
		</CTAProvider>;

		render( <Consumer />, );

		expect( screen.getByTestId( 'test-there', ).textContent, ).toBe( 'there', );
		expect( screen.getByTestId( 'test-you', ).textContent, ).toBe( 'onInit', );
		expect( screen.getByTestId( 'test-2', ).textContent, ).toBe( String( initialChanges[ 2 ], ), );
	}, );

	test( 'should update with custom action', () => {
		const ctaContext = createCTAContext( {
			initial: initialChanges,
			actions: {
				custom() {
					return {
						there: 'custom',
						you: 'custom',
					};
				},
			},
		}, );
		const {
			CTAProvider,
			useCTAHistoryContext,
			useCTADispatchContext,
		} = ctaContext;

		const View = () => {
			const ctaStateContext = useCTAHistoryContext();
			const ctaDispatchContext = useCTADispatchContext();
			useEffect(
				() => {
					ctaDispatchContext?.cta.custom();
				},
				[
					ctaDispatchContext,
				],
			);
			return <>
				<div data-testid="test-there">{ctaStateContext.current.there}</div>
				<div data-testid="test-you">{ctaStateContext.current.you}</div>
				<div data-testid="test-2">{ctaStateContext.current[ 2 ]}</div>
			</>;
		};
		const Consumer = () => <CTAProvider>
			<View />
		</CTAProvider>;

		render( <Consumer />, );

		expect( screen.getByTestId( 'test-there', ).textContent, ).toBe( 'custom', );
		expect( screen.getByTestId( 'test-you', ).textContent, ).toBe( 'custom', );
		expect( screen.getByTestId( 'test-2', ).textContent, ).toBe( String( initialChanges[ 2 ], ), );
	}, );

	test( 'should update with custom action and update', () => {
		const ctaContext = createCTAContext( {
			initial: initialChanges,
			actions: {
				custom() {
					return {
						there: 'custom',
						you: 'custom',
					};
				},
			},
		}, );
		const {
			CTAProvider,
			useCTAHistoryContext,
			useCTADispatchContext,
		} = ctaContext;

		const View = () => {
			const ctaStateContext = useCTAHistoryContext();
			const ctaDispatchContext = useCTADispatchContext();
			useEffect(
				() => {
					ctaDispatchContext?.cta.custom();
					ctaDispatchContext?.cta.update( 2, 999, );
				},
				[
					ctaDispatchContext,
				],
			);
			return <>
				<div data-testid="test-there">{ctaStateContext.current.there}</div>
				<div data-testid="test-you">{ctaStateContext.current.you}</div>
				<div data-testid="test-2">{ctaStateContext.current[ 2 ]}</div>
			</>;
		};
		const Consumer = () => <CTAProvider>
			<View />
		</CTAProvider>;

		render( <Consumer />, );

		expect( screen.getByTestId( 'test-there', ).textContent, ).toBe( 'custom', );
		expect( screen.getByTestId( 'test-you', ).textContent, ).toBe( 'custom', );
		expect( screen.getByTestId( 'test-2', ).textContent, ).toBe( '999', );
	}, );

	test( 'should not update when useCTADispatchContext is outside Provider', () => {
		const View = () => {
			const ctaStateContext = useCTAHistoryContext();
			const ctaDispatchContext = useCTADispatchContext();
			useEffect(
				() => {
					ctaDispatchContext?.cta.update( 'there', 'there', );
				},
				[
					ctaDispatchContext,
				],
			);
			return <CTAProvider>
				<div data-testid="test-view">{ctaStateContext.current.there}</div>
			</CTAProvider>;
		};

		render( <View />, );

		expect( screen.getByTestId( 'test-view', ).textContent, ).toBe( initialChanges.there, );
	}, );
}, );
