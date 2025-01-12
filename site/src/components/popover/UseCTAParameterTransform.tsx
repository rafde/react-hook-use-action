'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterTransform() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'types/UseCTAParameterTransform.ts', ), );
	return <PopoverTypes className="max-w-[740px]" aria-label="Use CTA Parameter: after action change">
		{sourceCode}
	</PopoverTypes>;
}
