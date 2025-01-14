import { useCTAReturnValues0HistoryConfig, } from '../nav-sidebar/config/use-cta-config';

import PopoverCTAHistory from '../popover/ctaHistory';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function CTAHistoryLink() {
	return <>
		<Anchor
			href={useCTAReturnValues0HistoryConfig.href}
			aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title} section`}>
			<Code>CTAHistory</Code>
		</Anchor>
		<PopoverCTAHistory />
	</>;
}
