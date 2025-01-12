'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverDispatchCTABuiltIn() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'DispatchCTABuiltIn', ), );
	return <PopoverTypes className="max-w-[730px]" aria-label="Dispatch CTA Built-in">
		{sourceCode}
	</PopoverTypes>;
}
