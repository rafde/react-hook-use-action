import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsOverridableRecord( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[430px]" aria-label="default actions record">
		{props.sourceCodeRecord.UseCTAParameterActionsOverridable}
	</PopoverTypes>;
}
