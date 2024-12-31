import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';

import { useCTAParameterCompareConfig, useCTAParameterCompareExampleConfig, } from '../../../nav-sidebar/config/use-cta-config';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import ExampleDetails from '../../../ui/exampleDetails';
import Sect from '../../../ui/sect';

export default function UseCTAParameterCompareTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterCompareConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback:
				</p>
				<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterCompare.ts' ]}</CodeBlock>
				<p>
					<Code>previousValue</Code>
					{': '}
					<Code>current</Code>
					{' '}
					state property value.
				</p>
				<p>
					<Code>nextValue</Code>
					{': '}
					value sent from calling an action.
				</p>
				<p>
					<Code>extra.key</Code>
					{' '}
					related to the state property being compared.
				</p>
				<p>
					<Code>extra.cmp</Code>
					{' '}
					gives you access to
					{' '}
					<a
						href="https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal"
						target="_blank"
						className="underline">
						strictDeepEqual
					</a>
					{' '}
					from
					{' '}
					<a
						href="https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#fast-equals"
						target="_blank"
						className="underline">
						fast-equals
					</a>
				</p>

				<p>
					It should return:
				</p>

				<ul className="list-inside list-[square]">
					<li>
						<Code>true</Code>
						{' '}
						if the values are considered equal
					</li>
					<li>
						<Code>false</Code>
						{' '}
						if the values are different
					</li>
				</ul>

				<p>This is particularly useful when:</p>
				<ul className="list-inside list-[square]">
					<li>You need custom equality logic.</li>
					<li>You want to optimize re-renders by comparing only specific properties.</li>
					<li>Working with complex nested objects that need special comparison handling.</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterCompareExampleConfig} Header="h5">
			<ExampleDetails
				summary={<>
					Click to view
					{' '}
					<Code>useCTA</Code>
					{' '}
					<Code>compare</Code>
					{' '}
					parameter example
				</>}
				title="react-hook-use-cta useCTA compare parameter example"
				src="https://codesandbox.io/embed/zyqnnj?view=editor+%2B+preview&module=%2Fsrc%2FUseCTACompareExample.tsx"
			/>
		</Sect>
	</>;
}
