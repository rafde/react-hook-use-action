import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsRecordProp( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[860px]" aria-label="actions record">
		{props.sourceCodeRecord[ 'types/UseCTAParameterActionsRecordProp.ts' ]}
	</PopoverTypes>;
}
