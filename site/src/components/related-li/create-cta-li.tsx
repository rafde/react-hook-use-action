import { createCTAParametersConfig, } from '../nav-sidebar/config/create-cta-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function RelatedLiCreateCTA() {
	return <li>
		<Anchor aria-label="create cta selector paramater link" href={createCTAParametersConfig.href}>
			<Code>createCTA</Code>
		</Anchor>
	</li>;
}
