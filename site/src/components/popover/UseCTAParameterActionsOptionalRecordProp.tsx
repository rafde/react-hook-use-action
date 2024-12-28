import { MessageSquareCode, } from 'lucide-react';
import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import CodeBlock from '../ui/codeBlock';
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover';

export default function PopoverUseCTAParameterActionsOptionalRecordProp( props: SourceCodeRecordProps, ) {
	return <Popover>
		<PopoverTrigger asChild>
			<button aria-label="Popover trigger button for actions record">
				<MessageSquareCode />
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-screen max-w-[950px]">
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterActionsOptionalRecordProp.ts' ]}</CodeBlock>
		</PopoverContent>
	</Popover>;
}
