import {
	useCTAParameterOnInitConfig,
} from '../../../../nav-sidebar/config/use-cta-config';
import PopoverUseCTAParameterOnInit from '../../../../popover/UseCTAParameterOnInit';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';

export default function UseCTAParameterOnInitLi() {
	return <li>
		<Anchor href={useCTAParameterOnInitConfig.href} aria-label={useCTAParameterOnInitConfig.title}>
			<Code>onInit</Code>
		</Anchor>
		{' '}
		<PopoverUseCTAParameterOnInit />
	</li>;
}
