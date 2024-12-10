import { SourceCodeRecordProps, } from '../../../../../types/source-code-record-props';

import {
	useCTAParameterActionsCustomConfig,
	useCtaParameterActionsCustomExampleConfig,
	useCTAParameterActionsCustomReturnConfig,
	useCTAParameterActionsParameterCustomCTAHistoryConfig,
	useCTAParameterActionsParameterCustomParametersArgsConfig,
} from '../../../../nav-sidebar/config/use-cta-parameter-actions-custom-config';
import {
	useCTAParameterActionsOverridableConfig,
} from '../../../../nav-sidebar/config/use-cta-parameter-actions-override-built-in-config';
import PopoverCTAHistory from '../../../../popover/ctaHistory';
import PopoverDefaultActionsRecord from '../../../../popover/defaultActionsRecord';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';
import CodeBlock from '../../../../ui/codeBlock';
import Content from '../../../../ui/content';
import ExampleDetails from '../../../../ui/exampleDetails';
import Sect from '../../../../ui/sect';

export default function UseCTAParameterActionsCustomTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterActionsCustomConfig}>
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterActionsCustomRecord.ts' ]}</CodeBlock>
			<Content>
				<p>
					Custom actions are a powerful way to extend the functionality of your state management system.
					This gives you the flexibility to:
				</p>
				<ul className="list-inside list-[square]">
					<li>Create domain-specific actions</li>
					<li>Encapsulate complex state updates</li>
					<li>Build reusable action patterns</li>
					<li>Handle specialized business logic</li>
				</ul>
				<p>
					They are defined as a record of functions, where the key is the action name and the value is the
					function that accepts any number of parameters.
				</p>
				<p>
					Parameters are
					{' '}
					<i>optional</i>
					.
				</p>
			</Content>
		</Sect>

		<Sect {...useCtaParameterActionsCustomExampleConfig}>
			<ExampleDetails
				summary={<>
					Click to view
					{' '}
					<Code>useCTA</Code>
					{' '}
					<Code>custom actions</Code>
					{' '}
					example
				</>}
				title="react-hook-use-cta useCTA custom actions example"
				src="https://codesandbox.io/embed/c4wz5p?view=editor+%2B+preview&module=%2Fsrc%2FUseCTACustomActionsExample.tsx"
			/>
		</Sect>

		<Sect {...useCTAParameterActionsParameterCustomCTAHistoryConfig}>
			<CodeBlock>{props.sourceCodeRecord[ 'types/CustomCTAHistory.ts' ]}</CodeBlock>
			<Content>
				<p>
					The first parameter of the function is read-only
					{' '}
					<Code>CustomCTAHistory</Code>
					{' '}
					which extends from
					{' '}
					<Code>CTAHistory</Code>
					{' '}
					<PopoverCTAHistory {...props} />
				</p>
				<p>
					and gives you access to all the built-in action behaviors.
				</p>
				<p>
					By default, custom actions behave as an
					{' '}
					<Code>update</Code>
					,
					but you can customize them to behave like any other
				</p>
				<p>
					built-in action through
					{' '}
					<Code>CustomCTAHistory</Code>
					.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsParameterCustomParametersArgsConfig}>
			<Content>
				<p>
					Custom actions can have any number of
					{' '}
					<Code>args</Code>
					{' '}
					after the
					{' '}
					<Code>CustomCTAHistory</Code>
					{' '}
					parameter.
				</p>
				<p>
					These
					{' '}
					<Code>args</Code>
					{' '}
					can be of any type you can specify to ensure type safety,
				</p>
				<p>
					and they will be passed to the action function when it is called.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsCustomReturnConfig}>
			<Content>
				<p>
					Custom actions can return several different types of values, depending on action type you want it to behave
					like.
				</p>
				<ul className="list-inside list-[square] space-y-2">
					<li>
						<Code>undefined</Code>
						: Action will not be triggered. Return when you want to conditionally trigger an action.
					</li>
					<li>
						<Code>{'Partial<CTAState>'}</Code>
						: This will have it behave like an
						{' '}
						<Code>update</Code>
						{' '}
						action. It will use using overridden
						{' '}
						<Code>update</Code>
						.
					</li>
					<li>
						<article className="inline-flex">
							<Code>
								{`CustomCTAHistory.updateAction(
  Partial<CTAState>,
  { useDefault?: boolean } | undefined,
)`}
							</Code>
							<div className="pl-2">
								<p>
									: This will have it behave like an
									{' '}
									<Code>update</Code>
									{' '}
									action.
								</p>
								<p>
									<Code>{'{ useDefault: true }'}</Code>
									{' '}
									will bypass the overridden action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className="inline-flex">
							<Code>
								{`CustomCTAHistory.replaceAction(
  CTAState,
  { useDefault?: boolean } | undefined,
)`}
							</Code>
							<div className="pl-2">
								<p>
									: This will have it behave like an
									{' '}
									<Code>replace</Code>
									{' '}
									action.
								</p>
								<p>
									<Code>{'{ useDefault: true }'}</Code>
									{' '}
									will bypass the overridden action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className="inline-flex">
							<Code>
								{`CustomCTAHistory.resetAction(
  CTAState | undefined,
  { useDefault?: boolean } | undefined,
)`}
							</Code>
							<div className="pl-2">
								<p>
									: Behaves like an
									{' '}
									<Code>reset</Code>
									{' '}
									action.
								</p>
								<p>
									<Code>{'{ useDefault: true }'}</Code>
									{' '}
									will bypass the overridden action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className="inline-flex">
							<Code>
								{`CustomCTAHistory.updateInitialAction(
  Partial<CTAState> | undefined,
  { useDefault?: boolean } | undefined,
)
`}
							</Code>
							<div className="pl-2">
								<p>
									: Behaves like an
									{' '}
									<Code>updateInitial</Code>
									{' '}
									action.
								</p>
								<p>
									<Code>{'{ useDefault: true }'}</Code>
									{' '}
									will bypass the overridden action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className="inline-flex">
							<Code>
								{`CustomCTAHistory.replaceInitialAction(
  CTAState | undefined,
  { useDefault?: boolean } | undefined,
)`}
							</Code>
							<div className="pl-2">
								<p>
									: Behaves like an
									{' '}
									<Code>replaceInitial</Code>
									{' '}
									action.
								</p>
								<p>
									<Code>{'{ useDefault: true }'}</Code>
									{' '}
									will bypass the overridden action behavior
								</p>
							</div>
						</article>
					</li>
				</ul>
				<p>
					<b>Note</b>
					: If you have
					{' '}
					<Anchor href={useCTAParameterActionsOverridableConfig.href} aria-label="Link to overridden built-in actions">
						overridden the built-in
					</Anchor>
					{' '}
					<PopoverDefaultActionsRecord {...props} />
					{' '}
					actions, the custom action will use the overridden action.
				</p>
				<p>
					Sending
					{' '}
					<Code>{'{ useDefault: true }'}</Code>
					{' '}
					will bypass the overridden action and behave using default action.
				</p>
			</Content>
		</Sect>
	</>;
}
