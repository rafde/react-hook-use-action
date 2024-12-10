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
	toggleNavOverlay: () => set( state => ( {
		isNavOverlayOpen: !state.isNavOverlayOpen,
	} ), ),
	openNavOverlay: () => set( () => ( {
		isNavOverlayOpen: true,
	} ), ),
	closeNavOverlay: () => set( () => ( {
		isNavOverlayOpen: false,
	} ), ),
	toggleNav: () => set( state => ( {
		isNavOpen: !state.isNavOpen,
	} ), ),
} ), );

export default useNav;
