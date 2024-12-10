import HeaderLink from './headerLink';

type SubHeaderLinkProps = {
	href: string
	title: string
};

export default function SubHeaderLink( props: SubHeaderLinkProps, ) {
	return <HeaderLink href={props.href} title={props.title} wrapperClassName="" headerClassName="text-xl" Header="h3" />;
}
