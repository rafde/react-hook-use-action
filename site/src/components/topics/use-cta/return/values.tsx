import StateHistoryLink from '../../../links/state-history';

import {
	useCTAReturnValues0HistoryConfig,
	useCTAReturnValuesConfig,
} from '../../../nav-sidebar/config/use-cta-config';
import { useCTAParameterCreateFuncConfig, } from '../../../nav-sidebar/config/use-cta-parameter-create-func-config';
import {
	useCTAReturnValues1DispatchConfig,
	useCTAReturnValuesDispatchFuncConfig,
	useCTAReturnValuesDispatchHistoryConfig,
} from '../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlockSource from '../../../ui/codeBlock/Source';
import Content from '../../../ui/content';
import Sect from '../../../ui/sect';
import { UseCTAReturnValuesDispatchCTATopic, } from './values-dispatch-cta';

export default function UseCTAReturnValuesTopic() {
	return <>
		<Sect {...useCTAReturnValuesConfig}>
			<CodeBlockSource src="types/UseCTAReturnType.ts" />
			<Content>
				<p>
					<Code>useCTA</Code>
					{' '}
					returns a
					{' '}
					<Code>type</Code>
					-safe
					{' '}
					<Code>array</Code>
					{' '}
					with two elements:
				</p>
				<ol className="list-inside list-decimal">
					<li>
						<Code>{'CTAHistory<Initial>'}</Code>
						: Maintains hook state history and change tracking.
					</li>
					<li>
						<Code>dispatch</Code>
						: Dispatch function to trigger actions.
					</li>
				</ol>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues0HistoryConfig}>
			<CodeBlockSource src="types/CTAHistory.ts" />
			<Content>
				<div>
					If a call-to-action is successful, it will return a
					{' '}
					<Code>CTAHistory</Code>
					{' '}
					.
					{' '}
				</div>
				<div>
					If an action returns
					{' '}
					<Code>undefined</Code>
					{' '}
					or the payload does not produce a state change, this value&apos;s reference will
					{' '}
					<b>not</b>
					{' '}
					change since re-render was
					{' '}
					<b>not</b>
					{' '}
					triggered.
				</div>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchConfig}>
			<CodeBlockSource src="types/UseCTAReturnTypeDispatch.ts" />
			<Content>
				<div>
					Gives you access to the
					{' '}
					<Code>dispatch</Code>
					{' '}
					function which allows you to trigger
					{' '}
					<StateHistoryLink />
					{' '}
					changes through actions.
				</div>
				<div>
					Re-render will not occur if the state does not change or if the callback returns
					{' '}
					<Code>undefined</Code>
					.
				</div>
				<p>
					The following actions are available:
				</p>
			</Content>
		</Sect>

		<UseCTAReturnValuesDispatchCTATopic />

		<Sect {...useCTAReturnValuesDispatchHistoryConfig}>
			<Content>
				<p>
					A read-only reference to the
					{' '}
					<StateHistoryLink />
					,
					in case you need to read it from somewhere that doesn&apos;t need as a dependency.
				</p>
			</Content>
		</Sect>
		<Sect {...useCTAReturnValuesDispatchFuncConfig}>
			<CodeBlockSource src="UseCTAParameterCreateFuncReturnRecord" />
			<Content>
				<p>
					An
					{' '}
					<Code>object</Code>
					{' '}
					that is the result of
					{' '}
					<Anchor href={useCTAParameterCreateFuncConfig.href} aria-label={useCTAParameterCreateFuncConfig.title}>
						<Code>createFunc</Code>
					</Anchor>
				</p>
			</Content>
		</Sect>
	</>;
}
