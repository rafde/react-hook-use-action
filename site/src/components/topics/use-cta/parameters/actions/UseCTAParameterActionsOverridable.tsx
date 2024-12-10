import { SourceCodeRecordProps, } from '../../../../../types/source-code-record-props';

import {
	useCTAParameterActionsOverridableConfig, useCTAParameterActionsOverridableExampleConfig,
	useCTAParameterActionsOverridableParameterCTAHistoryConfig,
	useCTAParameterActionsOverridableParameterPayloadConfig,
	useCTAParameterActionsOverridableReturnConfig,
} from '../../../../nav-sidebar/config/use-cta-parameter-actions-override-built-in-config';
import PopoverDefaultActionsRecord from '../../../../popover/defaultActionsRecord';
import Code from '../../../../ui/code';
import CodeBlock from '../../../../ui/codeBlock';
import Content from '../../../../ui/content';
import ExampleDetails from '../../../../ui/exampleDetails';
import Sect from '../../../../ui/sect';

export default function UseCTAParameterActionsOverridableTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterActionsOverridableConfig}>
			<CodeBlock copyButton={false}>{props.sourceCodeRecord[ 'types/DefaultActionsRecord.ts' ]}</CodeBlock>
			<Content>
				<p>
					All built-in call-to-actions (CTA) can have their behaviors extended or modified.
				</p>
				<p>This pattern enables:</p>
				<ul className="list-inside list-[square]">
					<li>Adding custom validation</li>
					<li>Transforming data</li>
					<li>Adding side effects</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableExampleConfig}>
			<ExampleDetails
				summary={<>
					Click to view
					{' '}
					<Code>useCTA</Code>
					{' '}
					overridable
					{' '}
					<Code>actions</Code>
					{' '}
					parameter example
				</>}
				title="react-hook-use-cta useCTA overridable actions parameter example"
				src="https://codesandbox.io/embed/n8648p?view=editor+%2B+preview&module=%2Fsrc%2FOverrideActions.tsx"
			/>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterCTAHistoryConfig}>
			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAHistory.ts' ]}</CodeBlock>
			<Content>
				<p>Gives you access to the complete read-only state object containing:</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>current</Code>
						: The current hook state
					</li>

					<li>
						<Code>previous</Code>
						: The previous
						{' '}
						<Code>current</Code>
						{' '}
						state object before the last update.
						<p>
							Starts of as
							{' '}
							<Code>null</Code>
							{' '}
							until
							{' '}
							<Code>current</Code>
							{' '}
							state is updated.
						</p>
					</li>

					<li>
						<Code>changes</Code>
						: The changes between the
						{' '}
						<Code>initial</Code>
						{' '}
						state and the
						{' '}
						<Code>current</Code>
						{' '}
						state.
						<p>
							Is
							{' '}
							<Code>null</Code>
							{' '}
							if the there are no differences between the
							{' '}
							<Code>initial</Code>
							{' '}
							and
							{' '}
							<Code>current</Code>
							{' '}
							state.
						</p>
					</li>

					<li>
						<Code>initial</Code>
						: The initial state of the hook.
						Can be updated to reflect a point of synchronization.
					</li>

					<li>
						<Code>previousInitial</Code>
						: The previous
						{' '}
						<Code>initial</Code>
						{' '}
						state object before the last update.
						<p>
							Starts of as
							{' '}
							<Code>null</Code>
							{' '}
							until
							{' '}
							<Code>initial</Code>
							{' '}
							state is updated.
						</p>
					</li>

				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableParameterPayloadConfig}>
			<Content>
				<p>
					The second parameter is the expected signature of the overridden action
					(please refer to
					{' '}
					<a
						aria-label={`Link to ${useCTAParameterActionsOverridableConfig.title}`}
						href={`#${useCTAParameterActionsOverridableConfig.href}`}
						className="underline">
						<Code>DefaultActionsRecord</Code>
					</a>
					{' '}
					<PopoverDefaultActionsRecord {...props} />
					{' '}
					type).
				</p>

				<ul className="list-inside list-[square]">
					<li>
						<Code>replace</Code>
						:
						{' '}
						<Code>CTAState</Code>
					</li>
					<li>
						<Code>replaceInitial</Code>
						:
						{' '}
						<Code>CTAState</Code>
					</li>
					<li>
						<Code>reset</Code>
						:
						{' '}
						<Code>CTAState</Code>
						{' '}
						or
						{' '}
						<Code>undefined</Code>
						{' '}
						<p>
							Note: sending
							{' '}
							<Code>undefined</Code>
							{' '}
							will reset the hook state to it's
							{' '}
							<Code>initial</Code>
							{' '}
							state.
						</p>
					</li>
					<li>
						<Code>update</Code>
						:
						{' '}
						<Code>{'Partial<CTAState>'}</Code>
					</li>
					<li>
						<Code>updateInitial</Code>
						:
						{' '}
						<Code>{'Partial<CTAState>'}</Code>
					</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsOverridableReturnConfig}>
			<Content>
				<p>
					The expected return signature of the overridden action
					(please refer to
					{' '}
					<a
						aria-label={`Link to ${useCTAParameterActionsOverridableConfig.title}`}
						href={`#${useCTAParameterActionsOverridableConfig.href}`}
						className="underline"
					>
						<Code>DefaultActionsRecord</Code>
					</a>
					{' '}
					<PopoverDefaultActionsRecord {...props} />
					{' '}
					type).
				</p>
				<p>
					If the action returns
					{' '}
					<Code>undefined</Code>
					, the action will not be triggered.
				</p>

				<ul className="list-inside list-[square]">
					<li>
						<Code>replace</Code>
						:
						{' '}
						<Code>CTAState</Code>
						{' '}
						or
						{' '}
						<Code>undefined</Code>
					</li>
					<li>
						<Code>replaceInitial</Code>
						:
						{' '}
						<Code>CTAState</Code>
						{' '}
						or
						{' '}
						<Code>undefined</Code>
					</li>
					<li>
						<Code>reset</Code>
						:
						{' '}
						<Code>CTAState</Code>
						{' '}
						or
						{' '}
						<Code>undefined</Code>
					</li>
					<li>
						<Code>update</Code>
						:
						{' '}
						<Code>{'Partial<CTAState>'}</Code>
						{' '}
						or
						{' '}
						<Code>undefined</Code>
					</li>
					<li>
						<Code>updateInitial</Code>
						:
						{' '}
						<Code>{'Partial<CTAState>'}</Code>
						{' '}
						or
						{' '}
						<Code>undefined</Code>
					</li>
				</ul>
			</Content>
		</Sect>
	</>;
}
