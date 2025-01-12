import BuiltInLink from '../../../links/built-in';
import CTAHistoryLink from '../../../links/cta-history';
import CustomActionLink from '../../../links/custom-action';
import {
	useCTAParameterActionsConfig,
	useCTAParameterTransformConfig,
	useCTAParameterTransformExampleConfig, useCTATransformParameterConfig, useCTATransformReturnConfig,
} from '../../../nav-sidebar/config/use-cta-config';
import RelatedLiCreateCTA from '../../../related-li/create-cta-li';
import RelatedLiCreateCTASelector from '../../../related-li/create-cta-selector-li';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlockSource from '../../../ui/codeBlock/Source';
import Content from '../../../ui/content';
import Embed from '../../../ui/embed';
import Sect from '../../../ui/sect';
import RelatedLiUseCTACommon from '../../../related-li/common-cta-li';

export function UseCTAParameterTransformTopic() {
	return <>
		<Sect {...useCTAParameterTransformConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback that is a related parameter for:
				</p>

				<ul className="list-inside list-[square]">
					<RelatedLiCreateCTA />
					<RelatedLiCreateCTASelector />
					<RelatedLiUseCTACommon />
				</ul>
				<CodeBlockSource src="types/UseCTAParameterTransform.ts" />
				<p>
					This callback is an alternative to
					{' '}
					<Anchor aria-label={useCTAParameterActionsConfig.title} href={useCTAParameterActionsConfig.href}>
						{useCTAParameterActionsConfig.desc}
					</Anchor>
					{'. '}
					It can read the result of all actions and is useful when:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						transforming all action
						{' '}
						<Code>CTAState</Code>
						{' '}
						results from a single point.
					</li>
					<li>
						you don&apos;t want to override every built-in action to do the same changes to
						{' '}
						<Code>CTAState</Code>
						.
					</li>
					<li>adding custom validation.</li>
					<li>adding side effects.</li>
				</ul>

				<p>The order this works is as follows</p>
				<ul className="list-inside list-decimal">
					<li>
						If custom or overridden action from
						{' '}
						<Code>actions</Code>
						{' '}
						is defined, call it. Otherwise, continue.
					</li>
					<li>
						If
						{' '}
						<Code>transform</Code>
						{' '}
						returns
						<ul className="list-inside list-[square] pl-5">
							<li>
								<Code>undefined</Code>
								{': '}
								don&apos;t trigger action.
							</li>
							<li>
								<Code>CTAState</Code>
								{' or '}
								<Code>{'Partial<CTAState>'}</Code>
								{': '}
								continue triggering action.
							</li>
						</ul>
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterTransformExampleConfig} Header="h5">
			<Embed
				title="react-hook-use-cta useCTA parameter transform example"
				src="https://stackblitz.com/edit/use-cta-transform-tdgkwq3j-kyc7wvdw-udamtqvj?ctl=1&embed=1&file=src%2FUseCTATransform.tsx"
			/>
		</Sect>
		<Sect {...useCTATransformParameterConfig}>
			<Content>
				<ol className="list-inside list-decimal">
					<li>
						<Code>nextState</Code>
						{': '}
						<Code>CTAState</Code>
						{' '}
						or
						<Code>{'Partial<CTAState>'}</Code>
						{'. '}
						It depends the
						{' '}
						<Code>actionType</Code>
						{' '}
						it is behaving like.
					</li>
					<li>
						<Code>transformCTAHistory</Code>
						{': '}
						<CTAHistoryLink />
						{' '}
						with two extra keys:
						<ul className="list-inside list-[square] pl-5">
							<li>
								<Code>actionType</Code>
								{': '}
								The name of the
								{' '}
								<BuiltInLink />
								{' '}
								type it will behave like.
							</li>
							<li>
								<Code>customAction</Code>
								{': '}
								The name of the
								{' '}
								<CustomActionLink />
								{' '}
								that called it. Otherwise,
								{' '}
								<Code>undefined</Code>
								.
							</li>
						</ul>
					</li>
				</ol>
			</Content>
		</Sect>
		<Sect {...useCTATransformReturnConfig}>
			<Content>
				<p>
					Return value can be:
				</p>
				<ul className="list-inside list-[square]">
					<li><Code>CTAState</Code></li>
					<li><Code>{'Partial<CTAState>'}</Code></li>
					<li>
						<Code>undefined</Code>
						{': '}
						action will not be triggered.
					</li>
				</ul>
				<p>
					depending on the
					{' '}
					<Code>transformCTAHistory.actionType</Code>
					{' '}
					value.
				</p>
			</Content>
		</Sect>
	</>;
}
