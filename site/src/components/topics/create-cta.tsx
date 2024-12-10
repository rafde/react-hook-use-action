import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import {
	createCtaConfig,
	createCTAExampleConfig,
	createCTAParametersConfig, createCTAReturnValuesConfig,
} from '../nav-sidebar/config/create-cta-config';
import {
	useCTAConfig, useCTAParameterActionsConfig, useCTAParameterCompareConfig,
	useCTAParameterInitialConfig,
	useCTAReturnValues0HistoryConfig,
} from '../nav-sidebar/config/use-cta-config';
import { useCTAReturnValues1DispatchConfig, } from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../popover/ctaHistory';
import PopoverCTAState from '../popover/ctaState';
import PopoverCustomActionsRecord from '../popover/customActionsRecord';
import PopoverDefaultActionsRecord from '../popover/defaultActionsRecord';
import PopoverUseCTAParameterCompare from '../popover/UseCTAParameterCompare';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import CodeBlock from '../ui/codeBlock';
import Content from '../ui/content';
import ExampleDetails from '../ui/exampleDetails';
import Sect from '../ui/sect';

export default function CreateCTATopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...createCtaConfig}>
			<CodeBlock copyButton={true}>
				{'import { createCTA, } from \'react-hook-use-cta\';'}
			</CodeBlock>
			<Content>
				<p>
					A
					{' '}
					<Code>function</Code>
					{' '}
					that provides a way to execute like
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{' '}
					but outside of a React component.
				</p>
				<p>
					Useful if you want to handle
					{' '}
					<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label="state history">state history</Anchor>
					{' '}
					and
					{' '}
					<Anchor href={useCTAReturnValues1DispatchConfig.href} aria-label="dispatch">dispatch</Anchor>
					{' '}
					using a 3rd party global state management system.
				</p>
			</Content>
		</Sect>
		<Sect {...createCTAExampleConfig}>

			<ExampleDetails
				summary="Click to view createCTA example"
				src="https://codesandbox.io/embed/yjktpt?view=editor+%2B+preview&module=%2Fsrc%2Fstore.ts"
				title="createCTA example"
			/>
		</Sect>
		<Sect {...createCTAParametersConfig}>
			<Content>
				<p>
					With the
					{' '}
					<b>exception</b>
					{' '}
					of onInit, shares the same parameters as
					{' '}
					<Code>useCTA</Code>
					:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Anchor href={useCTAParameterInitialConfig.href} aria-label={useCTAParameterInitialConfig.title}>
							<Code>initial</Code>
						</Anchor>
						{' '}
						<PopoverCTAState sourceCodeRecord={props.sourceCodeRecord} />
					</li>
					<li>
						<Anchor href={useCTAParameterActionsConfig.href} aria-label={useCTAParameterActionsConfig.title}>
							<Code>actions</Code>
						</Anchor>
						{' '}
						<PopoverDefaultActionsRecord sourceCodeRecord={props.sourceCodeRecord} />
						{' '}
						<PopoverCustomActionsRecord sourceCodeRecord={props.sourceCodeRecord} />
					</li>
					<li>
						<Anchor href={useCTAParameterCompareConfig.href} aria-label={useCTAParameterCompareConfig.title}>
							<Code>compare</Code>
						</Anchor>
						{' '}
						<PopoverUseCTAParameterCompare sourceCodeRecord={props.sourceCodeRecord} />
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...createCTAReturnValuesConfig}>
			<Content>
				<p>
					Returns the same values as
					{' '}
					<Code>useCTA</Code>
					:
				</p>
				<ol className="list-inside list-decimal">
					<li>
						<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label="Link to history">
							<Code>history</Code>
						</Anchor>
						{' '}
						<PopoverCTAHistory sourceCodeRecord={props.sourceCodeRecord} />
					</li>
					<li><Code>dispatch</Code></li>
				</ol>
				<p>
					But,
					{' '}
					<Code>dispatch</Code>
					{' '}
					and
					{' '}
					<Code>dispatch.cta.*</Code>
					{' '}
					functions return
					{' '}
					<Code>history</Code>
					<PopoverCTAHistory sourceCodeRecord={props.sourceCodeRecord} />
					{' '}
					as well.
				</p>
			</Content>
		</Sect>
	</>;
}
