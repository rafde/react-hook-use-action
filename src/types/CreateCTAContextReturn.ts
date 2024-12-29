import type {
	FC,
	PropsWithChildren,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
	ReactNode,
} from 'react';
import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { UseCTAParameter, } from './UseCTAParameter';
import type { UseCTAReturnTypeDispatch, } from './UseCTAReturnTypeDispatch';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterOnInit, } from './UseCTAParameterOnInit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterCompare, } from './UseCTAParameterCompare';

/**
 * Type definition for the `CTAProvider` component.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {Partial<UseCTAParameter<Initial, Actions>>} props - The {@link UseCTAParameter} parameter.
 *
 * @param {ReactNode} props.children - `CTAProvider` {@link ReactNode} children.
 *
 * @param {CTAState} [props.initial] - initial {@link CTAState}.
 *
 * @param {UseCTAParameterOnInit<Initial>} [props.onInit] - {@link UseCTAParameterOnInit} `function` that runs once on component mount.
 *
 * @param {UseCTAParameterCompare<Initial>} [props.compare] - {@link UseCTAParameterCompare} `function` that compares the previous and current state.
 *
 * @returns {ReactElement} The `CTAProvider` component.
 */
type CreateCTAContextReturnCTAProvider<
	Initial extends CTAState,
	Actions,
> = FC<
	PropsWithChildren<
		Partial<
			Pick<
				UseCTAParameter<Initial, Actions>,
				'initial' | 'onInit' | 'compare'
			>
		>
	>
>;

/**
 * Type definition for the return value of the {@link createCTAContext} `function`.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @property {CreateCTAContextReturnCTAProvider<Initial, Actions>} CTAProvider - {@link CreateCTAContextReturnCTAProvider} component.
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
	CTAProvider: CreateCTAContextReturnCTAProvider<Initial, Actions>
	useCTAHistoryContext: () => CTAHistory<Initial>
	useCTADispatchContext: () => UseCTAReturnTypeDispatch<Initial, Actions> | null
};
