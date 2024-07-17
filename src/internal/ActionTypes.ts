import { CTAInitial, } from '../types/CTAInitial';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';

type ActionTypeOptionsNoAugmentedActionDefined = {
	useDefault: true
	options?: undefined
};

type ActionTypeOptions<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
	Actions,
	ActionType = Actions extends Pick<Partial<DefaultActionsRecord<Initial>>, Type> ? Pick<Actions, Type> : never,
	Action = ActionType[keyof ActionType],
> = {
	useDefault?: false
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	options?: Action extends ( ( ...args: infer Args ) => any ) ? Args[2] : undefined
} | ActionTypeOptionsNoAugmentedActionDefined;

export type ActionTypeConstructParam<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
	Actions,
> = {
	actionTypeOptions?: ActionTypeOptions<
		Initial,
		Type,
		Actions
	>
	hasAugmentedAction: boolean
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
	readonly actionTypeOptions: ActionTypeOptions<Initial, Type, Actions>;

	constructor( param: ActionTypeConstructParam<Initial, Type, Actions>, ) {
		this.type = param.type;
		this.nextState = param.nextState;
		this.actionTypeOptions = !param.hasAugmentedAction
			? { useDefault: true, }
			: {
				useDefault: !param.hasAugmentedAction,
				...param?.actionTypeOptions,
			};
	}
}

function _hasAugmentedAction<Actions,>( actions: Actions, type: keyof DefaultActionsRecord<Record<string, never>>, ) {
	return Boolean( actions && typeof actions === 'object' && type in actions, );
}

export class UpdateInitialActionType<
	Initial extends CTAInitial,
	Actions,
> extends ActionType<Initial, 'updateInitial', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'updateInitial', Actions>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>, ) {
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
	const hasAction = _hasAugmentedAction( actions, 'updateInitial', );

	return function updateActionType(
		nextState: ActionTypeConstructParam<Initial, 'updateInitial', Actions>['nextState'],
		actionTypeOptions?: ActionTypeOptions<Initial, 'updateInitial', Actions>,
	) {
		return new UpdateInitialActionType<Initial, Actions>( {
			actionTypeOptions,
			hasAugmentedAction: hasAction,
			nextState,
		}, );
	};
}

export class ResetActionType<
	Initial extends CTAInitial,
	Actions,
> extends ActionType<Initial, 'reset', Actions> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'reset', Actions>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>, ) {
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
	const hasAction = _hasAugmentedAction( actions, 'reset', );

	return function resetActionType(
		nextState?: ActionTypeConstructParam<Initial, 'reset', Actions>['nextState'],
		actionTypeOptions?: ActionTypeOptions<Initial, 'reset', Actions>,
	) {
		return new ResetActionType<Initial, Actions>( {
			actionTypeOptions,
			hasAugmentedAction: hasAction,
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
		'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'
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
	const hasAugmentedAction = _hasAugmentedAction( actions, 'update', );

	return function updateActionType(
		nextState: ActionTypeConstructParam<Initial, 'update', Actions>['nextState'],
		actionTypeOptions?: ActionTypeOptions<Initial, 'update', Actions>,
	) {
		return new UpdateActionType<Initial, Actions>( {
			actionTypeOptions,
			hasAugmentedAction,
			nextState,
		}, );
	};
}
