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
	useCTAParameterOnInitConfig,
	useCTAReturnValues0HistoryConfig,
} from '../nav-sidebar/config/use-cta-config';
import { useCTAReturnValues1DispatchConfig, } from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../popover/ctaHistory';
import PopoverUseCTAParameterActionsRecordProp from '../popover/PopoverUseCTAParameterActionsRecordProp';
import PopoverUseCTAParameterOnInit from '../popover/UseCTAParameterOnInit';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import CodeBlock from '../ui/codeBlock';
import Content from '../ui/content';
import Embed from '../ui/embed';
import Sect from '../ui/sect';
import UseCTAParameterCommonLi from './use-cta/parameters/common-li';

export default function CreateCTAContextTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...createCTAContextConfig}>
			<CodeBlock copyButton={true} className="mr-4">
				{`
import { createCTAContext, } from react-hook-use-cta;

const context = createCTAContext({
	initial: {
		search: '',
	}
});

export const Provider = context.Provider;
export const useCTAHistoryContext = context.useCTAHistoryContext;
export const useCTADispatchContext = context.useCTADispatchContext;
				`.trim()}
			</CodeBlock>
			<Content>
				<div>
					A
					{' '}
					<Code>function</Code>
					{' '}
					that returns a Provider,
					{' '}
					<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label={useCTAReturnValues0HistoryConfig.title}>
						<Code>state history</Code>
					</Anchor>
					{', '}
					and
					{' '}
					<Anchor href={useCTAReturnValues1DispatchConfig.href} aria-label={useCTAReturnValues1DispatchConfig.title}>
						<Code>dispatch</Code>
					</Anchor>
					{' '}
					from React Context to use with
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{' '}
					in a components in the tree.
				</div>
				<p>
					This handles the boilerplate of creating a React Context and Provider.
				</p>
			</Content>
		</Sect>
		<Sect {...createCTAContextExampleConfig}>
			<Embed
				src="https://stackblitz.com/edit/use-cta-create-cta-context-gtdgkwq3j-kyc7wvdw-boma7-qtk?ctl=1&embed=1&file=src%2Fcontext.ts"
				title="createCTAContext example"
			/>
		</Sect>
		<Sect {...createCTAContextParametersConfig}>
			<Content>
				<div>
					Shares all the same parameters as
					{' '}
					<Code>useCTA</Code>
					:
				</div>
				<ul className="list-inside list-[square]">
					<UseCTAParameterCommonLi {...props} />
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
						<PopoverUseCTAParameterActionsRecordProp sourceCodeRecord={props.sourceCodeRecord} />
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...createCTAContextReturnValueConfig}>
			<CodeBlock copyButton={false}>
				{props.sourceCodeRecord[ 'types/CreateCTAContextReturn.ts' ]}
			</CodeBlock>
			<Content>
				<div>
					Returns an
					{' '}
					<Code>object</Code>
					{' '}
					with the following properties:
				</div>
				<ul className="list-inside list-[square]">
					<li>
						<Code>CTAProvider</Code>
						: a Provider component to wrap the components in the tree.
						<p>
							It accepts the following
							{' '}
							<i>optional</i>
							{' '}
							props in case you want override the props provided in
							{' '}
							<Anchor
								href={createCTAContextParametersConfig.href}
								aria-label={createCTAContextParametersConfig.title}>
								{createCTAContextParametersConfig.desc}
							</Anchor>
							.
						</p>
						<ul className="list-inside list-[circle] pl-6">
							<UseCTAParameterCommonLi {...props} />
							<li>
								<Anchor href={useCTAParameterOnInitConfig.href} aria-label={useCTAParameterOnInitConfig.title}>
									<Code>onInit</Code>
								</Anchor>
								{' '}
								<PopoverUseCTAParameterOnInit sourceCodeRecord={props.sourceCodeRecord} />
							</li>
						</ul>
					</li>
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
				</ul>
			</Content>
		</Sect>
	</>;
}
