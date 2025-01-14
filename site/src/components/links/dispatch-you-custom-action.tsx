import {
	useCTAReturnValues1DispatchCTACustomActionConfig,
} from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function DispatchYourCustomActionLink() {
	return <Anchor aria-label="Link to dispatch.cta.YourCustomAction" href={useCTAReturnValues1DispatchCTACustomActionConfig.href}>
		<Code>dispatch.cta.YourCustomAction</Code>
	</Anchor>;
}
