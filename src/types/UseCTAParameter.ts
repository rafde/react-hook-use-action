import type { CTAState, } from './CTAState';
import { UseCTAParameterDefaults, } from './UseCTAParameterDefaults';

/**
 * Parameter type for {@link useCTA} or {@link createCTAContext}.
 * @template {CTAState} Initial - The {@link CTAState} hook state.
 * @template {UseCTAParameterActionsRecordProp | undefined} Actions
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter useCTA Parameter}
 */
export type UseCTAParameter<
	Initial extends CTAState,
	Actions,
> = UseCTAParameterDefaults<Initial> & {
	/**
	 *  Optional {@link UseCTAParameterActionsRecordProp}
	 * - `object` to define custom and/or overridden actions for state management.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
	 */
	actions?: Actions
};
