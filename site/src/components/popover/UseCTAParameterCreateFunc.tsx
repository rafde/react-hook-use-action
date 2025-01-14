'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterCreateFunc() {
	const sourceCode = useSourceCode(
		( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/UseCTAParameterCreateFunc.ts', ),
	);
	return <PopoverTypes className="max-w-[610px]" aria-label="use cta parameter create func">
		{sourceCode}
	</PopoverTypes>;
}
