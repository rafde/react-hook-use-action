import {
	exportTypesConfig,
	exportTypesCTAStateConfig,
	exportTypesUseCTAParameterCompareConfig, exportTypesUseCTAReturnTypeConfig, exportTypesUseCTAReturnTypeDispatchConfig,
} from '../nav-sidebar/config/export-types';
import CodeBlock from '../ui/codeBlock';
import CodeBlockSource from '../ui/codeBlock/Source';
import Content from '../ui/content';
import Sect from '../ui/sect';

export default function ExportTypesTopic() {
	return <>
		<Sect {...exportTypesConfig}>
			<Content>
				<p>Typescript export types in case you need to use them.</p>
			</Content>
		</Sect>

		<Sect {...exportTypesCTAStateConfig}>
			<CodeBlock copyButton={true}>
				{'import type { CTAState, } from \'react-hook-use-cta\';'}
			</CodeBlock>
			<Content>
				<p>Typescript:</p>
			</Content>
			<CodeBlockSource src="types/CTAState.ts" />
		</Sect>

		<Sect {...exportTypesUseCTAParameterCompareConfig}>
			<CodeBlock copyButton={true}>
				{'import type { UseCTAParameterCompare, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<Content>
				<p>Typescript:</p>
			</Content>
			<CodeBlockSource src="types/UseCTAParameterCompare.ts" />
		</Sect>

		<Sect {...exportTypesUseCTAReturnTypeConfig}>
			<CodeBlock copyButton={true}>
				{'import type { UseCTAReturnType, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<Content>
				<p>Typescript:</p>
			</Content>
			<CodeBlockSource src="types/UseCTAReturnType.ts" />
		</Sect>

		<Sect {...exportTypesUseCTAReturnTypeDispatchConfig}>
			<CodeBlock copyButton={true}>
				{'import type { UseCTAReturnTypeDispatch, } from \'react-hook-use-cta\';'}
			</CodeBlock>

			<Content>
				<p>Typescript:</p>
			</Content>
			<CodeBlockSource src="types/UseCTAReturnTypeDispatch.ts" />
		</Sect>
	</>;
}
