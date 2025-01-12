'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropUpdate() {
	const sourceCode = useSourceCode( ( { current, }, ) => current.sourceCodeRecord.UseCTAParameterActionsRecordPropUpdate, );
	return <PopoverTypes aria-label="useCTA parameter actions record prop update" className="max-w-[390px]">
		{sourceCode}
	</PopoverTypes>;
}
