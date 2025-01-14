import { useCTAReturnValues0HistoryConfig, } from '../nav-sidebar/config/use-cta-config';
import PopoverCTAHistory from '../popover/ctaHistory';
import Anchor from '../ui/anchor';

export default function StateHistoryLink() {
	return <>
		<Anchor
			href={useCTAReturnValues0HistoryConfig.href}
			aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title} section`}>
			state history
		</Anchor>
		<PopoverCTAHistory />
	</>;
}
