import DispatchCTALink from '../../../links/dispatch-cta';
import DispatchHistoryLink from '../../../links/dispatch-history';
import { createCTAContextParametersConfig, } from '../../../nav-sidebar/config/create-cta-context-config';
import {
	useCTAParameterCreateFuncConfig,
	useCTAParameterCreateFuncExampleConfig,
	useCTAParameterCreateFuncParameterConfig,
	useCTAParameterCreateFuncReturnConfig,
} from '../../../nav-sidebar/config/use-cta-parameter-create-func-config';
import {
	useCTAReturnValuesDispatchFuncConfig,
} from '../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import RelatedLiCreateCTA from '../../../related-li/create-cta-li';
import RelatedLiCreateCTASelector from '../../../related-li/create-cta-selector-li';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlockSource from '../../../ui/codeBlock/Source';
import Content from '../../../ui/content';
import Embed from '../../../ui/embed';
import Sect from '../../../ui/sect';

export default function UseCTAParameterCreateFuncTopic() {
	return <>
		<Sect {...useCTAParameterCreateFuncConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback
					{' '}
					<Code>function</Code>
					{' '}
					that is a related parameter for:
				</p>

				<ul className="list-inside list-[square]">
					<RelatedLiCreateCTA />
					<RelatedLiCreateCTASelector />
					<li>
						<Anchor aria-label="create cta context paramater link" href={createCTAContextParametersConfig.href}>
							<Code>createCTAContext</Code>
						</Anchor>
					</li>
				</ul>
			</Content>
			<CodeBlockSource src="types/UseCTAParameterCreateFunc.ts" />
			<Content>
				<p>
					Useful for creating
					{' '}
					<Code>async</Code>
					{' or '}
					sync
					{' '}
					<Code>function</Code>
					s that provide reusable state derivations and action compositions.
				</p>
				<p>
					<Code>function</Code>
					{' '}
					parameters must have
					<Code>type</Code>
					s declared to ensure
					{' '}
					<Code>type</Code>
					{' '}
					safety.
				</p>
				<p>
					The results are set in
					{' '}
					<Anchor aria-label={useCTAReturnValuesDispatchFuncConfig.title} href={useCTAReturnValuesDispatchFuncConfig.href}>{useCTAReturnValuesDispatchFuncConfig.desc}</Anchor>
				</p>
			</Content>
		</Sect>
		<Sect {...useCTAParameterCreateFuncExampleConfig}>
			<Embed
				src="https://stackblitz.com/edit/create-func-tdgkwq3j-b7q11ex5?ctl=1&embed=1&file=src%2FCreateFuncExample.tsx"
				title="createFunc example"
			/>
		</Sect>
		<Sect {...useCTAParameterCreateFuncParameterConfig}>
			<CodeBlockSource src="types/DispatchCTA.ts" />
			<Content>
				<p>
					Gives you access to
					{' '}
					<DispatchHistoryLink />
					and
					{' '}
					<DispatchCTALink />
					{' '}
					for use by the results of
					{' '}
					<Code>createFunc</Code>
					.
				</p>
			</Content>
		</Sect>
		<Sect {...useCTAParameterCreateFuncReturnConfig}>
			<CodeBlockSource src="UseCTAParameterCreateFuncReturnRecord" />
			<Content>
				<p>
					Should
					{' '}
					<Code>return</Code>
					{' '}
					an
					{' '}
					<Code>object</Code>
					{' '}
					with
					{' '}
					<Code>function</Code>
					s that can be sync or
					{' '}
					<Code>async</Code>
					.
				</p>
				<p>
					Results end up in
					{' '}
					<Anchor aria-label={useCTAReturnValuesDispatchFuncConfig.title} href={useCTAReturnValuesDispatchFuncConfig.href}>
						<Code>dispatch.func</Code>
					</Anchor>
				</p>
			</Content>
		</Sect>
	</>;
}
