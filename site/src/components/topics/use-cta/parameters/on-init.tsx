import InitialLink from '../../../links/initial';

import {
	useCTAParameterOnInitConfig,
	useCTAParameterOnInitExampleConfig,
} from '../../../nav-sidebar/config/use-cta-config';
import Code from '../../../ui/code';
import CodeBlockSource from '../../../ui/codeBlock/Source';
import Content from '../../../ui/content';
import Embed from '../../../ui/embed';
import Sect from '../../../ui/sect';
import RelatedLiUseCTACommon from '../../../related-li/common-cta-li';

export default function UseCTAParameterOnInitTopic() {
	return <>
		<Sect {...useCTAParameterOnInitConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback that is a related parameter for:
				</p>
				<ul className="list-inside list-[square]">
					<RelatedLiUseCTACommon />
				</ul>
				<CodeBlockSource src="types/UseCTAParameterOnInit.ts" />
				<div>
					where
					{' '}
					<Code>Initial</Code>
					{' '}
					is the
					{' '}
					<InitialLink />
					state structure.
				</div>
				<p>Has the following key features:</p>
				<ul className="list-inside list-[square]">
					<li>Runs once on component mount</li>
					<li>
						Perfect for setting up derived state or
						{' '}
						<Code>initial</Code>
						{' '}
						data from props
					</li>
					<li>
						Useful when you need to perform calculations or transformations on your
						{' '}
						<Code>initial</Code>
						{' '}
						state before your component starts using it.
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterOnInitExampleConfig} Header="h5">
			<Embed
				title="react-hook-use-cta useCTA onInit parameter example"
				src="https://stackblitz.com/edit/use-cta-on-init-tdgkwq3j-jmgwenlh?ctl=1&embed=1&file=src%2FOnInitExample.tsx"
			/>
		</Sect>
	</>;
}
