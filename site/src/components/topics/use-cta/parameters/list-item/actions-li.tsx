import { useCTAParameterActionsConfig, } from '../../../../nav-sidebar/config/use-cta-config';
import PopoverUseCTAParameterCustomActionsRecord from '../../../../popover/UseCTAParameterActionsCustomActionsRecord';
import PopoverUseCTAParameterActionsOverridableRecord from '../../../../popover/UseCTAParameterActionsOverridableRecord';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';

export default function UseCTAParameterActionsLi() {
	return <li>
		<Anchor href={useCTAParameterActionsConfig.href} aria-label={useCTAParameterActionsConfig.title}>
			<Code>actions</Code>
		</Anchor>
		{' '}
		<PopoverUseCTAParameterActionsOverridableRecord />
		<PopoverUseCTAParameterCustomActionsRecord />
	</li>;
}
