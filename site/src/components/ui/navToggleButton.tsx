'use client';
import { PanelLeftClose, PanelLeftOpen, } from 'lucide-react';
import useNav from '../../hooks/useCTANav';

export default function NavToggleButton() {
	const isNavOpen = useNav( ( { current, }, ) => current.isNavOpen, );
	const toggleNav = useNav( ( { dispatch, }, ) => dispatch.cta.toggleNav, );

	return <button aria-label={`${isNavOpen ? 'Close' : 'Open'} Navigation`} className="fixed z-20 ml-1 mt-4 hidden bg-black sm:block" onClick={toggleNav} type="button">
		<PanelLeftClose className={`${isNavOpen ? '' : 'hidden'}`} />
		<PanelLeftOpen className={`${isNavOpen ? 'hidden' : ''}`} />
	</button>;
}
