import { MessageSquareCode, } from 'lucide-react';
import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import CodeBlock from '../ui/codeBlock';
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover';

export default function PopoverDefaultActionsRecord( props: SourceCodeRecordProps, ) {
	return <Popover>
		<PopoverTrigger asChild>
			<button aria-label="Popover trigger button for default actions record">
				<MessageSquareCode />
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-screen max-w-[920px]">
			<CodeBlock>{props.sourceCodeRecord[ 'types/DefaultActionsRecord.ts' ]}</CodeBlock>
		</PopoverContent>
	</Popover>;
}
