'use client';

import useNav from '../../hooks/useNav';

function onChange() {
}

export default function NavOverlyHiddenCheck() {
	const isOverlayNavOpen = useNav( state => state.isNavOverlayOpen, );
	return <input type="checkbox" className="peer/overlay navOverlay hidden" checked={isOverlayNavOpen} onChange={onChange} />;
}
