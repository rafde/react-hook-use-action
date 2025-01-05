import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';

import {
	useCTAReturnValues0HistoryConfig,
	useCTAReturnValuesConfig,

} from '../../../nav-sidebar/config/use-cta-config';
import {
	useCTAReturnValues1DispatchConfig,
	useCTAReturnValuesDispatchHistoryConfig,
} from '../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../../../popover/ctaHistory';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import Sect from '../../../ui/sect';
import { UseCTAReturnValuesDispatchCTATopic, } from './values-dispatch-cta';

export default function UseCTAReturnValuesTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAReturnValuesConfig}>
			<CodeBlock copyButton={false}>{props.sourceCodeRecord[ 'types/UseCTAReturnType.ts' ]}</CodeBlock>
			<Content>
				<div>
					<Code>useCTA</Code>
					{' '}
					returns a type-safe
					{' '}
					<Code>array</Code>
					{' '}
					with two elements for managing complex state operations
					while maintaining access to state history and change tracking.
				</div>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues0HistoryConfig}>
			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAHistory.ts' ]}</CodeBlock>
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
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAReturnTypeDispatch.ts' ]}</CodeBlock>
			<Content>
				<div>
					Gives you access to the
					{' '}
					<Code>dispatch</Code>
					{' '}
					function which allows you to trigger
					{' '}
					<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title}`}>
						state history
					</Anchor>
					{' '}
					<PopoverCTAHistory {...props} />
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
					The following built-in actions are available:
				</p>
			</Content>
		</Sect>

		<UseCTAReturnValuesDispatchCTATopic {...props} />

		<Sect {...useCTAReturnValuesDispatchHistoryConfig}>
			<Content>
				<div>
					A read-only reference to the
					{' '}
					<a
						aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title}`}
						href={`#${useCTAReturnValues0HistoryConfig.href}`}
						className="underline">
						{useCTAReturnValues0HistoryConfig.desc}
					</a>
					{' '}
					<PopoverCTAHistory sourceCodeRecord={props.sourceCodeRecord} />
					,
					in case you need to read it from somewhere that doesn&apos;t need as a dependency.
				</div>
			</Content>
		</Sect>
	</>;
}
