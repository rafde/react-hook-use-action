import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropUpdateInitial( props: SourceCodeRecordProps, ) {
	return <PopoverTypes aria-label="useCTA parameter actions record prop update initial" className="max-w-[370px]">
		{props.sourceCodeRecord.UseCTAParameterActionsRecordPropUpdateInitial}
	</PopoverTypes>;
}
