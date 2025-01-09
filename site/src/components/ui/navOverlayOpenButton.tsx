'use client';
import { PanelLeftOpen, } from 'lucide-react';
import useNav from '../../hooks/useCTANav';

export default function NavOverlayOpenButton() {
	const openNavOverlay = useNav( ( { dispatch, }, ) => dispatch.cta.openNavOverlay, );

	return <button aria-label="Open Navigation" className="fixed z-20 ml-1 mt-4 bg-black sm:hidden" onClick={openNavOverlay} type="button">
		<PanelLeftOpen />
	</button>;
}
