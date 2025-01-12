'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropReset() {
	const sourceCode = useSourceCode( ( { current, }, ) => current.sourceCodeRecord.UseCTAParameterActionsRecordPropReset, );
	return <PopoverTypes aria-label="Use CTA Parameter Actions: Record Prop Reset" className="max-w-[390px]">
		{sourceCode}
	</PopoverTypes>;
}
