import type { CustomCTAHistory, } from './CustomCTAHistory';
import type { CustomCTAReturnType, } from './CustomCTAReturnType';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';
import type { CTAState, } from './CTAState';
import type { CTAHistory, } from './CTAHistory';
import type { NestedArrayValue, } from './NestedArrayValue';
import type { NestedKeyArray, } from './NestedKeyArray';
import type { NestedKeys, } from './NestedKeys';
import type { NestedPartial, } from './NestedPartial';
import type { NestedValue, } from './NestedValue';

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
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateDeep dispatch.cta.updateDeep}
	 */
	updateDeep(
		payload: NestedPartial<Payload> | (
			( ctaHistory: CTAHistory<Payload> ) => NestedPartial<Payload> | undefined
		),
		_?: never
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateDeep dispatch.cta.updateDeep}
	 */
	updateDeep<K extends keyof Payload, >(
		key: K,
		value: Payload[K] extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<NestedValue<Payload, K >>
			: Payload[K]
	): ReturnValue
	updateDeep<K extends NestedKeys<Payload>, >(
		key: K,
		value: NestedValue<Payload, K> extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<NestedValue<Payload, K>>
			: NestedValue<Payload, K>
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateDeep dispatch.cta.updateDeep}
	 */
	updateDeep<K extends NestedKeyArray<Payload>,>(
		key: K,
		value: NestedArrayValue<Payload, K> extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<NestedArrayValue<Payload, K>>
			: NestedArrayValue<Payload, K>
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
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitialDeep dispatch.cta.updateInitialDeep}
	 */
	updateInitialDeep(
		payload: NestedPartial<Payload> | (
			( ctaHistory: CTAHistory<Payload> ) => NestedPartial<Payload> | undefined
		),
		_?: never
	): ReturnValue
	updateInitialDeep<K extends keyof Payload, >(
		key: K,
		value: Payload[K] extends Record<
					string | number | symbol,
			unknown
		> ? NestedPartial<NestedValue<Payload, K >>
			: Payload[K]
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitialDeep dispatch.cta.updateInitialDeep}
	 */
	updateInitialDeep<K extends NestedKeys<Payload>, >(
		key: K,
		value: NestedValue<Payload, K> extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<NestedValue<Payload, K>>
			: NestedValue<Payload, K>
	): ReturnValue
	/**
	 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitialDeep dispatch.cta.updateInitialDeep}
	 */
	updateInitialDeep<K extends NestedKeyArray<Payload>, >(
		key: K,
		value: NestedArrayValue<Payload, K> extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<NestedArrayValue<Payload, K>>
			: NestedArrayValue<Payload, K>
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
