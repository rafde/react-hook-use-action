import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';
import {
	useCTAParameterActionsConfig,
	useCTAParameterTransformConfig,
	useCTAParameterTransformExampleConfig,
} from '../../../nav-sidebar/config/use-cta-config';
import {
	useCTAParameterActionsCustomConfig,
} from '../../../nav-sidebar/config/use-cta-parameter-actions-custom-config';
import PopoverUseCTAParameterActionsOverridableRecord from '../../../popover/UseCTAParameterActionsOverridableRecord';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import ExampleDetails from '../../../ui/exampleDetails';
import Sect from '../../../ui/sect';

export function UseCTAParameterTransformTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterTransformConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback:
				</p>
				<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAParameterTransform.ts' ]}</CodeBlock>
				<ol className="list-inside list-decimal">
					<li>
						<Code>nextState</Code>
						{': '}
						This value depends what type of built-in call-to-action it is behaving like.
					</li>
					<li>
						<Code>transformCTAHistory</Code>
						{': '}
						<Code>{'CTAHistory<CTAState>'}</Code>
						{' '}
						with two extra keys:
						<ul className="list-inside list-[square] pl-5">
							<li>
								<Code>actionType</Code>
								{': '}
								The name of the built-in
								{' '}
								<Anchor href={useCTAParameterActionsConfig.href} aria-label={useCTAParameterActionsConfig.title}>
									<Code>action</Code>
								</Anchor>
								{' '}
								<PopoverUseCTAParameterActionsOverridableRecord sourceCodeRecord={props.sourceCodeRecord} />
								type it will behave like.
							</li>
							<li>
								<Code>customAction</Code>
								{': '}
								The name of the
								{' '}
								<Anchor
									aria-label={useCTAParameterActionsCustomConfig.title}
									href={useCTAParameterActionsCustomConfig.href}>
									custom action
								</Anchor>
								{' '}
								that called it.
								{' '}
								<Code>undefined</Code>
								{' '}
								if there is no custom call-to-action
							</li>
						</ul>
					</li>
				</ol>

				<p>
					Return value can be:
				</p>
				<ul className="list-inside list-[square]">
					<li><Code>CTAState</Code></li>
					<li><Code>{'Partial<CTAState>'}</Code></li>
					<li>
						<Code>undefined</Code>
						{': '}
						action will not be triggered.
					</li>
				</ul>
				<div>
					depending on the
					{' '}
					<Code>transformCTAHistory.actionType</Code>
					{' '}
					<PopoverUseCTAParameterActionsOverridableRecord sourceCodeRecord={props.sourceCodeRecord} />
					{' '}
					value.
				</div>

				<p>This callback reads all actions and is useful when:</p>
				<ul className="list-inside list-[square]">
					<li>
						transforming all call-to-action
						{' '}
						<Code>CTAState</Code>
					</li>
					<li>
						you don&apos;t want to override every built-in action to do the same
						{' '}
						<Code>CTAState</Code>
						{' '}
						transformation.
					</li>
				</ul>

				<p>The order this works is as follows</p>
				<ul className="list-inside list-decimal">
					<li>
						If custom or overridden action from
						{' '}
						<Code>actions</Code>
						{' '}
						is defined, call it. Otherwise, continue.
					</li>
					<li>
						<Code>transform</Code>
						{' '}
						is called.
					</li>
					<li>
						If
						{' '}
						<Code>transform</Code>
						{' '}
						returns
						<ul className="list-inside list-[square] pl-5">
							<li>
								<Code>undefined</Code>
								{': '}
								don&apos;t trigger action.
							</li>
							<li>
								<Code>CTAState</Code>
								{' or '}
								<Code>{'Partial<CTAState>'}</Code>
								{': '}
								continue triggering action.
							</li>
						</ul>
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterTransformExampleConfig} Header="h5">
			<ExampleDetails
				summary={<>
					Click to view
					{' '}
					<Code>useCTA</Code>
					{' '}
					parameter
					{' '}
					<Code>transform</Code>
					{' '}
					example
				</>}
				title="react-hook-use-cta useCTA parameter transform example"
				src="https://codesandbox.io/embed/874y5s?view=editor+%2B+preview&module=%2Fsrc%2FUseCTAfterActionChangeExample.tsx"
			/>
		</Sect>
	</>;
}
