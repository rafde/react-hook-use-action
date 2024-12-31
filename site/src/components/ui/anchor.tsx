type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	'aria-label': string
};

export default function Anchor( props: AnchorProps, ) {
	const {
		className = '',
		href,
	} = props;

	return <a {...props} href={`#${href}`} className={`underline ${className}`} />;
}
