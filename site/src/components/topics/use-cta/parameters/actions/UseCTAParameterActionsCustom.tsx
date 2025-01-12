import BuiltInLink from '../../../../links/built-in';
import CTAHistoryLink from '../../../../links/cta-history';
import DispatchYourCustomActionLink from '../../../../links/dispatch-you-custom-action';

import {
	useCTAParameterActionsCustomConfig,
	useCtaParameterActionsCustomExampleConfig,
	useCTAParameterActionsCustomReturnConfig,
	useCTAParameterActionsParameterCustomCTAHistoryConfig,
	useCTAParameterActionsParameterCustomParametersArgsConfig,
} from '../../../../nav-sidebar/config/use-cta-parameter-actions-custom-config';
import Code from '../../../../ui/code';
import CodeBlockSource from '../../../../ui/codeBlock/Source';
import Content from '../../../../ui/content';
import Embed from '../../../../ui/embed';
import Sect from '../../../../ui/sect';
import ReplaceActionDescription from './replace-action-description';
import ReplaceInitialActionDescription from './replace-initial-action-description';
import UpdateActionDescription from './update-action-description';
import UpdateInitialActionDescription from './update-initial-action-description';
import UseDefaultDescription from './use-default-description';

const actionsClassName = 'inline-grid gap-2 w-[calc(100%-2rem)] grid-cols-1 sm:grid-cols-2 items-start';

export default function UseCTAParameterActionsCustomTopic() {
	return <>
		<Sect {...useCTAParameterActionsCustomConfig}>
			<Content>
				<i>Optional</i>
				<div>
					Calls from
					{' '}
					<DispatchYourCustomActionLink />
				</div>
			</Content>
			<CodeBlockSource src="UseCTAParameterActionsCustomRecord" />
			<Content>
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
					They are defined as a
					{' '}
					<Code>Record</Code>
					{' '}
					of
					{' '}
					<Code>function</Code>
					s, where the:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						key: can be a
						{' '}
						<Code>string | number</Code>
						{' '}
						as the action name
					</li>
					<li>
						value: is a
						{' '}
						<Code>function</Code>
						{' '}
						that accepts any number of
						{' '}
						<Code>type</Code>
						{' '}
						declared parameters.
					</li>
				</ul>
			</Content>
		</Sect>

		<Sect {...useCtaParameterActionsCustomExampleConfig}>
			<Embed
				title="react-hook-use-cta useCTA custom actions example"
				src="https://stackblitz.com/edit/use-cta-custom-actions-gtdgkwq3j-kyc7wvdw-boma7t5x?ctl=1&embed=1&file=src%2FUseCTACustomActions.tsx"
			/>
		</Sect>

		<Sect {...useCTAParameterActionsParameterCustomCTAHistoryConfig}>
			<CodeBlockSource src="types/CustomCTAHistory.ts" />
			<Content>
				<p>
					The first parameter of the function is read-only
					{' '}
					<Code>CustomCTAHistory</Code>
					{' '}
					which extends from
					{' '}
					<CTAHistoryLink />
					{' '}
					and gives you access to all the
					{' '}
					<BuiltInLink />
					{' '}
					behaviors.
				</p>
				<p>
					By default, custom actions behave as an
					{' '}
					<Code>update</Code>
					,
					but you can customize them to behave like any other
					{' '}
					<BuiltInLink />
					{' '}
					through
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
					<Code>type</Code>
					{' '}
					declared
					{' '}
					<Code>...args</Code>
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
					<Code>...args</Code>
					{' '}
					must have their
					{' '}
					<Code>type</Code>
					{' '}
					declared to ensure type safety.
				</p>
				<p>
					<Code>...args</Code>
					{' '}
					will come from calling
					{' '}
					<DispatchYourCustomActionLink />
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
						: Action will not be triggered. Useful when you want to conditionally trigger an action.
					</li>
					<li>
						<Code>{'Partial<CTAState>'}</Code>
						:
						{' '}
						<UpdateActionDescription />
						{' '}
						It will use using overridden
						{' '}
						<Code>update</Code>
						{' '}
						action.
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{`CustomCTAHistory.updateAction(
   Partial<CTAState>, 
   { useDefault?: boolean } | undefined, 
 )`}
							</Code>
							<section>
								:
								<UpdateActionDescription />
								<UseDefaultDescription actionTypeName="update" />
							</section>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{`
CustomCTAHistory.replaceAction(
   CTAState, 
   { useDefault?: boolean } | undefined, 
 )`.trim()}
							</Code>
							<section>
								:
								{' '}
								<ReplaceActionDescription />
								<UseDefaultDescription actionTypeName="replace" />
							</section>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{`
CustomCTAHistory.resetAction(
   CTAState | undefined, 
   { useDefault?: boolean } | undefined, 
 )`.trim()}
							</Code>
							<section>
								: Behaves like an
								{' '}
								<Code>reset</Code>
								{' '}
								action.
								<UseDefaultDescription actionTypeName="reset" />
							</section>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{`
CustomCTAHistory.updateInitialAction(
   Partial<CTAState> | undefined,
   { useDefault?: boolean } | undefined,
 )`.trim()}
							</Code>
							<section>
								:
								{' '}
								<UpdateInitialActionDescription />
								<UseDefaultDescription actionTypeName="updateInitial" />
							</section>
						</article>
					</li>
					<li>
						<article className={actionsClassName}>
							<Code>
								{
									`CustomCTAHistory.replaceInitialAction(
   CTAState | undefined,
   { useDefault?: boolean } | undefined,
 )`.trim()
								}
							</Code>
							<section>
								:
								{' '}
								<ReplaceInitialActionDescription />
								<UseDefaultDescription actionTypeName="replaceInitial" />
							</section>
						</article>
					</li>
				</ul>
				<p>
					<b>Note</b>
					: If you have overridden a
					{' '}
					<BuiltInLink />
					, the custom action will use the overridden action.
				</p>
				<p>
					Sending
					{' '}
					<Code>{'{ useDefault: true }'}</Code>
					{' '}
					will bypass the overridden action and behave using built-in action behavior.
				</p>
			</Content>
		</Sect>
	</>;
}
