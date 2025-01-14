import {
	useCTAReturnValuesDispatchHistoryConfig,
} from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import Anchor from '../ui/anchor';

export default function DispatchHistoryLink() {
	return <>
		<Anchor
			href={useCTAReturnValuesDispatchHistoryConfig.href}
			aria-label={`Link to ${useCTAReturnValuesDispatchHistoryConfig.title} section`}>
			{useCTAReturnValuesDispatchHistoryConfig.desc}
		</Anchor>
	</>;
}
