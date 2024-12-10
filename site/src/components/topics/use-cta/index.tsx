import { SourceCodeRecordProps, } from '../../../types/source-code-record-props';

import { useCTABasicExampleConfig, useCTAConfig, } from '../../nav-sidebar/config/use-cta-config';
import Code from '../../ui/code';
import CodeBlock from '../../ui/codeBlock';
import ExampleDetails from '../../ui/exampleDetails';
import Sect from '../../ui/sect';
import UseCTAParameterActionsTopic from './parameters/actions';
import UseCTAParameterOnInitTopic from './parameters/on-init';
import UseCTAParameterInitialTopic from './parameters/initial';
import UseCTAParameterCompareTopic from './parameters/compare';
import UseCTAReturnValuesTopic from './return/values';

export default function UseCTATopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAConfig}>
			<CodeBlock copyButton={true}>
				{'import { useCTA, } from \'react-hook-use-cta\';'}
			</CodeBlock>
		</Sect>
		<Sect {...useCTABasicExampleConfig}>
			<ExampleDetails
				summary={<>
					Click to view
					{' '}
					<Code>useCTA</Code>
					{' '}
					basic example
				</>}
				title="react-hook-use-cta useCTA basic example"
				src="https://codesandbox.io/embed/zr8wv8?view=editor+%2B+preview&module=%2Fsrc%2FUseCTABasic.tsx"
			/>
		</Sect>

		<UseCTAParameterInitialTopic {...props} />
		<UseCTAParameterOnInitTopic {...props} />
		<UseCTAParameterCompareTopic {...props} />
		<UseCTAParameterActionsTopic {...props} />
		<UseCTAReturnValuesTopic {...props} />
	</>;
}
