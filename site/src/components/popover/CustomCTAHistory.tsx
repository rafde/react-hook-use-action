import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import PopoverTypes from './index';

export default function PopoverCustomCTAHistory( props: SourceCodeRecordProps, ) {
	return <PopoverTypes className="max-w-[570px]" aria-label="Custom CTA History">
		{props.sourceCodeRecord[ 'types/CustomCTAHistory.ts' ]}
	</PopoverTypes>;
}
