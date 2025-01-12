'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsRecordProp() {
	const sourceCode = useSourceCode( ( { current, }, ) => current.sourceCodeRecord[ 'types/CustomCTAHistory.ts' ], );
	return <PopoverTypes className="max-w-[860px]" aria-label="actions record">
		{sourceCode}
	</PopoverTypes>;
}
