'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverCTAHistory() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/CTAHistory.ts', ), );
	return <PopoverTypes className="max-w-[560px]" aria-label="CTA history">
		{sourceCode}
	</PopoverTypes>;
}
