'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterOnInit() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/UseCTAParameterOnInit.ts', )?.trim(), );
	return <PopoverTypes className="max-w-[810px]" aria-label="Use CTA Parameter: onInit">
		{sourceCode}
	</PopoverTypes>;
}
