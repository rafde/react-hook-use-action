export default function Anchor( props: React.AnchorHTMLAttributes<HTMLAnchorElement>, ) {
	const {
		className = '',
		href,
	} = props;

	return <a {...props} href={`#${href}`} className={`underline ${className}`} />;
}
