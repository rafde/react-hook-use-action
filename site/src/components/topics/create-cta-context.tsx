import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import {
	createCTAContextConfig,
	createCTAContextExampleConfig,
	createCTAContextParametersConfig,
	createCTAContextReturnValueConfig,
} from '../nav-sidebar/config/create-cta-context-config';
import {
	useCTAConfig,
	useCTAParameterActionsConfig,
	useCTAParameterCompareConfig,
	useCTAParameterInitialConfig,
	useCTAParameterOnInitConfig,
	useCTAReturnValues0HistoryConfig,
} from '../nav-sidebar/config/use-cta-config';
import { useCTAReturnValues1DispatchConfig, } from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../popover/ctaHistory';
import PopoverCTAState from '../popover/ctaState';
import PopoverUseCTAParameterActionsOptionalRecordProp from '../popover/UseCTAParameterActionsOptionalRecordProp';
import PopoverUseCTAParameterCompare from '../popover/UseCTAParameterCompare';
import PopoverUseCTAParameterOnInit from '../popover/UseCTAParameterOnInit';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import CodeBlock from '../ui/codeBlock';
import Content from '../ui/content';
import ExampleDetails from '../ui/exampleDetails';
import Sect from '../ui/sect';

export default function CreateCTAContextTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...createCTAContextConfig}>
			<CodeBlock copyButton={true} className="mr-4">
				{'import { createCTAContext, } from \'react-hook-use-cta\';'}
			</CodeBlock>
			<Content>
				<p>
					A
					{' '}
					<Code>function</Code>
					{' '}
					returns a React Context to use with
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{' '}
					for managing
					{' '}
					<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label={useCTAReturnValues0HistoryConfig.title}>
						<Code>state history</Code>
					</Anchor>
					{' '}
					and
					{' '}
					<Anchor href={useCTAReturnValues1DispatchConfig.href} aria-label={useCTAReturnValues1DispatchConfig.title}>
						<Code>dispatch</Code>
					</Anchor>
					{' '}
					in the components in the tree.
				</p>
				<p>
					This handles the boilerplate of creating a React Context and Provider.
				</p>
			</Content>
		</Sect>
		<Sect {...createCTAContextExampleConfig}>
			<ExampleDetails
				summary="Click to view createCTAContext example"
				src="https://codesandbox.io/embed/xghcdz?view=editor+%2B+preview&module=%2Fsrc%2Fcontext.ts"
				title="createCTAContext example"
			/>
		</Sect>
		<Sect {...createCTAContextParametersConfig}>
			<Content>
				<p>
					Shares all the same parameters as
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
						<Anchor href={useCTAParameterOnInitConfig.href} aria-label={useCTAParameterOnInitConfig.title}>
							<Code>onInit</Code>
						</Anchor>
						{' '}
						<PopoverUseCTAParameterOnInit sourceCodeRecord={props.sourceCodeRecord} />
					</li>
					<li>
						<Anchor href={useCTAParameterActionsConfig.href} aria-label={useCTAParameterActionsConfig.title}>
							<Code>actions</Code>
						</Anchor>
						{' '}
						<PopoverUseCTAParameterActionsOptionalRecordProp sourceCodeRecord={props.sourceCodeRecord} />
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
		<Sect {...createCTAContextReturnValueConfig}>
			<Content>
				<p>
					Returns an
					{' '}
					<Code>object</Code>
					{' '}
					with the following properties:
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>useCTAHistoryContext</Code>
						: returns
						{' '}
						<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label={useCTAReturnValues0HistoryConfig.title}>
							<Code>state history</Code>
						</Anchor>
						{' '}
						<PopoverCTAHistory sourceCodeRecord={props.sourceCodeRecord} />
					</li>
					<li>
						<Code>useCTADispatchContext</Code>
						: returns
						{' '}
						<Anchor href={useCTAReturnValues1DispatchConfig.href} aria-label={useCTAReturnValues1DispatchConfig.title}>
							<Code>dispatch</Code>
						</Anchor>
					</li>
					<li>
						<Code>CTAProvider</Code>
						: a React Context Provider component to wrap the components in the tree.
						<p>
							It accepts the following
							{' '}
							<i>optional</i>
							{' '}
							props in case you want override the props provided in
							{' '}
							<Anchor href={createCTAContextParametersConfig.href} aria-label={createCTAContextParametersConfig.title}>{createCTAContextParametersConfig.desc}</Anchor>
							.
						</p>
						<ul className="list-inside list-[circle] pl-6">
							<li>
								<Anchor href={useCTAParameterInitialConfig.href} aria-label={useCTAParameterInitialConfig.title}>
									<Code>initial</Code>
								</Anchor>
								{' '}
								<PopoverCTAState sourceCodeRecord={props.sourceCodeRecord} />
							</li>
							<li>
								<Anchor href={useCTAParameterOnInitConfig.href} aria-label={useCTAParameterOnInitConfig.title}>
									<Code>onInit</Code>
								</Anchor>
								{' '}
								<PopoverUseCTAParameterOnInit sourceCodeRecord={props.sourceCodeRecord} />
							</li>
							<li>
								<Anchor href={useCTAParameterCompareConfig.href} aria-label={useCTAParameterCompareConfig.title}>
									<Code>compare</Code>
								</Anchor>
								{' '}
								<PopoverUseCTAParameterCompare sourceCodeRecord={props.sourceCodeRecord} />
							</li>
						</ul>
					</li>
				</ul>
			</Content>
		</Sect>
	</>;
}
