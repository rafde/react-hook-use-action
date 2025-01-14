import {
	useCTAParameterActionsOverridableConfig,
} from '../nav-sidebar/config/use-cta-parameter-actions-override-built-in-config';
import PopoverUseCTAParameterActionsOverridableRecord from '../popover/UseCTAParameterActionsOverridableRecord';
import Anchor from '../ui/anchor';

export default function BuiltInLink() {
	return <>
		<Anchor
			href={useCTAParameterActionsOverridableConfig.href}
			aria-label={`Link to ${useCTAParameterActionsOverridableConfig.title} section`}>
			built-in action
		</Anchor>
		<PopoverUseCTAParameterActionsOverridableRecord />
	</>;
}
