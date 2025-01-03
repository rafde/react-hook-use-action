import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';

import { useCTAParameterInitialConfig, } from '../../../nav-sidebar/config/use-cta-config';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import Sect from '../../../ui/sect';

export default function UseCTAParameterInitialTopic( props: SourceCodeRecordProps, ) {
	return <Sect {...useCTAParameterInitialConfig}>
		<Content>
			<b>Required</b>
			<p>
				Representing the
				{' '}
				<Code>initial</Code>
				{' '}
				state structure. This serves as the base state and can be reset to later.
			</p>
			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAState.ts' ].trim()}</CodeBlock>
			<p>
				Property values can be anything that
				{' '}
				<a
					href="https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal"
					target="_blank"
					className="underline"
					rel="noreferrer"
				>
					strictDeepEqual
				</a>
				{' '}
				from
				{' '}
				<a
					href="https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#fast-equals"
					target="_blank"
					className="underline"
					rel="noreferrer"
				>
					fast-equals
				</a>
				{' '}
				supports.
			</p>
		</Content>
	</Sect>;
}
