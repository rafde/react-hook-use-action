import { Link as ChainLink, } from 'lucide-react';
import { ReactNode, } from 'react';
import { cn, } from '../../lib/utils';

export type HeaderLinkProps = {
	href: string
	title: string
	desc?: ReactNode
	wrapperClassName?: string
	headerClassName?: string
	Header?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
};

export default function HeaderLink( props: HeaderLinkProps, ) {
	const {
		wrapperClassName = 'sticky top-0 z-10',
		headerClassName = 'text-3xl',
		Header = 'h4',
		title,
		desc = title,
	} = props;
	return <div className={cn( 'group flex flex-row items-center gap-2 border-b border-b-white bg-black py-2 pl-8 pr-2', wrapperClassName, )}>
		<a href={`#${props.href}`} className="mt-3 flex flex-col self-start" aria-label={`Section anchor for ${title}`}>
			<ChainLink className="size-4 self-center" />
		</a>
		<Header className={cn( 'overflow-hidden text-wrap break-words', headerClassName, )} aria-label={title}>{desc}</Header>
	</div>;
}
