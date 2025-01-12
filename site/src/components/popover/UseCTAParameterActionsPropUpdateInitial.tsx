'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropUpdateInitial() {
	const sourceCode = useSourceCode( ( { current, }, ) => current.sourceCodeRecord.UseCTAParameterActionsRecordPropUpdateInitial, );
	return <PopoverTypes aria-label="useCTA parameter actions record prop update initial" className="max-w-[390px]">
		{sourceCode}
	</PopoverTypes>;
}
