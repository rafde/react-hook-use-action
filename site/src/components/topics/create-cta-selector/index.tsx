import CreateFuncLink from '../../links/create-func';
import CTAHistoryLink from '../../links/cta-history';
import DispatchLink from '../../links/dispatch';
import UseCTAReturnTypeLink from '../../links/use-cta-return-type';
import {
	createCtaSelectorConfig,
	createCTASelectorExampleConfig,
	createCTASelectorParametersConfig,
	createCTASelectorReturnUseCTASelectorConfig,
	useCTASelectorParameterConfig, useCTASelectorReturnConfig,
} from '../../nav-sidebar/config/create-cta-selector-config';
import Code from '../../ui/code';
import CodeBlock from '../../ui/codeBlock';
import CodeBlockSource from '../../ui/codeBlock/Source';
import Content from '../../ui/content';
import Embed from '../../ui/embed';
import Sect from '../../ui/sect';
import UseCTAParameterActionsLi from '../use-cta/parameters/list-item/actions-li';
import UseCTAParameterCommonLi from '../use-cta/parameters/list-item/common-li';

export default function CreateCTASelectorTopic() {
	return <>
		<Sect {...createCtaSelectorConfig}>
			<Content>
				<p>
					A
					{' '}
					<Code>function</Code>
					{' '}
					that creates a selector hook for managing state with CTA (Call To Action) pattern.
				</p>
				<p>
					Works similar to
					{' '}
					<a href="https://zustand-demo.pmnd.rs/" className="underline" target="_blank" aria-label="Zustand link" rel="noreferrer">Zustand</a>
					, but with a different API.
				</p>
				<CodeBlock copyButton={true}>
					{`
import { createCTASelector, } from 'react-hook-use-cta';

const useCTASelector = createCTASelector({
	initial: {
		search: '',
	}
});

export default useCTASelector;
				`.trim()}
				</CodeBlock>
			</Content>
		</Sect>
		<Sect {...createCTASelectorExampleConfig}>
			<Embed
				src="https://stackblitz.com/edit/create-cta-selector-tdgkwq3j-b7q11ex5-jpz1z?ctl=1&embed=1&file=src%2FuseObserver.tsx"
				title="createCTASelector example"
			/>
		</Sect>
		<Sect {...createCTASelectorParametersConfig}>
			<Content>
				<p>
					<Code>createCTASelector</Code>
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
		<Sect {...createCTASelectorReturnUseCTASelectorConfig}>
			<CodeBlockSource src="types/UseCTASelector.ts" />
			<Content>
				<p>
					A selector hook that enables efficient state updates through selector pattern. It also gives you access to:
				</p>
				<ul className="list-inside list-[square] pl-6">
					<li>
						<DispatchLink />
						{' '}
						to trigger actions external to a component.
					</li>
					<li>
						<Code>getHistory</Code>
						{' '}
						gives you access to
						<CTAHistoryLink />
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTASelectorParameterConfig}>
			<CodeBlockSource src="CTASelector" />
			<Content>
				<p>
					<i>Optional</i>
				</p>
				<ul className="list-inside list-[square]">
					<li>
						<Code>function</Code>
						:
						Sending a callback enables selecting specific state values, actions, or
						computed values. It receives an
						{' '}
						<Code>object</Code>
						{' '}
						with
						{' '}
						<DispatchLink />
						{' '}
						prop
						{' '}
						and all props in
						{' '}
						<CTAHistoryLink />
						.
					</li>
					<li>
						<Code>undefined</Code>
						{' '}
						Calling without sending a
						{' '}
						<Code>function</Code>
						{' '}
						will return
						{' '}
						<UseCTAReturnTypeLink />
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTASelectorReturnConfig}>
			<Content>
				<p>
					<Code>return</Code>
					s stable and consistent memoized values.
					This makes it capable of returning computed
					{' '}
					<Code>object</Code>
					s or other references without worrying about infinite re-renders.
				</p>
			</Content>
		</Sect>
	</>;
}
