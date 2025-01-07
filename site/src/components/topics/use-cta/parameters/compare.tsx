import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';

import { useCTAParameterCompareConfig, useCTAParameterCompareExampleConfig, } from '../../../nav-sidebar/config/use-cta-config';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import Embed from '../../../ui/embed';
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
				<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterAfterActionChange.ts' ]}</CodeBlock>
				<ol className="list-inside list-decimal">
					<li>
						<Code>previousValue</Code>
						{': '}
						<Code>current</Code>
						{' '}
						state property value.
					</li>
					<li>
						<Code>nextValue</Code>
						{': '}
						value sent from calling an action.
					</li>
					<li>
						<Code>extra</Code>
						{': '}
						object containing
						<ul className="list-inside list-[square] pl-5">
							<li>
								<Code>extra.key</Code>
								{': '}
								related to the state property being compared.
							</li>
							<li>
								<Code>extra.cmp</Code>
								{': '}
								gives you access to
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
							</li>
						</ul>
					</li>
				</ol>

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
			<Embed
				title="react-hook-use-cta useCTA compare parameter example"
				src="https://stackblitz.com/edit/use-cta-compare-tdgkwq3j-kyc7wvdw?ctl=1&embed=1&file=src%2FUseCTACompare.tsx"
			/>
		</Sect>
	</>;
}
