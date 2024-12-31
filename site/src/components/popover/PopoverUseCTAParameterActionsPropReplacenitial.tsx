import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropReplaceInitial( props: SourceCodeRecordProps, ) {
	return <PopoverTypes aria-label="useCTA parameter actions record prop replace initial" className="max-w-[370px]">
		{props.sourceCodeRecord.UseCTAParameterActionsRecordPropReplaceInitial}
	</PopoverTypes>;
}
