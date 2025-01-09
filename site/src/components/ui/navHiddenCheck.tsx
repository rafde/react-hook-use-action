'use client';

import useNav from '../../hooks/useCTANav';

function onChange() {
}

export default function NavHiddenCheck() {
	const isNavOpen = useNav( ( { current: { isNavOpen, }, }, ) => isNavOpen, );
	return <input type="checkbox" className="peer/side hidden" checked={isNavOpen} onChange={onChange} />;
}
