import { PropsWithChildren, } from 'react';
import { NavItem, } from '../nav-sidebar/config';
import HeaderLink, { HeaderLinkProps, } from './headerLink';

type SectProps = PropsWithChildren<NavItem & Pick<HeaderLinkProps, 'Header'>>;

export default function Sect( props: SectProps, ) {
	const {
		children,
		...headerLinkProps
	} = props;

	return <section id={headerLinkProps.href}>
		<HeaderLink {...headerLinkProps} />
		{children}
	</section>;
}
