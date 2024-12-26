import { MessageSquareCode, } from 'lucide-react';
import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import CodeBlock from '../ui/codeBlock';
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover';

export default function PopoverCTAHistory( props: SourceCodeRecordProps, ) {
	return <Popover>
		<PopoverTrigger asChild>
			<button aria-label="Popover trigger button for CTA history">
				<MessageSquareCode />
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-screen max-w-[540px]">
			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAHistory.ts' ]}</CodeBlock>
		</PopoverContent>
	</Popover>;
}
