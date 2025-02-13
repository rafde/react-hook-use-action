import { useCTAParameterActionsCustomConfig, } from '../../../nav-sidebar/config/use-cta-parameter-actions-custom-config';
import {
	useCTAParameterActionsOverridableParameterActionsReplaceConfig,
	useCTAParameterActionsOverridableParameterActionsReplaceInitialConfig,
	useCTAParameterActionsOverridableParameterActionsResetConfig,
	useCTAParameterActionsOverridableParameterActionsUpdateConfig,
	useCTAParameterActionsOverridableParameterActionsUpdateInitialConfig,
} from '../../../nav-sidebar/config/use-cta-parameter-actions-override-built-in-config';
import {
	useCTAReturnValues1DispatchCTACustomActionConfig,
	useCTAReturnValues1DispatchCTAReplaceConfig,
	useCTAReturnValues1DispatchCTAReplaceInitialConfig,
	useCTAReturnValues1DispatchCTAResetConfig,
	useCTAReturnValues1DispatchCTAUpdateConfig,
	useCTAReturnValues1DispatchCTAUpdateInitialConfig,
} from '../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCustomActionsRecord from '../../../popover/customActionsRecord';
import UseCTAParameterActionsPropReplace from '../../../popover/UseCTAParameterActionsPropReplace';
import PopoverUseCTAParameterActionsPropReplaceInitial
	from '../../../popover/UseCTAParameterActionsPropReplacenitial';
import UseCTAParameterActionsPropReset from '../../../popover/UseCTAParameterActionsPropReset';
import PopoverUseCTAParameterActionsPropUpdate from '../../../popover/UseCTAParameterActionsPropUpdate';
import UseCTAParameterActionsPropUpdateInitial
	from '../../../popover/UseCTAParameterActionsPropUpdateInitial';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import Sect from '../../../ui/sect';

export function UseCTAReturnValuesDispatchCTATopic() {
	return <>
		<Sect {...useCTAReturnValues1DispatchCTAUpdateConfig}>
			<Content>
				<div>
					Calls
					{' '}
					<Anchor
						aria-label="Link to actions.update"
						href={useCTAParameterActionsOverridableParameterActionsUpdateConfig.href}>
						<Code>actions.update</Code>
					</Anchor>
					<PopoverUseCTAParameterActionsPropUpdate />
				</div>
			</Content>
			<CodeBlock lang="ts">
				{`
dispatch.cta.update( keyof CTAState, CTAState[keyof CTAState] );

dispatch.cta.update( Partial<CTAState> );

dispatch.cta.update( ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
		`.trim()}
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
				`.trim()}
					</CodeBlock>
				</details>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAReplaceConfig}>
			<Content>
				<div>
					Calls
					{' '}
					<Anchor
						aria-label="Link to actions.replace"
						href={useCTAParameterActionsOverridableParameterActionsReplaceConfig.href}>
						<Code>actions.replace</Code>
					</Anchor>
					<UseCTAParameterActionsPropReplace />
				</div>
			</Content>
			<CodeBlock lang="ts">
				{`
dispatch.cta.replace( CTAState );

dispatch.cta.replace( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
		`.trim()}
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
				`.trim()}
					</CodeBlock>
				</details>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAResetConfig}>
			<Content>
				<div>
					Calls
					{' '}
					<Anchor
						aria-label="Link to actions.reset"
						href={useCTAParameterActionsOverridableParameterActionsResetConfig.href}>
						<Code>actions.reset</Code>
					</Anchor>
					<UseCTAParameterActionsPropReset />
				</div>
			</Content>
			<CodeBlock lang="ts">
				{`
// Reset the state to the initial state
dispatch.cta.reset();

// sets the current state and initial state to payload
dispatch.cta.reset( CTAState );

// sets the current state and initial state to what is returned from the callback
// if the callback returns undefined, the state will not change
dispatch.cta.reset( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
		`.trim()}
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
} );`.trim()}
					</CodeBlock>
				</details>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAUpdateInitialConfig}>
			<Content>
				<div>
					Calls
					{' '}
					<Anchor
						aria-label="Link to actions.updateInitial"
						href={useCTAParameterActionsOverridableParameterActionsUpdateInitialConfig.href}>
						<Code>actions.updateInitial</Code>
					</Anchor>
					<UseCTAParameterActionsPropUpdateInitial />
				</div>
			</Content>
			<CodeBlock lang="ts">
				{`
dispatch.cta.updateInitial( Partial<CTAState> );

dispatch.cta.updateInitial( ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
		`.trim()}
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
				`.trim()}
					</CodeBlock>
				</details>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTAReplaceInitialConfig}>
			<Content>
				<div>
					Calls
					{' '}
					<Anchor
						aria-label="Link to actions.replaceInitial"
						href={useCTAParameterActionsOverridableParameterActionsReplaceInitialConfig.href}>
						<Code>actions.replaceInitial</Code>
					</Anchor>
					<PopoverUseCTAParameterActionsPropReplaceInitial />
				</div>
			</Content>
			<CodeBlock lang="ts">
				{`
dispatch.cta.replaceInitial( CTAState );

dispatch.cta.replaceInitial( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
				`.trim()}
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
						`.trim()}
					</CodeBlock>
				</details>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchCTACustomActionConfig}>
			<Content>
				<div>
					Calls to
					{' '}
					<Anchor
						aria-label="Link to Custom Actions"
						href={useCTAParameterActionsCustomConfig.href}>
						Custom
						{' '}
						<Code>actions</Code>
					</Anchor>
					<PopoverCustomActionsRecord />
				</div>
			</Content>
			<CodeBlock lang="ts">
				{`
dispatch.cta.YourCustomActionWithoutArgs();

dispatch.cta.YourCustomActionWithArgs( 
	Payload,
	...any[] | undefined
 );
	`.trim()}
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
				`.trim()}
					</CodeBlock>
				</details>

				<div>
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
				</div>
			</Content>
		</Sect>
	</>;
}
