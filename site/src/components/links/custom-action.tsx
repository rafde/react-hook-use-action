import { useCTAParameterActionsCustomConfig, } from '../nav-sidebar/config/use-cta-parameter-actions-custom-config';
import PopoverUseCTAParameterCustomActionsRecord from '../popover/UseCTAParameterActionsCustomActionsRecord';
import Anchor from '../ui/anchor';

export default function CustomActionLink() {
	return <>
		<Anchor
			aria-label={useCTAParameterActionsCustomConfig.title}
			href={useCTAParameterActionsCustomConfig.href}>
			custom action
		</Anchor>
		<PopoverUseCTAParameterCustomActionsRecord />
	</>;
}
