'use client';
import { PanelLeftClose, } from 'lucide-react';
import useNav from '../../hooks/useCTANav';

export default function NavOverlayCloseButton() {
	const closeNavOverlay = useNav( ( { dispatch, }, ) => dispatch.cta.closeNavOverlay, );

	return <button aria-label="Close Navigation" className="mt-2.5 self-start sm:hidden" onClick={closeNavOverlay} type="button">
		<PanelLeftClose />
	</button>;
}
