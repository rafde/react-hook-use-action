import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropReplace( props: SourceCodeRecordProps, ) {
	return <PopoverTypes aria-label="useCTA parameter actions record prop replace" className="max-w-[370px]">
		{props.sourceCodeRecord.UseCTAParameterActionsRecordPropReplace}
	</PopoverTypes>;
}
