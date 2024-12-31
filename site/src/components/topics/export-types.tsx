import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import {
	exportTypesConfig,
	exportTypesCTAStateConfig,
	exportTypesUseCTAParameterCompareConfig, exportTypesUseCTAReturnTypeConfig, exportTypesUseCTAReturnTypeDispatchConfig,
} from '../nav-sidebar/config/export-types';
import CodeBlock from '../ui/codeBlock';
import Content from '../ui/content';
import Sect from '../ui/sect';

export default function ExportTypesTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...exportTypesConfig}>
			<Content>
				<p>Typescript export types in case you need to use them.</p>
			</Content>
		</Sect>

		<Sect {...exportTypesCTAStateConfig}>
			<CodeBlock copyButton={true} className="mr-4">
				{'import type { CTAState, } from \'react-hook-use-cta\';'}
			</CodeBlock>
			<Content>
				<p>Typescript:</p>
			</Content>

			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAState.ts' ].trim()}</CodeBlock>
		</Sect>

		<Sect {...exportTypesUseCTAParameterCompareConfig}>
			<CodeBlock copyButton={true} className="mr-4">
				{'import type { UseCTAParameterCompare, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<Content>
				<p>Typescript:</p>
			</Content>

			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterCompare.ts' ]}</CodeBlock>
		</Sect>

		<Sect {...exportTypesUseCTAReturnTypeConfig}>
			<CodeBlock copyButton={true} className="mr-4">
				{'import type { UseCTAReturnType, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<Content>
				<p>Typescript:</p>
			</Content>

			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAReturnType.ts' ]}</CodeBlock>
		</Sect>

		<Sect {...exportTypesUseCTAReturnTypeDispatchConfig}>
			<CodeBlock copyButton={true} className="mr-4">
				{'import type { UseCTAReturnTypeDispatch, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<Content>
				<p>Typescript:</p>
			</Content>

			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAReturnTypeDispatch.ts' ]}</CodeBlock>
		</Sect>
	</>;
}
