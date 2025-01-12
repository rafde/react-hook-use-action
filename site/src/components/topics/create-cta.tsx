import CreateFuncLink from '../links/create-func';
import CTAHistoryLink from '../links/cta-history';
import DispatchLink from '../links/dispatch';
import StateHistoryLink from '../links/state-history';
import UseCTAReturnTypeLink from '../links/use-cta-return-type';
import {
	createCtaConfig,
	createCTAExampleConfig,
	createCTAParametersConfig,
	createCTAReturnValuesConfig,
} from '../nav-sidebar/config/create-cta-config';
import {
	useCTAConfig,
} from '../nav-sidebar/config/use-cta-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import CodeBlock from '../ui/codeBlock';
import Content from '../ui/content';
import Embed from '../ui/embed';
import Sect from '../ui/sect';
import UseCTAParameterActionsLi from './use-cta/parameters/list-item/actions-li';
import UseCTAParameterCommonLi from './use-cta/parameters/list-item/common-li';

export default function CreateCTATopic() {
	return <>
		<Sect {...createCtaConfig}>
			<CodeBlock copyButton={true}>
				{`
import { createCTA, } from 'react-hook-use-cta';

const ctaValue = createCTA({
	initial: {
		search: '',
	}
});

export history = ctaValue[0];
export dispatch = ctaValue[1];
				`.trim()}
			</CodeBlock>
			<Content>
				<div>
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
				</div>
				<p>
					Useful if you want to handle
					{' '}
					<StateHistoryLink />
					{' '}
					and
					{' '}
					<DispatchLink />
					{' '}
					using a 3rd party global state management system.
				</p>
			</Content>
		</Sect>
		<Sect {...createCTAExampleConfig}>
			<Embed
				src="https://stackblitz.com/edit/use-cta-create-cta-gtdgkwq3j-kyc7wvdw-boma7-qtkzkkmr?ctl=1&embed=1&file=src%2Fstore.ts"
				title="createCTA example"
			/>
		</Sect>
		<Sect {...createCTAParametersConfig}>
			<Content>
				<p>
					<Code>createCTA</Code>
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
							<UseCTAParameterActionsLi />
						</ul>
					</li>
					<li>
						<CreateFuncLink />
					</li>
				</ol>
			</Content>
		</Sect>
		<Sect {...createCTAReturnValuesConfig}>
			<Content>
				<div>
					Returns the same values as
					{' '}
					<Code>useCTA</Code>
					{': '}
					<UseCTAReturnTypeLink />
				</div>

				<ol className="list-inside list-decimal">
					<li>
						<CTAHistoryLink />
					</li>
					<li>
						<DispatchLink />
					</li>
				</ol>
				<div>
					<Code>dispatch</Code>
					{' '}
					and
					{' '}
					<Code>dispatch.cta.*</Code>
					{' '}
					functions also return
					{' '}
					<CTAHistoryLink />
					.
				</div>
			</Content>
			<CodeBlock>
				{`
// Example
const updateWithPayload: CTAHistory<CTAState> = dispatch.cta.update( Partial<CTAState> );
			`.trim()}
			</CodeBlock>
		</Sect>
	</>;
}
