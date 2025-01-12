import {
	createCTAContextParametersConfig,
	createCTAContextReturnValueConfig,
} from '../nav-sidebar/config/create-cta-context-config';
import { returnCtaParameterConfig, } from '../nav-sidebar/config/return-cta-parameter-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function RelatedLiUseCTACommon( props: { includeCTAProvide?: boolean } = {}, ) {
	const {
		includeCTAProvide = true,
	} = props;
	return <>
		<li>
			<Anchor aria-label="create cta context paramater link" href={createCTAContextParametersConfig.href}>
				<Code>createCTAContext</Code>
			</Anchor>
			{includeCTAProvide && <ul className="list-inside list-disc pl-6">
				<li>
					<Anchor aria-label="create cta context return CTAProvider link" href={createCTAContextReturnValueConfig.href}>
						<Code>CTAProvider</Code>
					</Anchor>
				</li>
			</ul>}
		</li>
		<li>
			<Anchor aria-label="return cta paramater link" href={returnCtaParameterConfig.href}>
				<Code>returnCTAParameter</Code>
			</Anchor>
		</li>
	</>;
}
