import BuiltInLink from '../../../../links/built-in';
import {
	useCTAParameterActionsConfig,
} from '../../../../nav-sidebar/config/use-cta-config';
import { useCTAReturnValues1DispatchConfig, } from '../../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import RelatedLiCreateCTA from '../../../../related-li/create-cta-li';
import RelatedLiCreateCTASelector from '../../../../related-li/create-cta-selector-li';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';
import CodeBlockSource from '../../../../ui/codeBlock/Source';
import Content from '../../../../ui/content';
import Sect from '../../../../ui/sect';
import RelatedLiUseCTACommon from '../../../../related-li/common-cta-li';
import UseCTAParameterActionsCustomTopic from './UseCTAParameterActionsCustom';
import UseCTAParameterActionsOverridableTopic from './UseCTAParameterActionsOverridable';

export default function UseCTAParameterActionsTopic() {
	return <>
		<Sect {...useCTAParameterActionsConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					<Code>object</Code>
					that is a related parameter for:
				</p>
				<ul className="list-inside list-[square]">
					<RelatedLiCreateCTA />
					<RelatedLiCreateCTASelector />
					<RelatedLiUseCTACommon includeCTAProvide={false} />
				</ul>
				<CodeBlockSource src="types/UseCTAParameterActionsRecordProp.ts" />
				<b>Features</b>

				<ul className="list-inside list-[square]">
					<li>Maintains full TypeScript type safety.</li>
					<li>Defines reusable state operations.</li>
					<li>
						Encapsulate your state logic while keeping your component code focused
						on presentation.
					</li>
					<li>
						Can be called via
						{' '}
						<Anchor
							href={useCTAReturnValues1DispatchConfig.href}
							aria-label={`Link to ${useCTAReturnValues1DispatchConfig.title} section`}>
							<Code>dispatch.cta</Code>
							{' '}
							or
							{' '}
							<Code>dispatch</Code>
						</Anchor>
					</li>
					<li>
						Can override
						{' '}
						<BuiltInLink />
					</li>
					<li>
						Custom actions accept multiple parameters and can access all
						{' '}
						<BuiltInLink />
						{' '}
						behaviors.
					</li>
				</ul>
			</Content>
		</Sect>

		<UseCTAParameterActionsOverridableTopic />

		<UseCTAParameterActionsCustomTopic />
	</>;
}
