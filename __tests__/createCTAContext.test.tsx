import { render, screen, } from '@testing-library/react';
import { useEffect, } from 'react';
import { createCTAContext, } from '../src';

const initialChanges = {
	there: 'you',
	you: 'me?',
	2: 2,
};

describe( 'createCTAContext', () => {
	const ctaContext = createCTAContext( {
		initial: initialChanges,
	}, );
	const {
		CTAProvider,
		useCTAStateContext,
		useCTADispatchContext,
	} = ctaContext;

	test( 'should update when view is wrapped in a Provided', () => {
		const View = () => {
			const ctaStateContext = useCTAStateContext();
			const ctaDispatchContext = useCTADispatchContext();
			useEffect(
				() => {
					ctaDispatchContext?.cta.update( 'there', 'there', );
				},
				[
					ctaDispatchContext,
				],
			);
			return <div data-testid="test-view">{ctaStateContext.there}</div>;
		};
		const Consumer = () => <CTAProvider>
			<View />
		</CTAProvider>;
		render( <Consumer />, );
		expect( screen.getByTestId( 'test-view', ).textContent, ).toBe( 'there', );
	}, );

	test( 'should not update when useCTADispatchContext is outside Provider', () => {
		const View = () => {
			const ctaStateContext = useCTAStateContext();
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
				<div data-testid="test-view">{ctaStateContext.there}</div>
			</CTAProvider>;
		};

		render( <View />, );
		expect( screen.getByTestId( 'test-view', ).textContent, ).toBe( initialChanges.there, );
	}, );
}, );
