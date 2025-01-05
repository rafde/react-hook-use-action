import type { CTAState, } from './CTAState';
import { UseCTAParameterAfterActionChange, } from './UseCTAParameterAfterActionChange';
import type { UseCTAParameterCompare, } from './UseCTAParameterCompare';
import type { UseCTAParameterOnInit, } from './UseCTAParameterOnInit';
import { UseCTAParameterTransform, } from './UseCTAParameterTransform';

/**
 * @template {CTAState} Initial - The {@link CTAState} hook state.
 */
export type UseCTAParameterDefaults<
	Initial extends CTAState,
> = {
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
	/**
	 * Optional {@link UseCTAParameterTransform}
	 * - A `function` that returns a transformed {@link CTAState} object
	 * before a default action evaluates the result of a custom action or overridden default action.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
	 */
	transform?: UseCTAParameterTransform<Initial>
};
