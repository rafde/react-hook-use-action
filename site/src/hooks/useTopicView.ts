'use client';
import { create, } from 'zustand/index';

type UseViewingTopics = {
	topicHrefSet: Set<string>
	topicHrefs: string[]
	addTopic( topicEntry: IntersectionObserverEntry ): void
	removeTopic( topicEntry: IntersectionObserverEntry ): void
	isTopicViewing( topicHref: string ): boolean
	getTopicObserver(): IntersectionObserver | undefined
};

const useTopicView = create<UseViewingTopics>( ( set, get, ) => {
	const topicHrefSet = new Set<string>();
	const topicHrefs: string[] = [];
	const m = new Map<string, number | undefined>();
	let topicObserver: IntersectionObserver;

	return {
		topicHrefSet,
		topicHrefs,
		addTopic: topicEntry => set( ( state, ) => {
			const target = topicEntry.target as HTMLDivElement;
			const topicHref = target.dataset.href as string;
			const topicHrefs = state.topicHrefs.concat( [topicHref,], );

			m.set( topicHref, topicEntry.target?.parentElement?.offsetTop, );

			topicHrefs.sort( ( a, b, ) => {
				const aTop = m.get( a, );
				const bTop = m.get( b, );
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
			};
		}, ),
		removeTopic: topicEntry => set( ( state, ) => {
			const target = topicEntry.target as HTMLDivElement;
			const topicHref = target.dataset.href as string;
			const topicHrefs = state.topicHrefs.filter( href => href !== topicHref, );

			m.delete( topicHref, );

			return {
				topicHrefs,
			};
		}, ),
		isTopicViewing: ( topicHref: string, ) => {
			const [firstHref,] = get().topicHrefs;
			return firstHref === topicHref;
		},
		getTopicObserver: () => {
			if ( topicObserver ) {
				return topicObserver;
			}
			if ( typeof window !== 'undefined' ) {
				topicObserver = new IntersectionObserver(
					( entries, ) => {
						entries.forEach( ( entry, ) => {
							if ( entry.isIntersecting ) {
								get().addTopic( entry, );
							}
							else {
								get().removeTopic( entry, );
							}
						}, );
					},
					{
						threshold: 0.1,
					},
				);

				return topicObserver;
			}
		},
	};
}, );

export default useTopicView;
