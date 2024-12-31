import { MessageSquareCode, } from 'lucide-react';
import CodeBlock from '../ui/codeBlock';
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover';

type PopoverProps = {
	'aria-label': string
	className: string
	children: string
};

export default function PopoverTypes( props: PopoverProps, ) {
	return <Popover>
		<PopoverTrigger asChild>
			<button aria-label={`Popover trigger button for ${props[ 'aria-label' ]}`}>
				<MessageSquareCode />
			</button>
		</PopoverTrigger>
		<PopoverContent className={`w-screen ${props.className}`}>
			<CodeBlock>{props.children}</CodeBlock>
		</PopoverContent>
	</Popover>;
}
