import { CTAInitial, } from '../types/CTAInitial';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';

export type ActionTypeConstructParam<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
	Actions,
	ActionType = Actions extends Pick<Partial<DefaultActionsRecord<Initial>>, Type> ? Pick<Actions, Type> : never,
	Action = ActionType[keyof ActionType],
> = {
	actionTypeOptions?: {
		useDefault?: false
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		options?: Action extends ( ( ...args: any[] ) => any ) ? Parameters<Action>[2] : undefined
	} | {
		useDefault: true
		options?: undefined
	}
	hasAction: boolean
	nextState: Parameters<DefaultActionsRecord<Initial>[Type]>[1]
	type: Type
};

export class ActionType<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
	Actions,
> {
	readonly type: ActionTypeConstructParam<Initial, Type, Actions>['type'];
	readonly nextState: Readonly<ActionTypeConstructParam<Initial, Type, Actions>['nextState']>;
	readonly actionTypeOptions: ActionTypeConstructParam<Initial, Type, Actions>['actionTypeOptions'];

	constructor( param: ActionTypeConstructParam<Initial, Type, Actions>, ) {
		this.type = param.type;
		this.nextState = param.nextState;
		this.actionTypeOptions = param.hasAction
			? {
				useDefault: !param.hasAction,
				...param?.actionTypeOptions,
			}
			: { useDefault: true, };
	}
}

export class UpdateInitialActionType<
	Initial extends CTAInitial,
	Actions,
> extends ActionType<Initial, 'updateInitial', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'updateInitial', Actions>, 'actionTypeOptions' | 'nextState' | 'hasAction'>, ) {
		super( {
			...param,
			type: 'updateInitial',
		}, );
	}
}

export function createUpdateInitialActionType<
	Initial extends CTAInitial,
	Actions,
>( actions: Actions, ) {
	const hasAction = actions && typeof actions === 'object' && 'updateInitial' in actions;

	return function updateActionType(
		nextState: ActionTypeConstructParam<Initial, 'updateInitial', Actions>['nextState'],
		actionTypeOptions?: ActionTypeConstructParam<Initial, 'updateInitial', Actions>['actionTypeOptions'],
	) {
		return new UpdateInitialActionType<Initial, Actions>( {
			actionTypeOptions,
			hasAction,
			nextState,
		}, );
	};
}

export class ResetActionType<
	Initial extends CTAInitial,
	Actions,
> extends ActionType<Initial, 'reset', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'reset', Actions>, 'actionTypeOptions' | 'nextState' | 'hasAction'>, ) {
		super( {
			...param,
			type: 'reset',
		}, );
	}
}

export function createResetActionType<
	Initial extends CTAInitial,
	Actions,
>( actions: Actions, ) {
	const hasAction = actions && typeof actions === 'object' && 'reset' in actions;

	return function resetActionType(
		nextState?: ActionTypeConstructParam<Initial, 'reset', Actions>['nextState'],
		actionTypeOptions?: ActionTypeConstructParam<Initial, 'reset', Actions>['actionTypeOptions'],
	) {
		return new ResetActionType<Initial, Actions>( {
			actionTypeOptions,
			hasAction,
			nextState,
		}, );
	};
}

export class UpdateActionType<
	Initial extends CTAInitial,
	Actions,
> extends ActionType<Initial, 'update', Actions> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Initial,
			'update',
			Actions
		>,
		'actionTypeOptions' | 'nextState' | 'hasAction'
	>, ) {
		super( {
			...param,
			type: 'update',
		}, );
	}
}

export function createUpdateActionType<
	Initial extends CTAInitial,
	Actions,
>( actions: Actions, ) {
	const hasAction = actions && typeof actions === 'object' && 'update' in actions;

	return function updateActionType(
		nextState: ActionTypeConstructParam<Initial, 'update', Actions>['nextState'],
		actionTypeOptions?: ActionTypeConstructParam<Initial, 'update', Actions>['actionTypeOptions'],
	) {
		return new UpdateActionType<Initial, Actions>( {
			actionTypeOptions,
			hasAction,
			nextState,
		}, );
	};
}
