import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type {
	UseCTAParameterActionsOptionalDefaultRecord,
} from './UseCTAParameterActionsOptionalDefaultRecord';

/**
 * A `function` that only runs after an action has changed the hook state history.
 * Does not run if the action has not changed the hook state history.
 * Useful for performing side effects after an action has changed the hook state history, such as logging, analytics, setting local storage, etc.
 * Can run `async` or `sync` code.
 * @template {CTAState} State - The {@link CTAState} hook state.
 * @param {CTAHistory<State>} ctaHistory - The {@link CTAHistory} object after the action has changed the hook state history.
 * @param {keyof UseCTAParameterActionsRecordProp<State>} actionType - Key of {@link UseCTAParameterActionsRecordProp}.
 * @param {string | number} [customActionName] - Custom action key if called by a custom action, otherwise `undefined`.
 * @returns {Promise<void> | void} - A `Promise<void>` or `void`.
 */
export type UseCTAParameterAfterActionChange<
	State extends CTAState,
> = (
	ctaHistory: CTAHistory<State>,
	actionType: keyof UseCTAParameterActionsOptionalDefaultRecord<State>,
	customActionName?: string | number
) => Promise<void> | void;
