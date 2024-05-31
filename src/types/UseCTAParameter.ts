import type { CTAInitial, } from './CTAInitial';
import type { UseCTAParameterActionsRecordProp, } from './UseCTAParameterActionsRecordProp';

/**
 * @template Initial - Initial state of the CTA.
 * @template Actions - Record of action functions to be used in the context of the CTA.
 * @typedef {Object} UseCTAParameter
 * @property {Actions | undefined} [actions] - Record of action functions to be used in the context of the CTA.
 * @property {Initial} initial - Initial state of the CTA.
 * @property {((initial: Initial) => Initial) | undefined} [onInit] - Function to be called when the CTA is initialized.
 */
export type UseCTAParameter<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
> = {
	actions?: Actions
	initial: Initial
	onInit?: ( ( initial: Initial ) => Initial )
};
