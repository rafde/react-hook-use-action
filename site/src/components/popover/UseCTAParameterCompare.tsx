'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterCompare() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/UseCTAParameterCompare.ts', ), );
	return <PopoverTypes className="max-w-[570px]" aria-label="Use CTA Parameter: Compare">
		{sourceCode}
	</PopoverTypes>;
}
