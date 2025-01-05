import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterAfterActionChange( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[630px]" aria-label="Use CTA Parameter: after action change">
		{props.sourceCodeRecord[ 'types/UseCTAParameterAfterActionChange.ts' ]}
	</PopoverTypes>;
}
