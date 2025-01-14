import type { CTAHistory, } from '../types/CTAHistory';
import type { CTAState, } from '../types/CTAState';

export default function createCTAHistory<Initial extends CTAState,>( ctaHistory: Partial<Omit<CTAHistory<Initial>, 'current'>> & { current: Initial }, ): CTAHistory<Initial> {
	const {
		changes = null,
		current,
		initial = current,
		previous = null,
		previousInitial = null,
	} = ctaHistory;
	return {
		changes,
		current,
		initial,
		previous,
		previousInitial,
	};
}
