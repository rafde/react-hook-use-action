import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterOnInit( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[810px]" aria-label="Use CTA Parameter: onInit">
		{props.sourceCodeRecord[ 'types/UseCTAParameterOnInit.ts' ]}
	</PopoverTypes>;
}
