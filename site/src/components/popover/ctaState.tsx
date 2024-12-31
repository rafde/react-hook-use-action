import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverCTAState( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[490px]" aria-label="CTA State">
		{props.sourceCodeRecord[ 'types/CTAState.ts' ].trim()}
	</PopoverTypes>;
}
