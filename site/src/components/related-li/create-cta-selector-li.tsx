import { createCTASelectorParametersConfig, } from '../nav-sidebar/config/create-cta-selector-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function RelatedLiCreateCTASelector() {
	return <li>
		<Anchor aria-label="create cta selector paramater link" href={createCTASelectorParametersConfig.href}>
			<Code>createCTASelector</Code>
		</Anchor>
	</li>;
}
