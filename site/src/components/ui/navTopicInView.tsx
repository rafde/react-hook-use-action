'use client';
import useCTATopicView from '../../hooks/useCTATopicView';

export default function NavTopicInView( props: {
	href: string
}, ) {
	const {
		href,
	} = props;
	const isTopicViewing = useCTATopicView( ( { current, }, ) => current.firstTopicHref === href, );

	return <span className={`absolute inset-0 -z-10 bg-slate-700 ${isTopicViewing ? 'opacity-100' : 'opacity-0'}`} />;
}
