import { useCTAReturnValues1DispatchConfig, } from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function DispatchLink() {
	return <>
		<Anchor
			href={useCTAReturnValues1DispatchConfig.href}
			aria-label={`Link to ${useCTAReturnValues1DispatchConfig.title} section`}>
			<Code>dispatch</Code>
		</Anchor>
	</>;
}
