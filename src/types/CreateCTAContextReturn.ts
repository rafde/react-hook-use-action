import type {
	FC,
	PropsWithChildren,
	// @ts-expect-error -- Used in JSDoc comment
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
	ReactNode,
} from 'react';
import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { UseCTAParameter, } from './UseCTAParameter';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

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
	 * @param {CTAState} [props.initial] - optional override for createCTAContext contextParams.initial
	 *
	 * @param {UseCTAParameterOnInit<Initial>} [props.onInit] - optional override for createCTAContext contextParams.onInit
	 *
	 * @param {UseCTAParameterCompare<Initial>} [props.compare] - optional createCTAContext contextParams.compare
	 *
	 * @returns {ReactElement} The `CTAProvider` component.
	 */
	CTAProvider: FC<
		PropsWithChildren<
			Partial<
				Pick<
					UseCTAParameter<Initial, Actions>,
					'initial' | 'onInit' | 'compare'
				>
			>
		>
	>
	useCTAHistoryContext: () => CTAHistory<Initial>
	useCTADispatchContext: () => UseCTAReturnTypeDispatch<Initial, Actions> | null
};
