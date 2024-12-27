import { create, } from 'zustand';

type UseNavState = {
	isNavOverlayOpen: boolean
	isNavOpen: boolean
	toggleNav: () => void
	openNavOverlay: () => void
	closeNavOverlay: () => void
};

const useNav = create<UseNavState>( set => ( {
	isNavOverlayOpen: false,
	isNavOpen: true,
	openNavOverlay: () => set( () => ( {
		isNavOverlayOpen: true,
		isNavOpen: true,
	} ), ),
	closeNavOverlay: () => set( () => ( {
		isNavOverlayOpen: false,
		isNavOpen: false,
	} ), ),
	toggleNav: () => set( ( state, ) => {
		const isNavOpen = !state.isNavOpen;

		if ( !isNavOpen ) {
			return {
				isNavOverlayOpen: false,
				isNavOpen,
			};
		}
		return {
			isNavOpen,
		};
	}, ),
} ), );

export default useNav;
