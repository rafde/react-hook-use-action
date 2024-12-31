import { PropsWithChildren, } from 'react';
import { NavItem, } from '../nav-sidebar/config';
import HeaderLink, { HeaderLinkProps, } from './headerLink';
import TopicInView from './TopicInView';

type SectProps = PropsWithChildren<NavItem & Pick<HeaderLinkProps, 'Header'>>;

export default function Sect( props: SectProps, ) {
	const {
		children,
		...headerLinkProps
	} = props;

	return <section id={headerLinkProps.href} className="relative">
		<HeaderLink {...headerLinkProps} />
		{children}
		<TopicInView href={headerLinkProps.href} />
	</section>;
}
