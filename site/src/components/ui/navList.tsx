import { useMemo, } from 'react';
import { NavItem, navList, } from '../nav-sidebar/config';
import { FolderOpen, FolderClosed, } from 'lucide-react';

type NavLiProps = NavItem & {
	linkWrapperClassName?: string
};

function NavLi( props: NavLiProps, ) {
	const {
		title,
		desc = title,
		navTitle = desc,
		href,
		subNav,
		linkWrapperClassName = '',
	} = props;

	return <li className="group/nav-li z-20">
		<div className={`peer/folder navLink flex border-l bg-black py-2 pl-2 ${linkWrapperClassName} `}>
			<a href={`#${href}`} aria-label={`Go to ${title} section`} className="mr-auto overflow-hidden text-wrap break-words">
				{navTitle}
			</a>
			{subNav && <label className="relative ml-2">
				<input type="checkbox" className="peer/toggler toggleFolder absolute inset-0 z-10 opacity-0" defaultChecked={true} aria-label={`Toggle sub-menu ${title}`} />
				<FolderClosed className="block peer-checked/toggler:hidden" />
				<FolderOpen className="hidden peer-checked/toggler:block" />
			</label>}
		</div>
		<NavSubUl navSub={subNav} />
	</li>;
}

function NavSubUl( props: { navSub?: NavItem[] }, ) {
	const subNavList = useMemo( () => createNavListLinks( props.navSub, 'z-10', ), [props.navSub,], );
	if ( !subNavList ) {
		return;
	}
	return <div className="relative h-0 overflow-hidden pl-3 transition-[height] delay-100 duration-75 peer-has-[input:checked]/folder:h-full peer-has-[input:checked]/folder:*:translate-y-0 peer-has-[input:checked]/folder:*:opacity-100">
		<ul className="relative -translate-y-full opacity-0 transition-all duration-300">
			{subNavList}
		</ul>
	</div>;
}

function createNavListLinks( nav?: NavItem[], linkWrapperClassName?: string, ) {
	if ( !Array.isArray( nav, ) ) {
		return;
	}

	return nav.map( navLink => <NavLi key={navLink.href} {...navLink} linkWrapperClassName={linkWrapperClassName} />, );
}

const navListLinks = navList.map( navLink => <NavLi key={navLink.href} {...navLink} linkWrapperClassName="sticky top-0 z-20" />, );

export default function NavList() {
	return <ul className="grow overflow-y-auto pl-1 pr-4">
		{navListLinks}
	</ul>;
}
