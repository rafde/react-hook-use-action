'use client';

import useNav from '../../hooks/useNav';

function onChange() {
}

export default function NavHiddenCheck() {
	const isNavOpen = useNav( state => state.isNavOpen, );
	return <input type="checkbox" className="peer/side navSidebar hidden" checked={isNavOpen} onChange={onChange} />;
}
