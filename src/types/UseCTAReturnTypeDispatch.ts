import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';
import type { DispatchValueActionPayloadArgsProps, } from './DispatchValueActionPayloadArgsProps';
import type { Immutable, } from './Immutable';
import type { OmitEmptyRecord, } from './OmitEmptyRecord';

export type DispatchCTADefaultRecord<
	Initial extends CTAState,
	ReturnValue = void,
> = UseCTAReturnTypeDispatch<Initial, undefined, ReturnValue>['cta'];

type CustomCTARecord<
	Initial extends CTAState,
	Actions,
> = {
	[Action in Exclude<
		keyof Actions,
		keyof DefaultActionsRecord<Initial>
	> as Actions[Action] extends ( ...args: infer Args ) => CustomCTAReturnType<Initial> ? (
		Args extends []
			// Action without arguments.
			? Action
			: (
				Args extends [...infer A,]
					? (
						// Represents cta with at least one argument that is CustomCTAHistory
						A[0] extends CustomCTAHistory<Initial> ? Action : never
					)
					: never
			)
	) : never]: Actions[Action];
};

type DispatchCustomCTARecordValues<
	Initial extends CTAState,
	ActionValue,
	ReturnValue = void,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = ActionValue extends ( ( ctaParam: CustomCTAHistory<Initial>, ...args: infer Args ) => CustomCTAReturnType<Initial> ) ? (
	Args extends []
		// Represents CTA without arguments.
		? ( () => ReturnValue )
		: ( ( ...args: Args ) => ReturnValue )
) : never;

export type DispatchCustomCTARecord<
	Initial extends CTAState,
	Actions,
	ReturnValue = void,
	CustomActions = CustomCTARecord<Initial, Actions>,
> = CustomActions extends Record<string | number | symbol, never> ?
	CustomActions : {
		[Action in keyof CustomActions]: DispatchCustomCTARecordValues<
			Initial,
			CustomActions[Action],
			ReturnValue
		>
	};

type CustomDispatchValueRecord<
	Initial extends CTAState,
	Actions,
	CustomActions = DispatchCustomCTARecord<Initial, Actions>,
> = CustomActions extends Record<string | number | symbol, never> ?
	CustomActions : {
		[Action in keyof CustomActions]: (
			CustomActions[Action] extends ( ( ...args: infer Args ) => void )
				? DispatchValueActionPayloadArgsProps<Args>
				: never
		) & {
			type: Action
		}
	};

export type CustomDispatchValueRecordValues<
	Initial extends CTAState,
	Actions,
	CustomActions = CustomDispatchValueRecord<Initial, Actions>,
> = CustomActions extends Record<string | number | symbol, never> ? never : CustomActions[keyof CustomActions];

export type DispatchCTA<
	Payload extends CTAState,
	Actions,
	ReturnValue = void,
> = ( // dispatch
	value: Exclude<
		{
			type: 'replaceInitial' | 'replace'
			payload: Payload | ( ( ctaHistory: CTAHistory<Payload> ) => Payload | undefined )
			args?: never
		}
		| {
			type: 'update' | 'updateInitial'
			payload: Partial<Payload> | ( ( ctaHistory: CTAHistory<Payload> ) => Partial<Payload> | undefined )
			args?: never
		}
		| {
			type: 'reset'
			payload?: Payload | ( ( ctaHistory: CTAHistory<Payload> ) => Payload | undefined )
			args?: never
		}
		// Custom action without args
		// {type: 'Your Action without args'}

		// Custom action with one arg
		// {type: 'Your Action without args', payload: 'your payload'}

		// Custom action with multiple args
		// {type: 'Your Action without args', payload: 'your payload', args:['more args']}
		| CustomDispatchValueRecordValues<Payload, Actions>,
		never
	>
) => ReturnValue;

export type UseCTAReturnTypeDispatchCTA<
	Payload extends CTAState,
	Actions,
	ReturnValue = void,
> = {
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update dispatch.cta.update}
	*/
	update(
		payload: Partial<Payload> | ( ( ctaHistory: CTAHistory<Payload> ) => Partial<Payload> | undefined ),
		_?: never
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update dispatch.cta.update}
	 */
	update<K extends keyof Payload,>(
		key: K,
		value: Payload[K]
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace dispatch.cta.replace}
	 */
	replace(
		payload: Payload | ( ( ctaHistory: CTAHistory<Payload> ) => Payload | undefined )
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial dispatch.cta.updateInitial}
	 */
	updateInitial(
		payload: Partial<Payload> | ( ( ctaHistory: CTAHistory<Payload> ) => Partial<Payload> | undefined ),
		_?: never
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial dispatch.cta.updateInitial}
	 */
	updateInitial<K extends keyof Payload,>(
		key: K,
		value: Payload[K]
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial dispatch.cta.replaceInitial}
	 */
	replaceInitial(
		payload: Payload | ( ( ctaHistory: CTAHistory<Payload> ) => Payload | undefined )
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset dispatch.cta.reset}
	 */
	reset(
		payload?: Payload | ( ( ctaHistory: CTAHistory<Payload> ) => Payload | undefined )
	): ReturnValue
} & {
	/**
	 * @typeParam {string | number} P - Placeholder for custom action key.
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-custom-actions dispatch.cta.YourCustomAction}
	 */
	[P in keyof Omit<Actions, keyof DefaultActionsRecord<Payload>>]: Actions[P] extends (
		( ctaParam: CustomCTAHistory<Payload>, ...args: infer Args ) => CustomCTAReturnType<Payload>
	) ? (
			( ...args: Args ) => ReturnValue
		) : never
};

export type UseCTAReturnTypeDispatch<
	State extends CTAState,
	Actions,
	ReturnValue = void,
> = Immutable<
	DispatchCTA<State, Actions, ReturnValue> & {
	/**
	 * {@link CTAHistory} reference
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-0-history useCTA return value [0]: history}
	 */
		history: CTAHistory<State>
		/**
		 * Reference for call-to-action dispatch functions.
		 */
		cta: OmitEmptyRecord<UseCTAReturnTypeDispatchCTA<State, Actions, ReturnValue>>
	}
>;
