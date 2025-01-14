'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAReturnType() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/UseCTAReturnType.ts', ), );
	return <PopoverTypes className="max-w-[700px]" aria-label="Use CTA return type">
		{sourceCode}
	</PopoverTypes>;
}
