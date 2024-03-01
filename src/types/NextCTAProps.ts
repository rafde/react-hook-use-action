import type { DefaultCTARecord, } from './CTADefaults';
import type { CustomCTARecord, } from './CustomCTARecord';
import type { CTAParam, } from './CTAParam';
import type { CTARecord, } from './CTARecord';

export type PayloadValue<
	Initial,
	ReturnValue = Initial
> = ( ( ctaParam: CTAParam<Initial> ) => ReturnValue | undefined ) |
	ReturnValue;

export type ReplaceCTAProps<Initial> = {
	action: 'replace',
	payload: PayloadValue<
		Parameters<DefaultCTARecord<Initial>['replace']>[1]
	>
}

export type ReplaceInitialCTAProps<Initial> = {
	action: 'replaceInitial',
	payload: PayloadValue<
		Parameters<DefaultCTARecord<Initial>['replaceInitial']>[1]
	>
}

export type ResetCTAProps<Initial> = {
	action: 'reset',
	payload?: PayloadValue<
		Initial,
		Parameters<DefaultCTARecord<Initial>['reset']>[1]
	>
}

export type UpdateCTAProps<Initial> = {
	action: 'update',
	payload: PayloadValue<
		Initial,
		Parameters<DefaultCTARecord<Initial>['update']>[1]
	>
}

export type CustomCTAProps<
	Initial,
	Actions extends CTARecord<Initial>,
	CustomActions extends CustomCTARecord<Initial> = Omit<Actions, keyof DefaultCTARecord<Initial>>,
> = CustomActions extends never ? never : {
	action: keyof CustomActions,
	payload?: PayloadValue<
		Initial,
		Parameters<CustomActions[keyof CustomActions]>[1]
	>
}

export type DefaultCTAProps<Initial> = ReplaceCTAProps<Initial> |
	ReplaceInitialCTAProps<Initial> |
	ResetCTAProps<Initial> |
	UpdateCTAProps<Initial>;

export type NextCTAProps<
	Initial,
	Actions = undefined,
> = Actions extends CTARecord<Initial> ? (
	CustomCTAProps<Initial, Actions> extends never ?
		DefaultCTAProps<Initial> :
		DefaultCTAProps<Initial> | CustomCTAProps<Initial, Actions>
) : DefaultCTAProps<Initial>;
