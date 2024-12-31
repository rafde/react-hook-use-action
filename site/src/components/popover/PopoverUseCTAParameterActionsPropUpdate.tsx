import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropUpdate( props: SourceCodeRecordProps, ) {
	return <PopoverTypes aria-label="useCTA parameter actions record prop update" className="max-w-[370px]">
		{props.sourceCodeRecord.UseCTAParameterActionsRecordPropUpdate}
	</PopoverTypes>;
}
