import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';
import { useCTAParameterActionsCustomConfig, } from '../../../nav-sidebar/config/use-cta-parameter-actions-custom-config';
import {
	useCTAReturnValues1DispatchCTACustomActionConfig,
	useCTAReturnValues1DispatchCTAReplaceConfig,
	useCTAReturnValues1DispatchCTAReplaceInitialConfig,
	useCTAReturnValues1DispatchCTAResetConfig,
	useCTAReturnValues1DispatchCTAUpdateConfig,
	useCTAReturnValues1DispatchCTAUpdateInitialConfig,
} from '../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCustomActionsRecord from '../../../popover/customActionsRecord';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import Sect from '../../../ui/sect';

export function UseCTAReturnValuesDispatchCTATopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAReturnValues1DispatchCTAUpdateConfig}>
			<CodeBlock lang="ts">
				{`
dispatch.cta.update( keyof CTAState, CTAState[keyof CTAState] );

dispatch.cta.update( Partial<CTAState> );

dispatch.cta.update( ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
		`}
			</CodeBlock>
			<Content>
				<details>
					<summary>Alternate dispatch.cta.update</summary>

					<CodeBlock lang="ts">
						{`
dispatch( {
	type: 'update',
	payload: Partial<CTAState>
} );

dispatch( {
	type: 'update',
	payload: ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined
} );
				`}
					</CodeBlock>
				</details>

				<p>
					Lets you modify specific properties of your
					{' '}
					<Code>current</Code>
					{' '}
					state while preserving other values.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAReplaceConfig}>
			<CodeBlock lang="ts">
				{`
dispatch.cta.replace( CTAState );

dispatch.cta.replace( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
		`}
			</CodeBlock>
			<Content>
				<details>
					<summary>Alternate dispatch.cta.replace</summary>

					<CodeBlock lang="ts">
						{`
dispatch( {
	type: 'replace',
	payload: CTAState
} );

dispatch( {
	type: 'replace',
	payload: ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined
} );
				`}
					</CodeBlock>
				</details>

				<p>
					Replaces all
					{' '}
					<Code>current</Code>
					{' '}
					property values with new property values.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAResetConfig}>
			<CodeBlock lang="ts">
				{`
// Reset the state to the initial state
dispatch.cta.reset();

// sets the current state and initial state to payload
dispatch.cta.reset( CTAState );

// sets the current state and initial state to what is returned from the callback
// if the callback returns undefined, the state will not change
dispatch.cta.reset( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
		`}
			</CodeBlock>

			<Content>
				<details>
					<summary>Alternate dispatch.cta.reset</summary>

					<CodeBlock lang="ts">
						{`
// Reset the state to the initial state
dispatch( {
	type: 'reset',
} );

// sets the current state and initial state to payload
dispatch( {
	type: 'reset',
	payload: CTAState
} );

// sets the current state and initial state to what is returned from the callback
// if the callback returns undefined, the state will not change
dispatch( {
	type: 'reset',
	payload: ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined
} );
				`}
					</CodeBlock>
				</details>

				<p>
					Resets the
					{' '}
					<Code>current</Code>
					{' '}
					state back to the
					{' '}
					<Code>initial</Code>
					{' '}
					state or to synchronize
					the
					{' '}
					<Code>current</Code>
					{' '}
					state and the
					{' '}
					<Code>initial</Code>
					{' '}
					state.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAUpdateInitialConfig}>
			<CodeBlock lang="ts">
				{`
dispatch.cta.updateInitial( Partial<CTAState> );

dispatch.cta.updateInitial( ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
		`}
			</CodeBlock>
			<Content>

				<details>
					<summary>Alternate dispatch.cta.updateInitial</summary>

					<CodeBlock lang="ts">
						{`
dispatch( {
	type: 'updateInitial',
	payload: Partial<CTAState>
} );

dispatch( {
	type: 'updateInitial',
	payload: ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined
} );
				`}
					</CodeBlock>
				</details>

				<p>
					Lets you modify specific properties of your
					{' '}
					<Code>initial</Code>
					{' '}
					state while preserving other values.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAReplaceInitialConfig}>
			<CodeBlock lang="ts">
				{`
dispatch.cta.replaceInitial( CTAState );

dispatch.cta.replaceInitial( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
				`}
			</CodeBlock>
			<Content>

				<details>
					<summary>Alternate dispatch.cta.replaceInitial</summary>

					<CodeBlock lang="ts">
						{`
dispatch( {
	type: 'replaceInitial',
	payload: CTAState
} );

dispatch( {
	type: 'replaceInitial',
	payload: ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined
} );
						`}
					</CodeBlock>
				</details>

				<p>
					Used to replace all
					{' '}
					<Code>initial</Code>
					{' '}
					state property values with new property values.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTACustomActionConfig}>
			<CodeBlock lang="ts">
				{`
dispatch.cta.YourCustomActionWithoutArgs();

dispatch.cta.YourCustomActionWithArgs( 
	Payload,
	...any[] | undefined
 );
	`}
			</CodeBlock>

			<Content>
				<details>
					<summary>Alternate dispatch.cta.YourCustomAction</summary>

					<CodeBlock lang="ts">
						{`
dispatch( {
	type: 'YourCustomActionWithoutArgs',
} );

dispatch( {
	type: 'YourCustomActionWithArgs',
	payload: Payload,
	args: any[] | undefined,
} );
				`}
					</CodeBlock>
				</details>

				<p>
					<Code>YourCustomAction</Code>
					{' '}
					is a placeholder for the name of a custom action you defined in
					{' '}
					<a
						href={`#${useCTAParameterActionsCustomConfig.href}`}
						className="underline"
						aria-label={`Link to ${useCTAParameterActionsCustomConfig.title} section`}
					>
						{useCTAParameterActionsCustomConfig.desc}
					</a>
					{' '}
					<PopoverCustomActionsRecord {...props} />
				</p>
			</Content>
		</Sect>
	</>;
}
