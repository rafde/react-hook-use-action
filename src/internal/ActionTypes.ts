import { CTAInitial, } from '../types/CTAInitial';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import { RestAfterSecond, } from '../types/RestAfterSecond';
import { OptionsParams, } from '../types/OptionsParams';

export type ActionTypeConstructParam<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
	Actions,
> = {
	type: Type
	nextState: Parameters<DefaultActionsRecord<Initial>[Type]>[1]
	actionTypeOptions?: {
		useDefault?: true
		args?: undefined
		options?: undefined
	} | {
		useDefault?: false
		args?: Actions extends Pick<DefaultActionsRecord<Initial>, Type> ? RestAfterSecond<Parameters<Actions[Type]>> : undefined
		options?: OptionsParams
	}
};

export class ActionType<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
	Actions,
> {
	readonly type: ActionTypeConstructParam<Initial, Type, Actions>['type'];
	readonly nextState: Readonly<ActionTypeConstructParam<Initial, Type, Actions>['nextState']>;
	readonly actionTypeOptions: Readonly<Exclude<ActionTypeConstructParam<Initial, Type, Actions>['actionTypeOptions'], undefined>>;

	constructor( param: ActionTypeConstructParam<Initial, Type, Actions>, ) {
		this.type = param.type;
		this.nextState = param.nextState;
		this.actionTypeOptions = {
			useDefault: false,
			...param?.actionTypeOptions,
		};
	}
}

export class ReplaceActionType<
	Initial extends CTAInitial,
	Actions = undefined,
> extends ActionType<Initial, 'replace', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'replace', Actions>, 'actionTypeOptions' | 'nextState'>, ) {
		super( {
			...param,
			type: 'replace',
		}, );
	}
}

export function createReplaceActionType<
	Initial extends CTAInitial,
	Actions = undefined,
>( nextState: ActionTypeConstructParam<Initial, 'replace', Actions>['nextState'], actionTypeOptions?: ActionTypeConstructParam<Initial, 'replace', Actions>['actionTypeOptions'], ) {
	return new ReplaceActionType( {
		nextState,
		actionTypeOptions,
	}, );
}

export class ReplaceInitialActionType<
	Initial extends CTAInitial,
	Actions = undefined,
> extends ActionType<Initial, 'replaceInitial', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'replaceInitial', Actions>, 'actionTypeOptions' | 'nextState'>, ) {
		super( {
			...param,
			type: 'replaceInitial',
		}, );
	}
}

export function createReplaceInitialActionType<
	Initial extends CTAInitial,
	Actions = undefined,
>( nextState: ActionTypeConstructParam<Initial, 'replaceInitial', Actions>['nextState'], actionTypeOptions?: ActionTypeConstructParam<Initial, 'replaceInitial', Actions>['actionTypeOptions'], ) {
	return new ReplaceInitialActionType( {
		nextState,
		actionTypeOptions,
	}, );
}

export class ResetActionType<
	Initial extends CTAInitial,
	Actions = undefined,
> extends ActionType<Initial, 'reset', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'reset', Actions>, 'actionTypeOptions' | 'nextState'>, ) {
		super( {
			...param,
			type: 'reset',
		}, );
	}
}

export function createResetActionType<
	Initial extends CTAInitial,
	Actions = undefined,
>( nextState?: ActionTypeConstructParam<Initial, 'reset', Actions>['nextState'], actionTypeOptions?: ActionTypeConstructParam<Initial, 'reset', Actions>['actionTypeOptions'], ) {
	return new ResetActionType( {
		nextState,
		actionTypeOptions,
	}, );
}

export class UpdateActionType<
	Initial extends CTAInitial,
	Actions = undefined,
> extends ActionType<Initial, 'update', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'update', Actions>, 'actionTypeOptions' | 'nextState'>, ) {
		super( {
			...param,
			type: 'update',
		}, );
	}
}

export function createUpdateActionType<
	Initial extends CTAInitial,
	Actions = undefined,
>( nextState: ActionTypeConstructParam<Initial, 'update', Actions>['nextState'], actionTypeOptions?: ActionTypeConstructParam<Initial, 'update', Actions>['actionTypeOptions'], ) {
	return new UpdateActionType<Initial, Actions>( {
		nextState,
		actionTypeOptions,
	}, );
}
