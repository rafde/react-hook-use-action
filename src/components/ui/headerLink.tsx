import Link from 'next/link';
import { Link as ChainLink, } from 'lucide-react';
import { cn, } from '../../lib/utils';

type HeaderLinkProps = {
	href: string
	title: string
	wrapperClassName?: string
	headerClassName?: string
	Header?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
};

export default function HeaderLink( props: HeaderLinkProps, ) {
	const {
		wrapperClassName = 'sticky',
		headerClassName = 'text-3xl',
		Header = 'h2',
	} = props;
	return <div className={cn( 'group flex flex-row items-center gap-2 border-b border-b-white p-2', wrapperClassName, )}>
		<Header id={props.href} className={cn( 'peer order-1 grow ', headerClassName, )}>{props.title}</Header>
		<Link href={`#${props.href}`} className="flex flex-col opacity-0 transition-opacity duration-300 group-hover:opacity-100">
			<ChainLink className="size-4 self-center" />
		</Link>
	</div>;
}
