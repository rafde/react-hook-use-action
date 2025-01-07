import { SourceCodeRecordProps, } from '../../types/source-code-record-props';
import {
	createCtaConfig,
	createCTAExampleConfig,
	createCTAParametersConfig,
	createCTAReturnValuesConfig,
} from '../nav-sidebar/config/create-cta-config';
import {
	useCTAConfig,
	useCTAParameterActionsConfig,
	useCTAReturnValues0HistoryConfig,
} from '../nav-sidebar/config/use-cta-config';
import { useCTAReturnValues1DispatchConfig, } from '../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../popover/ctaHistory';
import PopoverUseCTAParameterActionsRecordProp from '../popover/PopoverUseCTAParameterActionsRecordProp';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import CodeBlock from '../ui/codeBlock';
import Content from '../ui/content';
import Embed from '../ui/embed';
import Sect from '../ui/sect';
import UseCTAParameterCommonLi from './use-cta/parameters/common-li';

export default function CreateCTATopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...createCtaConfig}>
			<CodeBlock copyButton={true} className="mr-4">
				{`
import { createCTA, } from 'react-hook-use-cta';

const ctaValue = createCTA({
	initial: {
		search: '',
	}
});

export history = ctaValue[0];
export dispatch = ctaValue[1];
				`.trim()}
			</CodeBlock>
			<Content>
				<div>
					A
					{' '}
					<Code>function</Code>
					{' '}
					that provides a way to execute like
					{' '}
					<Anchor href={useCTAConfig.href} aria-label={useCTAConfig.title}>
						<Code>useCTA</Code>
					</Anchor>
					{' '}
					but outside of a React component.
				</div>
				<p>
					Useful if you want to handle
					{' '}
					<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label="state history">state history</Anchor>
					{' '}
					and
					{' '}
					<Anchor href={useCTAReturnValues1DispatchConfig.href} aria-label="dispatch">dispatch</Anchor>
					{' '}
					using a 3rd party global state management system.
				</p>
			</Content>
		</Sect>
		<Sect {...createCTAExampleConfig}>
			<Embed
				summary="Click to view createCTA example"
				src="https://stackblitz.com/edit/use-cta-create-cta-gtdgkwq3j-kyc7wvdw-boma7-qtkzkkmr?embed=1&file=src%2Fstore.ts"
				title="createCTA example"
			/>
		</Sect>
		<Sect {...createCTAParametersConfig}>
			<Content>
				<div>
					With the
					{' '}
					<b>exception</b>
					{' '}
					of onInit, shares the same parameters as
					{' '}
					<Code>useCTA</Code>
					:
				</div>
				<ul className="list-inside list-[square]">
					<UseCTAParameterCommonLi sourceCodeRecord={props.sourceCodeRecord} />
					<li>
						<Anchor href={useCTAParameterActionsConfig.href} aria-label={useCTAParameterActionsConfig.title}>
							<Code>actions</Code>
						</Anchor>
						{' '}
						<PopoverUseCTAParameterActionsRecordProp sourceCodeRecord={props.sourceCodeRecord} />
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...createCTAReturnValuesConfig}>
			<Content>
				<div>
					Returns the same values as
					{' '}
					<Code>useCTA</Code>
					:
				</div>
				<ol className="list-inside list-decimal">
					<li>
						<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label="Link to history">
							<Code>history</Code>
						</Anchor>
						{' '}
						<PopoverCTAHistory sourceCodeRecord={props.sourceCodeRecord} />
					</li>
					<li><Code>dispatch</Code></li>
				</ol>
				<div>
					{' '}
					<Code>dispatch</Code>
					{' '}
					and
					{' '}
					<Code>dispatch.cta.*</Code>
					{' '}
					functions return
					{' '}
					<Code>history</Code>
					<PopoverCTAHistory sourceCodeRecord={props.sourceCodeRecord} />
					{' '}
					as well.
				</div>
			</Content>
			<CodeBlock>
				{`
// Example
const updateWithPayload: CTAHistory<CTAState> = dispatch.cta.update( Partial<CTAState> );
			`.trim()}
			</CodeBlock>
		</Sect>
	</>;
}
