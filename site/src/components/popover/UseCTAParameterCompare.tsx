import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterCompare( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[570px]" aria-label="Use CTA Parameter: Compare">
		{props.sourceCodeRecord[ 'types/UseCTAParameterCompare.ts' ]}
	</PopoverTypes>;
}
