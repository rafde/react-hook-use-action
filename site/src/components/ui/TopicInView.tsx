'use client';

import { useEffect, useRef, } from 'react';
import useTopicView from '../../hooks/useTopicView';

type TopicInViewProps = {
	href: string
};
export default function TopicInView( props: TopicInViewProps, ) {
	const {
		href,
	} = props;
	const elRef = useRef<HTMLDivElement>( null, );
	const topicObserver = useTopicView( state => state.getTopicObserver(), );

	useEffect( () => {
		if ( elRef.current == null || !topicObserver ) {
			return;
		}
		const el = elRef.current;
		topicObserver.observe( el, );
		return () => {
			topicObserver.unobserve( el, );
		};
	}, [href, topicObserver,], );
	return <div className="absolute inset-0 -z-10 opacity-0" ref={elRef} data-href={href} />;
}
