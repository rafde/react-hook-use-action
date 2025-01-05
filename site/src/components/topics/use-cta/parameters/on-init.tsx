import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';

import {
	useCTAParameterInitialConfig,
	useCTAParameterOnInitConfig,
	useCTAParameterOnInitExampleConfig,
} from '../../../nav-sidebar/config/use-cta-config';
import PopoverCTAState from '../../../popover/ctaState';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import ExampleDetails from '../../../ui/exampleDetails';
import Sect from '../../../ui/sect';

export default function UseCTAParameterOnInitTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterOnInitConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback:
				</p>
				<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterOnInit.ts' ]}</CodeBlock>
				<div>
					where
					{' '}
					<Code>Initial</Code>
					{' '}
					is the
					{' '}
					<Anchor href={useCTAParameterInitialConfig.href} aria-label={`Link to ${useCTAParameterInitialConfig.title} section`}>
						<Code>initial</Code>
					</Anchor>
					{' '}
					<PopoverCTAState {...props} />
					state structure.
				</div>
				<p>Has the following key features:</p>
				<ul className="list-inside list-[square]">
					<li>Runs once on component mount</li>
					<li>
						Receives the
						{' '}
						<Code>initial</Code>
						{' '}
						state as a parameter
					</li>
					<li>
						Can return a new state object to override
						{' '}
						<Code>initial</Code>
						{' '}
						values
					</li>
					<li>
						Perfect for setting up derived state or
						{' '}
						<Code>initial</Code>
						{' '}
						data from props
					</li>
					<li>
						This makes
						{' '}
						<Code>onInit</Code>
						{' '}
						particularly useful when you need to perform calculations or transformations on your
						{' '}
						<Code>initial</Code>
						{' '}
						state before your component starts using it.
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterOnInitExampleConfig} Header="h5">
			<ExampleDetails
				summary={<>
					Click to view
					{' '}
					<Code>useCTA</Code>
					{' '}
					<Code>onInit</Code>
					{' '}
					parameter example
				</>}
				title="react-hook-use-cta useCTA onInit parameter example"
				src="https://codesandbox.io/embed/92872r?view=editor+%2B+preview&module=%2Fsrc%2FOnInitExample.tsx"
			/>
		</Sect>
	</>;
}
