import { createCtaConfig, } from '../nav-sidebar/config/create-cta-config';
import { createCTAContextConfig, } from '../nav-sidebar/config/create-cta-context-config';
import { createCtaSelectorConfig, } from '../nav-sidebar/config/create-cta-selector-config';
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
				{`
import { returnCTAParameter, } from 'react-hook-use-cta';

export const ctaParams = returnCTAParameter({
	initial: {
		search: '',
	},
});
				`.trim()}
			</CodeBlock>
			<Content>
				<div>
					A
					{' '}
					<Code>function</Code>
					{' '}
					that returns type-safe
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{' '}
					props.
				</div>
				<div>
					Useful if you want to create the parameter outside of
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						{useCTAConfig.desc}
					</Anchor>
					{', '}
					<Anchor href={createCtaSelectorConfig.href} aria-label={createCtaSelectorConfig.title}>
						{createCtaSelectorConfig.desc}
					</Anchor>
					{', '}
					<Anchor href={createCtaConfig.href} aria-label={createCtaConfig.title}>
						{createCtaConfig.desc}
					</Anchor>
					{', or '}
					<Anchor href={createCTAContextConfig.href} aria-label={createCTAContextConfig.title}>
						{createCTAContextConfig.desc}
					</Anchor>
					{' '}
					for type safety.
				</div>
			</Content>
		</Sect>
	</>;
}
