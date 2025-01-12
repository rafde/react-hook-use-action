import FastEqualsLink from '../../../links/fast-equals';

import { useCTAParameterInitialConfig, } from '../../../nav-sidebar/config/use-cta-config';
import StrictDeepEqualLink from '../../../links/strict-deep-equal';
import RelatedLiCreateCTA from '../../../related-li/create-cta-li';
import RelatedLiCreateCTASelector from '../../../related-li/create-cta-selector-li';
import Code from '../../../ui/code';
import CodeBlockSource from '../../../ui/codeBlock/Source';
import Content from '../../../ui/content';
import Sect from '../../../ui/sect';
import RelatedLiUseCTACommon from '../../../related-li/common-cta-li';

export default function UseCTAParameterInitialTopic() {
	return <Sect {...useCTAParameterInitialConfig}>
		<Content>
			<b>Required</b>
			<p>
				Representing the
				{' '}
				<Code>initial</Code>
				{' '}
				base state structure.
			</p>
			<p>This is a related parameter for:</p>
			<ul className="list-inside list-[square]">
				<RelatedLiCreateCTA />
				<RelatedLiCreateCTASelector />
				<RelatedLiUseCTACommon />
			</ul>
			<CodeBlockSource src="types/CTAState.ts" />
			<p>
				Property values can be anything that
				{' '}
				<StrictDeepEqualLink />
				{' '}
				from
				{' '}
				<FastEqualsLink />
				{' '}
				supports.
			</p>
		</Content>
	</Sect>;
}
