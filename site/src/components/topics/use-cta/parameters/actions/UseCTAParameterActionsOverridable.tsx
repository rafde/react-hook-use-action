import { SourceCodeRecordProps, } from '../../../../../types/source-code-record-props';
import { useCTAParameterTransformConfig, } from '../../../../nav-sidebar/config/use-cta-config';

import {
	useCTAParameterActionsOverridableConfig,
	useCTAParameterActionsOverridableExampleConfig,
	useCTAParameterActionsOverridableParameterActionsReplaceConfig,
	useCTAParameterActionsOverridableParameterActionsReplaceInitialConfig,
	useCTAParameterActionsOverridableParameterActionsResetConfig,
	useCTAParameterActionsOverridableParameterActionsUpdateConfig,
	useCTAParameterActionsOverridableParameterActionsUpdateInitialConfig,
	useCTAParameterActionsOverridableParameterCTAHistoryConfig,
} from '../../../../nav-sidebar/config/use-cta-parameter-actions-override-built-in-config';
import {
	useCTAReturnValues1DispatchCTAReplaceConfig,
	useCTAReturnValues1DispatchCTAReplaceInitialConfig,
	useCTAReturnValues1DispatchCTAResetConfig,
	useCTAReturnValues1DispatchCTAUpdateConfig,
	useCTAReturnValues1DispatchCTAUpdateInitialConfig,
} from '../../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';
import CodeBlock from '../../../../ui/codeBlock';
import Content from '../../../../ui/content';
import Embed from '../../../../ui/embed';
import Sect from '../../../../ui/sect';

export default function UseCTAParameterActionsOverridableTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterActionsOverridableConfig}>
			<Content>
				<i>Optional</i>
				<p>Alternative to overriding built-in actions.</p>
				<Anchor aria-label="Link to useCTA Parameter transform" href={useCTAParameterTransformConfig.href}>{useCTAParameterTransformConfig.desc}</Anchor>
			</Content>
			<CodeBlock copyButton={false}>{props.sourceCodeRecord.UseCTAParameterActionsOverridable}</CodeBlock>
			<Content>
				<p>
					All built-in call-to-actions (CTA) can have their behaviors extended or modified.
				</p>
				<p>This pattern enables:</p>
				<ul className="list-inside list-[square]">
					<li>Adding custom validation.</li>
					<li>Transforming data.</li>
					<li>Adding side effects.</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableExampleConfig}>
			<Embed
				title="react-hook-use-cta useCTA overridable actions parameter example"
				src="https://stackblitz.com/edit/use-cta-override-actions-tdgkwq3j-jmgwenlh-hwagiq3y?ctl=1&embed=1&file=src%2FOverrideActions.tsx"
			/>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterCTAHistoryConfig}>
			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAHistory.ts' ]}</CodeBlock>
			<Content>
				<p>
					The first parameter every overridable action receives.
				</p>
				<p>
					Contains the following properties:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>current</Code>
						: The current hook state.
					</li>

					<li>
						<Code>previous</Code>
						: The previous
						{' '}
						<Code>current</Code>
						{' '}
						state object before it was last updated.
						<div>
							Starts of as
							{' '}
							<Code>null</Code>
							{' '}
							until
							{' '}
							<Code>current</Code>
							{' '}
							state is updated.
						</div>
					</li>

					<li>
						<Code>changes</Code>
						{': '}
						Values from
						{' '}
						<Code>current</Code>
						{' '}
						state that differ from values in
						{' '}
						<Code>initial</Code>
						{' '}
						state.
						<div>
							Is
							{' '}
							<Code>null</Code>
							{' '}
							if the there are no differences between
							{' '}
							<Code>initial</Code>
							{' '}
							and
							{' '}
							<Code>current</Code>
							{' '}
							state.
						</div>
						<p>
							Useful for tracking changes to state properties and to send only the changes to an API.
						</p>
					</li>

					<li>
						<Code>initial</Code>
						: Typically, the state the hook was initialized with.
						Can be updated to reflect a point of synchronization.
					</li>

					<li>
						<Code>previousInitial</Code>
						: The previous
						{' '}
						<Code>initial</Code>
						{' '}
						state object before it was last updated.
						<div>
							Starts of as
							{' '}
							<Code>null</Code>
							{' '}
							until
							{' '}
							<Code>initial</Code>
							{' '}
							state is updated.
						</div>
					</li>

				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterActionsUpdateConfig}>
			<Content>
				<i>Optional</i>
				<div>
					Called by
					{' '}
					<Anchor aria-label="Link to dispatch.cta.update" href={useCTAReturnValues1DispatchCTAUpdateConfig.href}>
						<Code>dispatch.cta.update</Code>
					</Anchor>
				</div>
				<CodeBlock>{props.sourceCodeRecord.UseCTAParameterActionsRecordPropUpdate}</CodeBlock>
				<div>
					<Code>payload</Code>
					{' '}
					updates specific
					{' '}
					<Code>CTAHistory.current</Code>
					{' '}
					state properties while preserving other values.
				</div>
				<p>
					Overriding lets you return:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>{'Partial<Payload>'}</Code>
					</li>
					<li>
						<Code>undefined</Code>
						:
						{' '}
						Useful when you want to conditionally trigger the action.
					</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterActionsReplaceConfig}>
			<Content>
				<p><i>Optional</i></p>
				<p>
					Called by
					{' '}
					<Anchor aria-label="Link to dispatch.cta.replace" href={useCTAReturnValues1DispatchCTAReplaceConfig.href}>
						<Code>dispatch.cta.replace</Code>
					</Anchor>
				</p>
				<CodeBlock>{props.sourceCodeRecord.UseCTAParameterActionsRecordPropReplace}</CodeBlock>
				<div>
					<Code>payload</Code>
					{' '}
					replaces all
					{' '}
					<Code>CTAHistory.current</Code>
					{' '}
					property values with new property values.
				</div>
				<p>
					Overriding lets you return:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>Payload</Code>
					</li>
					<li>
						<Code>undefined</Code>
						:
						{' '}
						Useful when you want to conditionally trigger the action.
					</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterActionsResetConfig}>
			<Content>
				<p><i>Optional</i></p>
				<div>
					Called by
					{' '}
					<Anchor aria-label="Link to dispatch.cta.reset" href={useCTAReturnValues1DispatchCTAResetConfig.href}>
						<Code>dispatch.cta.reset</Code>
					</Anchor>
				</div>
				<CodeBlock>{props.sourceCodeRecord.UseCTAParameterActionsRecordPropReset}</CodeBlock>
				<div>
					Reset can do the following based on what
					{' '}
					<Code>payload</Code>
					{' '}
					it receives.
				</div>
				<ul className="list-inside list-[square]">
					<li>
						<Code>undefined</Code>
						:
						{' '}
						resets the
						{' '}
						<Code>CTAHistory.current</Code>
						{' '}
						state back to the
						{' '}
						<Code>CTAHistory.initial</Code>
						{' '}
						state.
					</li>
					<li>
						<Code>payload</Code>
						:
						{' '}
						sets
						{' '}
						<Code>CTAHistory.current</Code>
						{' '}
						and
						{' '}
						<Code>CTAHistory.initial</Code>
						{' '}
						state to equal
						{' '}
						<Code>payload</Code>
						.
					</li>
				</ul>
				<p>
					Overriding lets you return:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>Payload</Code>
					</li>
					<li>
						<Code>undefined</Code>
						:
						{' '}
						Useful when you want to conditionally trigger the action.
					</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterActionsUpdateInitialConfig}>
			<Content>
				<p><i>Optional</i></p>
				<p>
					Called by
					{' '}
					<Anchor aria-label="Link to dispatch.cta.updateInitial" href={useCTAReturnValues1DispatchCTAUpdateInitialConfig.href}>
						<Code>dispatch.cta.updateInitial</Code>
					</Anchor>
				</p>
				<CodeBlock>{props.sourceCodeRecord.UseCTAParameterActionsRecordPropUpdateInitial}</CodeBlock>
				<div>
					<Code>payload</Code>
					{' '}
					updates specific
					{' '}
					<Code>CTAHistory.initial</Code>
					{' '}
					state properties while preserving other values.
				</div>
				<p>
					Overriding lets you return:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>{'Partial<Payload>'}</Code>
					</li>
					<li>
						<Code>undefined</Code>
						:
						{' '}
						Useful when you want to conditionally trigger the action.
					</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterActionsReplaceInitialConfig}>
			<Content>
				<p><i>Optional</i></p>
				<div>
					Called by
					{' '}
					<Anchor
						aria-label="Link to dispatch.cta.replaceInitial"
						href={useCTAReturnValues1DispatchCTAReplaceInitialConfig.href}>
						<Code>dispatch.cta.replaceInitial</Code>
					</Anchor>
				</div>
				<CodeBlock>{props.sourceCodeRecord.UseCTAParameterActionsRecordPropReplaceInitial}</CodeBlock>
				<div>
					<Code>payload</Code>
					{' '}
					replaces all
					{' '}
					<Code>CTAHistory.initial</Code>
					{' '}
					property values with new property values.
				</div>
				<p>
					Overriding lets you return:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>Payload</Code>
					</li>
					<li>
						<Code>undefined</Code>
						:
						{' '}
						Useful when you want to conditionally trigger the action.
					</li>
				</ul>
			</Content>
		</Sect>
	</>;
}
