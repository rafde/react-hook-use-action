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
import {
	useCTAReturnValues1DispatchCTACustomActionConfig,
} from '../../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../../../../popover/ctaHistory';
import PopoverUseCTAParameterActionsOverridableRecord from '../../../../popover/UseCTAParameterActionsOverridableRecord';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';
import CodeBlock from '../../../../ui/codeBlock';
import Content from '../../../../ui/content';
import ExampleDetails from '../../../../ui/exampleDetails';
import Sect from '../../../../ui/sect';

const actionsClassName = 'inline-grid gap-2 w-[calc(100%-2rem)] grid-cols-1 sm:grid-cols-2 items-start';

export default function UseCTAParameterActionsCustomTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterActionsCustomConfig}>
			<Content>
				<i>Optional</i>
				<p>
					Calls from
					{' '}
					<Anchor aria-label="Link to dispatch.cta.YourCustomAction" href={useCTAReturnValues1DispatchCTACustomActionConfig.href}>
						<Code>dispatch.cta.YourCustomAction</Code>
					</Anchor>
				</p>
			</Content>
			<CodeBlock>{props.sourceCodeRecord.UseCTAParameterActionsCustomRecord}</CodeBlock>
			<Content>
				<i>Optional</i>
				<p>
					Custom actions are a powerful way to extend the functionality of your state management system.
					You can define as many as you need.
				</p>
				<p>This gives you the flexibility to:</p>
				<ul className="list-inside list-[square]">
					<li>Create domain-specific actions.</li>
					<li>Encapsulate complex state updates.</li>
					<li>Build reusable action patterns.</li>
					<li>Handle specialized business logic.</li>
				</ul>
				<p>
					They are defined as a record of functions, where the key is the action name and the value is the
					function that accepts any number of parameters.
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
					but you can customize them to behave like any other built-in action through
					{' '}
					<Code>CustomCTAHistory</Code>
					.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAParameterActionsParameterCustomParametersArgsConfig}>
			<Content>
				<b>Optional</b>
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
				<ul className="list-inside list-[square] space-y-2 pl-0">
					<li>
						<Code>undefined</Code>
						: Action will not be triggered. Return when you want to conditionally trigger an action.
					</li>
					<li>
						<Code>{'Partial<CTAState>'}</Code>
						: Behaves like an
						{' '}
						<Code>update</Code>
						{' '}
						action. It will use using overridden update action.
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{` CustomCTAHistory.updateAction(
   Partial<CTAState>, 
   { useDefault?: boolean } | undefined, 
 )`}
							</Code>
							<div>
								<p>
									: Behaves like an
									{' '}
									<Code>update</Code>
									{' '}
									action.
								</p>
								<p>
									<Code>{'{ useDefault: true }'}</Code>
									{' '}
									will bypass the overridden update action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{` CustomCTAHistory.replaceAction(
   CTAState, 
   { useDefault?: boolean } | undefined, 
 )`}
							</Code>
							<div>
								<p>
									: Behaves like an
									{' '}
									<Code>replace</Code>
									{' '}
									action.
								</p>
								<p>
									<Code>{'{ useDefault: true }'}</Code>
									{' '}
									will bypass the overridden replace action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{` CustomCTAHistory.resetAction(
   CTAState | undefined, 
   { useDefault?: boolean } | undefined, 
 )`}
							</Code>
							<div>
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
									will bypass the overridden reset action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{` CustomCTAHistory.updateInitialAction(
   Partial<CTAState> | undefined,
   { useDefault?: boolean } | undefined,
 )`}
							</Code>
							<div>
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
									will bypass the overridden updateInitial action behavior
								</p>
							</div>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{` CustomCTAHistory.replaceInitialAction(
   CTAState | undefined,
   { useDefault?: boolean } | undefined,
 )`}
							</Code>
							<div>
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
									will bypass the overridden replaceInitial action behavior
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
					<PopoverUseCTAParameterActionsOverridableRecord {...props} />
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
