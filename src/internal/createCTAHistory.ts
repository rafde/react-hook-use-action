import type { CTAHistory, } from '../types/CTAHistory';
import type { CTAState, } from '../types/CTAState';

export default function createCTAHistory<Initial extends CTAState,>( ctaHistory: Partial<Omit<CTAHistory<Initial>, 'initial'>> & { initial: Initial }, ): CTAHistory<Initial> {
	const {
		changes = null,
		initial,
		current = initial,
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
