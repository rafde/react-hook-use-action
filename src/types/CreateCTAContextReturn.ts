import type {
	FC,
	PropsWithChildren,
	// @ts-expect-error -- Used in JSDoc comment
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ReactNode,
} from 'react';
import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { UseCTAParameter, } from './UseCTAParameter';

import { UseCTAParameterCreateFuncReturnRecord, } from './UseCTAParameterCreateFuncReturnRecord';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

// @ts-expect-error -- Used in JSDoc comment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { UseCTAParameterOnInit, } from './UseCTAParameterOnInit';
// @ts-expect-error -- Used in JSDoc comment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { UseCTAParameterCompare, } from './UseCTAParameterCompare';
// @ts-expect-error -- Used in JSDoc comment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { UseCTAParameterAfterActionChange, } from './UseCTAParameterAfterActionChange';

/**
 * Type definition for the return value of the {@link createCTAContext} `function`.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @property {CreateCTAContextReturn.CTAProvider}
 * - Provider to wrap components that need access to the cta context.
 * @property {() => CTAHistory} useCTAHistoryContext
 * - A hook for returning {@link CTAHistory} from context.
 * @property {() => UseCTAReturnTypeDispatch | null} useCTADispatchContext
 * - A hook for returning {@link UseCTAReturnTypeDispatch} from context to make call-to-actions.
 * `null` if called outside the `CTAProvider`.
 */
export type CreateCTAContextReturn<
	Initial extends CTAState,
	Actions,
	FR extends UseCTAParameterCreateFuncReturnRecord,
> = {
	/**
	 * Type definition for the `CreateCTAContextReturn.CTAProvider` component.
	 *
	 * @template {CTAState} Initial - The initial state type.
	 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
	 *
	 * @param {object} props
	 *
	 * @param {ReactNode} props.children - {@link ReactNode}.
	 *
	 * @param {CTAState} [props.initial] - Optional initial {@link CTAState} structure for overriding createCTAContext contextParams.initial {@link CTAHistory}.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
	 *
	 * @param {UseCTAParameterOnInit} [props.onInit] - Optional {@link UseCTAParameterOnInit} for overriding createCTAContext contextParams.onInit
	 * - `function` that runs once on component mount to handle `initial` parameter state before your component starts using it.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
	 *
	 * @param {UseCTAParameterCompare} [props.compare] - Optional {@link UseCTAParameterCompare} for overriding createCTAContext contextParams.compare
	 * - `function` for custom equality logic by comparing only specific properties.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
	 *
	 * @param {UseCTAParameterAfterActionChange} [props.afterActionChange] - Optional {@link UseCTAParameterAfterActionChange} for overriding contextParams.afterActionChange
	 * - `function` than only runs after an action has changed the hook state history.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-after-action-change useCTA Parameter: afterActionChange}
	 *
	 * @param {UseCTAParameterTransform} [props.transform] - Optional {@link UseCTAParameterTransform}
	 * - A `function` that returns a transformed {@link CTAState} object before a default action evaluates
	 * the result of a custom action or overridden default action.
	 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-transform useCTA Parameter: transform}
	 *
	 * @returns {ReactElement} The `CTAProvider` component.
	 */
	CTAProvider: FC<
		PropsWithChildren<
			Partial<
				Pick<
					UseCTAParameter<Initial, Actions>,
					'afterActionChange' | 'compare' | 'initial' | 'onInit' | 'transform'
				>
			>
		>
	>
	useCTADispatchContext: () => UseCTAReturnTypeDispatch<Initial, Actions, FR, void> | null
	useCTAHistoryContext: () => CTAHistory<Initial>
};
