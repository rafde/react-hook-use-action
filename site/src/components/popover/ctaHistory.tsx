import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverCTAHistory( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[540px]" aria-label="CTA history">
		{props.sourceCodeRecord[ 'types/CTAHistory.ts' ]}
	</PopoverTypes>;
}
