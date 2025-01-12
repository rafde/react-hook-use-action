import CreateFuncLink from '../../links/create-func';
import {
	useCTABasicExampleConfig,
	useCTAConfig,
	useCTAParameterPropsConfig,
} from '../../nav-sidebar/config/use-cta-config';
import Anchor from '../../ui/anchor';
import Code from '../../ui/code';
import CodeBlock from '../../ui/codeBlock';
import CodeBlockSource from '../../ui/codeBlock/Source';
import Content from '../../ui/content';
import Embed from '../../ui/embed';
import Sect from '../../ui/sect';
import UseCTAParameterActionsTopic from './parameters/actions';
import { UseCTAParameterAfterActionChangeTopic, } from './parameters/after-action-change';
import UseCTAParameterCreateFuncTopic from './parameters/create-func';
import UseCTAParameterOnInitTopic from './parameters/on-init';
import UseCTAParameterInitialTopic from './parameters/initial';
import UseCTAParameterCompareTopic from './parameters/compare';
import { UseCTAParameterTransformTopic, } from './parameters/transform';
import UseCTAReturnValuesTopic from './return/values';

export default function UseCTATopic() {
	return <>
		<Sect {...useCTAConfig}>
			<CodeBlock copyButton={true}>
				{`
import { useCTA, } from 'react-hook-use-cta';

export function FC() {
	const [
		history,
		dispatch,
	] = useCTA({
		initial: {
			search: '',
		},
	});
	
	return <>
		{history.current.search}
	<>;
}
				`.trim()}
			</CodeBlock>
			<Content>
				<p>
					<Code>useCTA</Code>
					{' '}
					accepts two parameters:
				</p>
				<ol className="list-inside list-decimal">
					<li>
						<Anchor aria-label={useCTAParameterPropsConfig.title} href={useCTAParameterPropsConfig.href}>
							<Code>UseCTAParameters props</Code>
						</Anchor>
					</li>
					<li>
						<CreateFuncLink />
					</li>
				</ol>
			</Content>
		</Sect>
		<Sect {...useCTABasicExampleConfig}>
			<Embed
				title="react-hook-use-cta useCTA basic example"
				src="https://stackblitz.com/edit/use-cta-basic-tdgkwq3j?ctl=1&embed=1&file=src%2FUseCTABasic.tsx&theme=dark"
			/>
		</Sect>

		<Sect {...useCTAParameterPropsConfig}>
			<CodeBlockSource src="types/UseCTAParameter.ts" />
		</Sect>

		<UseCTAParameterInitialTopic />
		<UseCTAParameterOnInitTopic />
		<UseCTAParameterCompareTopic />
		<UseCTAParameterTransformTopic />
		<UseCTAParameterAfterActionChangeTopic />
		<UseCTAParameterActionsTopic />
		<UseCTAParameterCreateFuncTopic />
		<UseCTAReturnValuesTopic />
	</>;
}
