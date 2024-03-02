import type { DefaultCTARecord, } from './CTADefaults';
import type { CTAInitial, } from './CTAInitial';
import type { CustomCTARecord, } from './CustomCTARecord';
import type { CTAParam, } from './CTAParam';
import type { CTARecord, } from './CTARecord';

export type PayloadValue<
	Initial extends CTAInitial,
	ReturnValue = Initial
> = ReturnValue | (
	( ctaParam: CTAParam<Initial> ) => ReturnValue | undefined
);

export type ReplaceCTAProps<Initial extends CTAInitial> = {
	action: 'replace',
	payload: PayloadValue<
		Parameters<DefaultCTARecord<Initial>['replace']>[1]
	>
}

export type ReplaceInitialCTAProps<Initial extends CTAInitial> = {
	action: 'replaceInitial',
	payload: PayloadValue<
		Parameters<DefaultCTARecord<Initial>['replaceInitial']>[1]
	>
}

export type ResetCTAProps<Initial extends CTAInitial> = {
	action: 'reset',
	payload?: PayloadValue<
		Initial,
		Parameters<DefaultCTARecord<Initial>['reset']>[1]
	>
}

export type UpdateCTAProps<Initial extends CTAInitial> = {
	action: 'update',
	payload: PayloadValue<
		Initial,
		Parameters<DefaultCTARecord<Initial>['update']>[1]
	>
}

export type CustomCTAProps<
	Initial extends CTAInitial,
	Actions extends CTARecord<Initial>,
	CustomActions extends CustomCTARecord<Initial> = Omit<Actions, keyof DefaultCTARecord<Initial>>,
> = CustomActions extends never ? never : {
	action: keyof CustomActions,
	payload?: PayloadValue<
		Initial,
		Parameters<CustomActions[keyof CustomActions]>[1]
	>
}

export type DefaultCTAProps<Initial extends CTAInitial> = ReplaceCTAProps<Initial> |
	ReplaceInitialCTAProps<Initial> |
	ResetCTAProps<Initial> |
	UpdateCTAProps<Initial>;

export type NextCTAProps<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial> = undefined,
> = Actions extends CTARecord<Initial> ? (
	CustomCTAProps<Initial, Actions> extends never ?
		DefaultCTAProps<Initial> :
		DefaultCTAProps<Initial> | CustomCTAProps<Initial, Actions>
) : DefaultCTAProps<Initial>;
