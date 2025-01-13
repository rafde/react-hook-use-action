import type { CTAHistory, } from './CTAHistory';
import type { CTAState, } from './CTAState';
import type { Immutable, } from './Immutable';
import type { OmitEmptyRecord, } from './OmitEmptyRecord';
import type { Dispatch, } from './UseCTAReturnTypeDispatch';
import type { UseCTAReturnTypeDispatchCTA, } from './UseCTAReturnTypeDispatchCTA';

/**
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * @template {CTAState} State - CTAState type.
 * @template Actions - CTA actions type.
 * @template ReturnValue - Return value type.
 */
export type DispatchCTA<
	State extends CTAState,
	Actions,
	ReturnValue,
> = Immutable<
	Dispatch<State, Actions, ReturnValue> & {
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
