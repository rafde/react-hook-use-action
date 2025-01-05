import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';
import {
	useCTAParameterActionsConfig,
	useCTAParameterAfterActionChangeConfig,
	useCTAParameterAfterActionChangeExampleConfig, useCTAReturnValues0HistoryConfig,
} from '../../../nav-sidebar/config/use-cta-config';
import {
	useCTAParameterActionsCustomConfig,
} from '../../../nav-sidebar/config/use-cta-parameter-actions-custom-config';
import PopoverUseCTAParameterActionsRecordProp from '../../../popover/PopoverUseCTAParameterActionsRecordProp';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import ExampleDetails from '../../../ui/exampleDetails';
import Sect from '../../../ui/sect';

export function UseCTAParameterAfterActionChangeTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterAfterActionChangeConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback:
				</p>
				<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterAfterActionChange.ts' ]}</CodeBlock>
				<ol className="list-inside list-decimal">
					<li>
						<Code>ctaHistory</Code>
						{': '}
						New
						{' '}
						<Anchor
							href={useCTAReturnValues0HistoryConfig.href}
							aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title} section`}>
							state history
						</Anchor>
						.
					</li>
					<li>
						<Code>ctaHistory</Code>
						{': '}
						Built-in
						{' '}
						<Anchor href={useCTAParameterActionsConfig.href} aria-label={useCTAParameterActionsConfig.title}>
							<Code>actions</Code>
						</Anchor>
						{' '}
						<PopoverUseCTAParameterActionsRecordProp sourceCodeRecord={props.sourceCodeRecord} />
						{' '}
						keys.
					</li>
					<li>
						<Code>customActionName</Code>
						{': '}
						If any
						{' '}
						<Anchor
							aria-label={useCTAParameterActionsCustomConfig.title}
							href={useCTAParameterActionsCustomConfig.href}>
							custom actions
						</Anchor>
						{' '}
						were defined, the key will get passed to this parameter.
					</li>
				</ol>

				<p>
					There&#39;s no return value.
				</p>

				<b>Features:</b>
				<ul className="list-inside list-[square]">
					<li>Internally, this gets called asynchronously.</li>
					<li>
						Only runs after an action has changed the hook state history.
					</li>
					<li>
						You can use this for logging, analytics, setting
						{' '}
						<Code>localStorage</Code>
						, etc.
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterAfterActionChangeExampleConfig} Header="h5">
			<ExampleDetails
				summary={<>
					Click to view
					{' '}
					<Code>useCTA</Code>
					{' '}
					<Code>afterActionChange</Code>
					{' '}
					parameter example
				</>}
				title="react-hook-use-cta useCTA afterActionChange parameter example"
				src=""
			/>
		</Sect>
	</>;
}
