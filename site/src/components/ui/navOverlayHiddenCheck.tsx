'use client';

import useNav from '../../hooks/useCTANav';

function onChange() {
}

export default function NavOverlyHiddenCheck() {
	const isOverlayNavOpen = useNav( ( { current, }, ) => current.isNavOverlayOpen, );
	return <input type="checkbox" className="peer/overlay hidden" checked={isOverlayNavOpen} onChange={onChange} />;
}
