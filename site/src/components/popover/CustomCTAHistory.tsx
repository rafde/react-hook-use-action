import { MessageSquareCode, } from 'lucide-react';
import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import CodeBlock from '../ui/codeBlock';
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover';

export default function PopoverCustomCTAHistory( props: SourceCodeRecordProps, ) {
	return <Popover>
		<PopoverTrigger asChild>
			<button aria-label="Popover trigger button for Custom CTA History">
				<MessageSquareCode />
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-screen max-w-[570px]">
			<CodeBlock>{props.sourceCodeRecord[ 'types/CustomCTAHistory.ts' ]}</CodeBlock>
		</PopoverContent>
	</Popover>;
}
