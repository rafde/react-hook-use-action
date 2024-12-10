import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import {
	exportTypesConfig,
	exportTypesCTAStateConfig,
	exportTypesUseCTAParameterCompareConfig, exportTypesUseCTAReturnTypeConfig, exportTypesUseCTAReturnTypeDispatchConfig,
} from '../nav-sidebar/config/export-types';
import CodeBlock from '../ui/codeBlock';
import Sect from '../ui/sect';

export default function ExportTypesTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...exportTypesConfig}>
			<p>These are Typescript export types in case you need to use them.</p>
		</Sect>

		<Sect {...exportTypesCTAStateConfig}>
			<CodeBlock copyButton={true}>
				{'import type { CTAState, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<p>Typescript:</p>

			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAState.ts' ]}</CodeBlock>
		</Sect>

		<Sect {...exportTypesUseCTAParameterCompareConfig}>
			<CodeBlock copyButton={true}>
				{'import type { UseCTAParameterCompare, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<p>Typescript:</p>
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterCompare.ts' ]}</CodeBlock>
		</Sect>

		<Sect {...exportTypesUseCTAReturnTypeConfig}>
			<CodeBlock copyButton={true}>
				{'import type { UseCTAReturnType, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<p>Typescript:</p>
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAReturnType.ts' ]}</CodeBlock>
		</Sect>

		<Sect {...exportTypesUseCTAReturnTypeDispatchConfig}>
			<CodeBlock copyButton={true}>
				{'import type { UseCTAReturnTypeDispatch, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<p>Typescript:</p>
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAReturnTypeDispatch.ts' ]}</CodeBlock>
		</Sect>
	</>;
}
