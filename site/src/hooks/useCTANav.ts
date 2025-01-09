import { createCTASelector, } from '../../../src';

const useCTANav = createCTASelector( {
	initial: {
		isNavOverlayOpen: false,
		isNavOpen: true,
	},
	actions: {
		openNavOverlay() {
			return {
				isNavOverlayOpen: true,
				isNavOpen: true,
			};
		},
		closeNavOverlay() {
			return {
				isNavOverlayOpen: false,
				isNavOpen: false,
			};
		},
		toggleNav( ctaHistory, ) {
			const isNavOpen = !ctaHistory.current.isNavOpen;
			if ( !isNavOpen ) {
				return {
					isNavOverlayOpen: false,
					isNavOpen,
				};
			}

			return {
				isNavOpen,
			};
		},
	},
}, );

export default useCTANav;
