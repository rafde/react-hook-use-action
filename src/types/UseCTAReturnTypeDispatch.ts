import type { Dispatch, } from 'react';
import type { DefaultCTARecord, } from './CTADefaults';
import type { CTAInitial, } from './CTAInitial';
import type { CTARecord, } from './CTARecord';
import type { CustomCTARecord, } from './CustomCTARecord';
import type { NextCTAProps, PayloadValue, ReplaceCTAProps, ResetCTAProps, UpdateCTAProps, } from './NextCTAProps';

type UseCTAReturnTypeDispatchDefaultRecord<Initial extends CTAInitial> = {
	replace( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	replaceInitial( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	reset( payload?: ResetCTAProps<Initial>['payload'] ): void;
	update( payload: UpdateCTAProps<Initial>['payload'], value?: undefined ): void;
	update( payload: keyof Initial, value: Initial[keyof Initial] ): void;
};

type UseCTAReturnTypeDispatchCustomRecord<
	Initial extends CTAInitial,
	CustomActions extends CustomCTARecord<Initial>
> = {
	[customAction in keyof CustomActions]: ( ( payload?: PayloadValue<Initial, Parameters<CustomActions[customAction]>[1]> ) => void )
}

type UseCTAReturnTypeDispatchRecord<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial> = undefined
> = Actions extends CustomCTARecord<Initial> ? (
	keyof Omit<Actions, keyof DefaultCTARecord<Initial>> extends never ?
		UseCTAReturnTypeDispatchDefaultRecord<Initial> :
		UseCTAReturnTypeDispatchCustomRecord<Initial, Omit<Actions, keyof UseCTAReturnTypeDispatchDefaultRecord<Initial>>> & UseCTAReturnTypeDispatchDefaultRecord<Initial>
	) :
	UseCTAReturnTypeDispatchDefaultRecord<Initial>;

export type UseCTAReturnTypeDispatch<
	Initial extends CTAInitial,
	Actions extends undefined | CTARecord<Initial> = undefined
> = Dispatch<NextCTAProps<Initial, Actions>> & UseCTAReturnTypeDispatchRecord<Initial, Actions>;
