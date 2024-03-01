import { Dispatch, } from 'react';
import { DefaultCTARecord, } from './CTADefaults';
import { CustomCTARecord, } from './CustomCTARecord';
import { NextCTAProps, PayloadValue, ReplaceCTAProps, ResetCTAProps, UpdateCTAProps, } from './NextCTAProps';

type UseCTAReturnTypeDispatchDefaultRecord<Initial> = {
	replace( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	replaceInitial( payload: ReplaceCTAProps<Initial>['payload'] ): void;
	reset( payload?: ResetCTAProps<Initial>['payload'] ): void;
	update( payload: UpdateCTAProps<Initial>['payload'], value?: undefined ): void;
	update( payload: keyof Initial, value: Initial[keyof Initial] ): void;
};

type UseCTAReturnTypeDispatchCustomRecord<Initial, CustomActions extends CustomCTARecord<Initial>> = {
	[customAction in keyof CustomActions]: ( ( payload?: PayloadValue<Initial, Parameters<CustomActions[customAction]>[1]> ) => void )
}

type UseCTAReturnTypeDispatchRecord<Initial, Actions = undefined> = Actions extends CustomCTARecord<Initial> ? (
	keyof Omit<Actions, keyof DefaultCTARecord<Initial>> extends never ?
		UseCTAReturnTypeDispatchDefaultRecord<Initial> :
		UseCTAReturnTypeDispatchCustomRecord<Initial, Omit<Actions, keyof UseCTAReturnTypeDispatchDefaultRecord<Initial>>> & UseCTAReturnTypeDispatchDefaultRecord<Initial>
	) :
	UseCTAReturnTypeDispatchDefaultRecord<Initial>;

export type UseCTAReturnTypeDispatch<
	Initial,
	Actions = undefined
> = Dispatch<NextCTAProps<Initial, Actions>> & UseCTAReturnTypeDispatchRecord<Initial, Actions>;
