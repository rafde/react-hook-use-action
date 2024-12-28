import { MessageSquareCode, } from 'lucide-react';
import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import CodeBlock from '../ui/codeBlock';
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover';

export default function PopoverUseCTAParameterOnInit( props: SourceCodeRecordProps, ) {
	return <Popover>
		<PopoverTrigger asChild>
			<button aria-label="Popover trigger button for Use CTA Parameter: onInit">
				<MessageSquareCode />
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-screen max-w-[810px]">
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterOnInit.ts' ]}</CodeBlock>
		</PopoverContent>
	</Popover>;
}
