import { CTAState, } from '../types/CTAState';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';

type ActionTypeOptionsNoAugmentedActionDefined = {
	useDefault: true
};

type ActionTypeOptions = {
	useDefault?: false
} | ActionTypeOptionsNoAugmentedActionDefined;

export type ActionTypeConstructParam<
	Initial extends CTAState,
	Type extends keyof DefaultActionsRecord<Initial>,
> = {
	actionTypeOptions?: ActionTypeOptions
	hasAugmentedAction: boolean
	nextState: Parameters<DefaultActionsRecord<Initial>[Type]>[1]
	type: Type
};

export class ActionType<
	Initial extends CTAState,
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
	Initial extends CTAState,
> extends ActionType<Initial, 'updateInitial'> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'updateInitial'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>, ) {
		super( {
			...param,
			type: 'updateInitial',
		}, );
	}
}

export function createUpdateInitialActionType<
	Initial extends CTAState,
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
	Initial extends CTAState,
> extends ActionType<Initial, 'reset'> {
	constructor( param: Pick<ActionTypeConstructParam<Initial, 'reset'>, 'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'>, ) {
		super( {
			...param,
			type: 'reset',
		}, );
	}
}

export function createResetActionType<
	Initial extends CTAState,
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
	Initial extends CTAState,
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
	Initial extends CTAState,
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

export class ReplaceActionType<
	Initial extends CTAState,
> extends ActionType<Initial, 'replace'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Initial,
			'replace'
		>,
		'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'
	>, ) {
		super( {
			...param,
			type: 'replace',
		}, );
	}
}

export function createReplaceActionType<
	Initial extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAugmentedAction = _hasAugmentedAction( actions, 'replace', );

	return function replaceActionType(
		nextState: ActionTypeConstructParam<Initial, 'replace'>['nextState'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new ReplaceActionType<Initial>( {
			actionTypeOptions,
			hasAugmentedAction,
			nextState,
		}, );
	};
}

export class ReplaceInitialActionType<
	Initial extends CTAState,
> extends ActionType<Initial, 'replaceInitial'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Initial,
			'replaceInitial'
		>,
		'actionTypeOptions' | 'nextState' | 'hasAugmentedAction'
	>, ) {
		super( {
			...param,
			type: 'replaceInitial',
		}, );
	}
}

export function createReplaceInitialActionType<
	Initial extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAugmentedAction = _hasAugmentedAction( actions, 'replaceInitial', );

	return function replaceInitialActionType(
		nextState: ActionTypeConstructParam<Initial, 'replaceInitial'>['nextState'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new ReplaceInitialActionType<Initial>( {
			actionTypeOptions,
			hasAugmentedAction,
			nextState,
		}, );
	};
}
