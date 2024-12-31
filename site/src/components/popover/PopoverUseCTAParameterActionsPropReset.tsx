import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropReset( props: SourceCodeRecordProps, ) {
	return <PopoverTypes aria-label="Use CTA Parameter Actions: Record Prop Reset" className="max-w-[370px]">
		{props.sourceCodeRecord.UseCTAParameterActionsRecordPropReset}
	</PopoverTypes>;
}
