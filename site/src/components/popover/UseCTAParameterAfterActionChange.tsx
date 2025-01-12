'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterAfterActionChange() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/UseCTAParameterAfterActionChange.ts', ), );
	return <PopoverTypes className="max-w-[670px]" aria-label="Use CTA Parameter: after action change">
		{sourceCode}
	</PopoverTypes>;
}
