'use client';
import { PanelLeftOpen, } from 'lucide-react';
import useNav from '../../hooks/useNav';

export default function NavOverlayOpenButton() {
	const openNavOverlay = useNav( state => state.openNavOverlay, );

	return <button aria-label="Open Navigation" className="absolute z-20 mt-3.5 bg-black sm:hidden" onClick={openNavOverlay} type="button">
		<PanelLeftOpen />
	</button>;
}
