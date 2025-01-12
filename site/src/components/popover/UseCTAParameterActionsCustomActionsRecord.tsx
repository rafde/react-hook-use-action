'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterCustomActionsRecord() {
	const sourceCode = useSourceCode(
		( { dispatch, }, ) => dispatch.func.getSourceCode( 'UseCTAParameterActionsCustomRecord', ),
	);
	return <PopoverTypes className="max-w-[610px]" aria-label="custom actions record">
		{sourceCode}
	</PopoverTypes>;
}
