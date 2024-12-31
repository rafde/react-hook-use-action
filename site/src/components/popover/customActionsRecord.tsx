import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverCustomActionsRecord( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[920px]" aria-label="custom actions record">
		{props.sourceCodeRecord.UseCTAParameterActionsCustomRecord}
	</PopoverTypes>;
}
