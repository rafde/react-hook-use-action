import { UseCTAParameterAfterActionChange, } from './UseCTAParameterAfterActionChange';
import type { UseCTAParameterCompare, } from './UseCTAParameterCompare';
import type { CTAState, } from './CTAState';
import type { UseCTAParameterOnInit, } from './UseCTAParameterOnInit';

/**
 * @template {CTAState} Initial - The {@link CTAState} hook state.
 * @template {UseCTAParameterActionsRecordProp<Initial> | undefined} Actions
 */
export type UseCTAParameter<
	Initial extends CTAState,
	Actions,
> = Actions extends undefined ? {
	actions?: undefined
	/**
   * initial {@link CTAState} structure for {@link CTAHistory}.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
   */
	initial: Initial
	/**
	 * Optional {@link UseCTAParameterOnInit}
	 * - `function` for handling `initial` parameter on component mount.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
	 */
	onInit?: UseCTAParameterOnInit<Initial>
	/**
   * Optional {@link UseCTAParameterCompare}
   * - `function` for custom equality logic by comparing only specific properties.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
   */
	compare?: UseCTAParameterCompare<Initial>
	/**
	 * Optional {@link UseCTAParameterAfterActionChange}
	 * - `function` than only runs after an action has changed the hook state history.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChanged}
	 */
	afterActionChange?: UseCTAParameterAfterActionChange<Initial>
} : {
	/**
	 *  Optional {@link UseCTAParameterActionsRecordProp}
	 * - `object` to define custom and/or overridden actions for state management.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
	 */
	actions: Actions
	/**
   * initial {@link CTAState} structure for {@link CTAHistory}.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
   */
	initial: Initial
	/**
   * Optional {@link UseCTAParameterOnInit}
   * - `function` that runs once on component mount to handle `initial` parameter state before your component starts using it.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
   */
	onInit?: UseCTAParameterOnInit<Initial>
	/**
   * Optional {@link UseCTAParameterCompare}
   * - `function` for custom equality logic by comparing only specific properties.
   * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
   */
	compare?: UseCTAParameterCompare<Initial>
	/**
	 * Optional {@link UseCTAParameterAfterActionChange}
	 * - `function` than only runs after an action has changed the hook state history.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChanged}
	 */
	afterActionChange?: UseCTAParameterAfterActionChange<Initial>
};
