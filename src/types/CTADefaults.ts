import { CTAParams, } from './CTAParams';

type ReplaceCTA<Payload> = (
	ctaParams: CTAParams<Payload>,
	payload: Payload
) => Payload | undefined;

export type DefaultCTARecord<Payload> = {
	replace: ReplaceCTA<Payload>,
	replaceInitial: ReplaceCTA<Payload>,
	reset(
		ctaParams: CTAParams<Payload>,
		payload?: Payload
	): Payload | undefined,
	update(
		ctaParams: CTAParams<Payload>,
		payload: Partial<Payload>
	): Partial<Payload> | undefined,
}
