import { MessageCircleQuestion, } from 'lucide-react';
import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import CodeBlock from '../ui/codeBlock';
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover';

export default function PopoverCTAState( props: SourceCodeRecordProps, ) {
	return <Popover>
		<PopoverTrigger asChild>
			<button aria-label="Popover trigger for CTA State">
				<MessageCircleQuestion />
			</button>
		</PopoverTrigger>
		<PopoverContent className="w-screen max-w-[490px]">
			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAState.ts' ]}</CodeBlock>
		</PopoverContent>
	</Popover>;
}
