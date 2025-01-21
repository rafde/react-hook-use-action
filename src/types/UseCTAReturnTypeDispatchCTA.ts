import type { _GetCTAStateValue, } from './_GetCTAStateValue';
import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';
import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { GetArrayValue, } from './GetArrayValue';
import type { GetCTAStateValue, } from './GetCTAStateValue';
import type { NestedKeyArray, } from './NestedKeyArray';
import type { NestedKeys, } from './NestedKeys';
import type { NestedPartial, } from './NestedPartial';
import type { GetPathValue, } from './GetPathValue';

type DeepKeyCallBack<
	Payload extends CTAState,
	K extends NestedKeys<Payload>,
> = ( (
	ctaHistory: CTAHistory<Payload> & {
		changesValue: CTAHistory<Payload>['changes'] extends Payload
			? _GetCTAStateValue<CTAHistory<Payload>['changes'], K>
			: CTAHistory<Payload>['changes']
		currentValue: _GetCTAStateValue<CTAHistory<Payload>['current'], K>
		initialValue: _GetCTAStateValue<CTAHistory<Payload>['initial'], K>
		previousInitialValue: CTAHistory<Payload>['previousInitial'] extends Payload
			? _GetCTAStateValue<CTAHistory<Payload>['previousInitial'], K>
			: CTAHistory<Payload>['previousInitial']
		previousValue: CTAHistory<Payload>['previous'] extends Payload
			? _GetCTAStateValue<CTAHistory<Payload>['previous'], K>
			: CTAHistory<Payload>['previous']
	}
) => GetCTAStateValue<Payload, K> );

type DeepArrayCallBack<
	Payload extends CTAState,
	K extends NestedKeyArray<Payload>,
> = ( (
	ctaHistory: CTAHistory<Payload> & {
		changesValue: CTAHistory<Payload>['changes'] extends Payload
			? GetArrayValue<CTAHistory<Payload>['changes'], K>
			: CTAHistory<Payload>['changes']
		currentValue: GetArrayValue<CTAHistory<Payload>['current'], K>
		initialValue: GetArrayValue<CTAHistory<Payload>['initial'], K>
		previousInitialValue: CTAHistory<Payload>['previousInitial'] extends Payload
			? GetArrayValue<CTAHistory<Payload>['previousInitial'], K>
			: CTAHistory<Payload>['previousInitial']
		previousValue: CTAHistory<Payload>['previous'] extends Payload
			? GetArrayValue<CTAHistory<Payload>['previous'], K>
			: CTAHistory<Payload>['previous']
	}
) => GetArrayValue<Payload, K> );

export type UseCTAReturnTypeDispatchCTA<
	Payload extends CTAState,
	Actions,
	ReturnValue,
> = {
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace dispatch.cta.replace}
	 */
	replace(
		payload: Payload | (
			( ctaHistory: CTAHistory<Payload> ) => Payload | undefined
		)
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial dispatch.cta.replaceInitial}
	 */
	replaceInitial(
		payload: Payload | (
			( ctaHistory: CTAHistory<Payload> ) => Payload | undefined
		)
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset dispatch.cta.reset}
	 */
	reset(
		payload?: Payload | (
			( ctaHistory: CTAHistory<Payload> ) => Payload | undefined
		)
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update dispatch.cta.update}
	 */
	update(
		payload: Partial<Payload> | (
			( ctaHistory: CTAHistory<Payload> ) => Partial<Payload> | undefined
		),
		_?: never
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update dispatch.cta.update}
	 */
	update<K extends keyof Payload, >(
		key: K,
		value: Payload[K]
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateDeep dispatch.cta.deepUpdate}
	 */
	deepUpdate(
		payload: NestedPartial<Payload> | (
			( ctaHistory: CTAHistory<Payload> ) => NestedPartial<Payload> | undefined
		),
		_?: never
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateDeep dispatch.cta.deepUpdate}
	 */
	deepUpdate<K extends keyof Payload, >(
		key: K,
		value: Payload[K] extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<GetPathValue<Payload, K >>
			: Payload[K]
	): ReturnValue
	deepUpdate<K extends NestedKeys<Payload>, >(
		key: K,
		value: DeepKeyCallBack<Payload, K>
			| GetCTAStateValue<Payload, K>,
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateDeep dispatch.cta.deepUpdate}
	 */
	deepUpdate<K extends NestedKeyArray<Payload>,>(
		key: K,
		value: DeepArrayCallBack<Payload, K>
			| ( GetArrayValue<Payload, K> extends Record<
				string | number | symbol,
				unknown
			> ? NestedPartial<GetArrayValue<Payload, K>>
				: GetArrayValue<Payload, K> )
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial dispatch.cta.updateInitial}
	 */
	updateInitial(
		payload: Partial<Payload> | (
			( ctaHistory: CTAHistory<Payload> ) => Partial<Payload> | undefined
		),
		_?: never
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial dispatch.cta.updateInitial}
	 */
	updateInitial<K extends keyof Payload, >(
		key: K,
		value: Payload[K]
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitialDeep dispatch.cta.deepUpdateInitial}
	 */
	deepUpdateInitial(
		payload: NestedPartial<Payload> | (
			( ctaHistory: CTAHistory<Payload> ) => NestedPartial<Payload> | undefined
		),
		_?: never
	): ReturnValue
	deepUpdateInitial<K extends keyof Payload, >(
		key: K,
		value: Payload[K] extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<GetPathValue<Payload, K >>
			: Payload[K]
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitialDeep dispatch.cta.deepUpdateInitial}
	 */
	deepUpdateInitial<K extends NestedKeys<Payload>, >(
		key: K,
		value: DeepKeyCallBack<Payload, K>
			| GetCTAStateValue<Payload, K>,
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitialDeep dispatch.cta.deepUpdateInitial}
	 */
	deepUpdateInitial<K extends NestedKeyArray<Payload>, >(
		key: K,
		value: DeepArrayCallBack<Payload, K>
			| ( GetArrayValue<Payload, K> extends Record<
				string | number | symbol,
				unknown
			> ? NestedPartial<GetArrayValue<Payload, K>>
				: GetArrayValue<Payload, K> )
	): ReturnValue
}
	&
{
	/**
	 * @typeParam {string | number} P - Placeholder for custom action key.
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-custom-actions dispatch.cta.YourCustomAction}
	 */
	[P in keyof Omit<
		Actions,
		keyof DefaultActionsRecord<Payload>
	>]: Actions[P] extends (
		(
			ctaParam: CustomCTAHistory<Payload>,
			...args: infer Args
		) => CustomCTAReturnType<Payload>
	) ? (
			( ...args: Args ) => ReturnValue
		) : never
};
