'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverCTAState() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/CTAState.ts', ), );
	return <PopoverTypes className="max-w-[525px]" aria-label="CTA State">
		{sourceCode}
	</PopoverTypes>;
}
