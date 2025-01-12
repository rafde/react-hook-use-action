import CreateFuncLink from '../links/create-func';
import CTAHistoryLink from '../links/cta-history';
import {
	createCTAContextConfig,
	createCTAContextExampleConfig,
	createCTAContextParametersConfig,
	createCTAContextReturnValueConfig,
} from '../nav-sidebar/config/create-cta-context-config';
import {
	useCTAConfig,
	useCTAReturnValues0HistoryConfig,
} from '../nav-sidebar/config/use-cta-config';
import { useCTAReturnValues1DispatchConfig, } from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../popover/ctaHistory';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import CodeBlock from '../ui/codeBlock';
import CodeBlockSource from '../ui/codeBlock/Source';
import Content from '../ui/content';
import Embed from '../ui/embed';
import Sect from '../ui/sect';
import UseCTAParameterActionsLi from './use-cta/parameters/list-item/actions-li';
import UseCTAParameterCommonLi from './use-cta/parameters/list-item/common-li';
import UseCTAParameterOnInitLi from './use-cta/parameters/list-item/on-init-li';

export default function CreateCTAContextTopic() {
	return <>
		<Sect {...createCTAContextConfig}>
			<CodeBlock copyButton={true}>
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
				<p>
					This handles the boilerplate of creating a React Context and Provider.
				</p>
				<p>
					<Code>function</Code>
					{' '}
					that returns a Provider,
					{' '}
					<CTAHistoryLink />
					{', '}
					and
					{' '}
					<Anchor href={useCTAReturnValues1DispatchConfig.href} aria-label={useCTAReturnValues1DispatchConfig.title}>
						<Code>dispatch</Code>
					</Anchor>
					{' '}
					from React Context.
					{' '}
					Provider will internally setup
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{' '}
					to be used through
					{' '}
					<Code>useCTAHistoryContext</Code>
					{' '}
					and
					<Code>useCTADispatchContext</Code>
					.
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
				<p>
					<Code>createCTAContext</Code>
					{' '}
					accepts two parameters:
				</p>
				<ol className="list-inside list-decimal">
					<li>
						<Code>object</Code>
						{' '}
						that provides the following properties as
						{' '}
						<Code>useCTA</Code>
						{' '}
						Parameter:
						{' '}
						<ul className="list-inside list-[square] pl-6">
							<UseCTAParameterCommonLi />
							<UseCTAParameterOnInitLi />
							<UseCTAParameterActionsLi />
						</ul>
					</li>
					<li>
						<CreateFuncLink />
					</li>
				</ol>
			</Content>
		</Sect>
		<Sect {...createCTAContextReturnValueConfig}>
			<CodeBlockSource src="types/CreateCTAContextReturn.ts" />
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
						: Wrap your components with this to provide context for all components inside.
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
							<UseCTAParameterCommonLi />
							<UseCTAParameterOnInitLi />
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
						<PopoverCTAHistory />
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
