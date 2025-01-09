'use client';
import { createCTASelector, } from '../../../src';

const useCTATopicView = createCTASelector(
	{
		initial: {
			topicHrefs: [] as string[],
			firstTopicHref: '',
			topicHrefMap: new Map<string, number | undefined>(),
		},
		actions: {
			addTopic( { current, }, topicEntry: IntersectionObserverEntry, ) {
				const target = topicEntry.target as HTMLDivElement;
				const topicHref = target.dataset.href as string;
				const topicHrefs = current.topicHrefs.concat( [topicHref,], );
				const {
					topicHrefMap,
				} = current;
				topicHrefMap.set( topicHref, target?.parentElement?.offsetTop, );
				topicHrefs.sort( ( a, b, ) => {
					const aTop = topicHrefMap.get( a, );
					const bTop = topicHrefMap.get( b, );
					if ( aTop == null ) {
						return 1;
					}
					if ( bTop == null ) {
						return -1;
					}
					return aTop - bTop;
				}, );

				return {
					topicHrefs,
					firstTopicHref: topicHrefs[ 0 ],
				};
			},
			removeTopic( { current, }, topicEntry: IntersectionObserverEntry, ) {
				const target = topicEntry.target as HTMLDivElement;
				const topicHref = target.dataset.href as string;
				const topicHrefs = current.topicHrefs.filter( href => href !== topicHref, );
				current.topicHrefMap.delete( topicHref, );
				return {
					topicHrefs,
					firstTopicHref: topicHrefs[ 0 ],
				};
			},
		},
	},
	( { dispatch, }, ) => {
		let topicObserver: IntersectionObserver | null = null;
		return {
			topicObserver() {
				if ( topicObserver ) {
					return topicObserver;
				}
				if ( typeof window === 'undefined' ) {
					return topicObserver;
				}
				topicObserver = new IntersectionObserver(
					( entries, ) => {
						entries.forEach( ( entry, ) => {
							if ( entry.isIntersecting ) {
								dispatch.cta.addTopic( entry, );
							}
							else {
								dispatch.cta.removeTopic( entry, );
							}
						}, );
					},
					{
						threshold: 0.1,
					},
				);

				return topicObserver;
			},
		};
	},
);

export default useCTATopicView;
