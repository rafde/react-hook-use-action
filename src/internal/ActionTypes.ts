import { CTAInitial, } from '../types/CTAInitial';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';

type ActionTypeOptionsNoAugmentedActionDefined = {
	useDefault: true
};

type ActionTypeOptions = {
	useDefault?: false
} | ActionTypeOptionsNoAugmentedActionDefined;

export type ActionTypeConstructParam<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
> = {
	actionTypeOptions?: ActionTypeOptions
	hasAugmentedAction: boolean
	nextState: Parameters<DefaultActionsRecord<Initial>[Type]>[1]
	type: Type
};

export class ActionType<
	Initial extends CTAInitial,
	Type extends keyof DefaultActionsRecord<Initial>,
> {
	readonly type: ActionTypeConstructParam<Initial, Type>['type'];
	readonly nextState: Readonly<ActionTypeConstructParam<Initial, Type>['nextState']>;
	readonly actionTypeOptions: ActionTypeOptions;

	constructor( param: ActionTypeConstructParam<Initial, Type>, ) {
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
> extends ActionType<Initial, 'updateInitial'> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'updateInitial'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>, ) {
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
		nextState: ActionTypeConstructParam<Initial, 'updateInitial'>['nextState'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new UpdateInitialActionType<Initial>( {
			actionTypeOptions,
			hasAugmentedAction: hasAction,
			nextState,
		}, );
	};
}

export class ResetActionType<
	Initial extends CTAInitial,
> extends ActionType<Initial, 'reset'> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'reset'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>, ) {
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
		nextState?: ActionTypeConstructParam<Initial, 'reset'>['nextState'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new ResetActionType<Initial>( {
			actionTypeOptions,
			hasAugmentedAction: hasAction,
			nextState,
		}, );
	};
}

export class UpdateActionType<
	Initial extends CTAInitial,
> extends ActionType<Initial, 'update'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Initial,
			'update'
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
		nextState: ActionTypeConstructParam<Initial, 'update'>['nextState'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new UpdateActionType<Initial>( {
			actionTypeOptions,
			hasAugmentedAction,
			nextState,
		}, );
	};
}
