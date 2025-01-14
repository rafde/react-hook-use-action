import { useCTAParameterInitialConfig, } from '../nav-sidebar/config/use-cta-config';
import PopoverCTAState from '../popover/ctaState';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function InitialLink() {
	return <>
		<Anchor
			href={useCTAParameterInitialConfig.href}
			aria-label={`Link to ${useCTAParameterInitialConfig.title} section`}>
			<Code>initial</Code>
		</Anchor>
		{' '}
		<PopoverCTAState />
	</>;
}
