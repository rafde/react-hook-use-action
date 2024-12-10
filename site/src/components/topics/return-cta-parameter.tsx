import { createCtaConfig, } from '../nav-sidebar/config/create-cta-config';
import { createCTAContextConfig, } from '../nav-sidebar/config/create-cta-context-config';
import { returnCtaParameterConfig, } from '../nav-sidebar/config/return-cta-parameter-config';
import { useCTAConfig, } from '../nav-sidebar/config/use-cta-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import CodeBlock from '../ui/codeBlock';
import Content from '../ui/content';
import Sect from '../ui/sect';

export default function ReturnCTAParameterTopic() {
	return <>
		<Sect {...returnCtaParameterConfig}>
			<CodeBlock copyButton={true}>
				{'import { returnCTAParameter, } from \'react-hook-use-cta\';'}
			</CodeBlock>
			<Content>
				<p>
					A
					{' '}
					<Code>function</Code>
					{' '}
					that returns the
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{' '}
					parameter.
				</p>
				<p>
					Useful if you want to create the parameter outside of
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{', '}
					<Anchor href={createCtaConfig.href} aria-label={createCtaConfig.title}>
						<Code>createCTA</Code>
					</Anchor>
					{', or '}
					<Anchor href={createCTAContextConfig.href} aria-label={createCTAContextConfig.title}>
						<Code>createCTAContext</Code>
					</Anchor>
					{' '}
					for type safety.
				</p>
			</Content>
		</Sect>
	</>;
}
