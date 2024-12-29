import { CTAState, } from '../types/CTAState';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';

/**
 * Options for configuring action type behavior
 * @prop {boolean} [useDefault=] - When true, bypasses the use of an overridden action.
 */
export type ActionTypeOptions = {
	useDefault?: boolean
};

export type ActionTypeConstructParam<
	Payload extends CTAState,
	Type extends keyof DefaultActionsRecord<Payload>,
> = {
	actionTypeOptions?: ActionTypeOptions
	hasAugmentedAction: boolean
	payload: Parameters<DefaultActionsRecord<Payload>[Type]>[1]
	type: Type
};

export class ActionType<
	Payload extends CTAState,
	Type extends keyof DefaultActionsRecord<Payload>,
> {
	readonly type: ActionTypeConstructParam<Payload, Type>['type'];
	readonly payload: Readonly<ActionTypeConstructParam<Payload, Type>['payload']>;
	readonly actionTypeOptions: ActionTypeOptions;

	constructor( param: ActionTypeConstructParam<Payload, Type>, ) {
		this.type = param.type;
		this.payload = param.payload;
		this.actionTypeOptions = param.hasAugmentedAction
			? { ...param?.actionTypeOptions, }
			: { useDefault: true, };
	}
}

function _hasAugmentedAction<Actions,>( actions: Actions, type: keyof DefaultActionsRecord<Record<string, never>>, ) {
	return Boolean( actions && typeof actions === 'object' && type in actions, );
}

export class UpdateInitialActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'updateInitial'> {
	constructor( param: Pick<ActionTypeConstructParam<Payload, 'updateInitial'>, 'actionTypeOptions' | 'payload' | 'hasAugmentedAction'>, ) {
		super( {
			...param,
			type: 'updateInitial',
		}, );
	}
}

export function createUpdateInitialActionType<
	Payload extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAction = _hasAugmentedAction( actions, 'updateInitial', );

	return function updateActionType(
		payload: ActionTypeConstructParam<Payload, 'updateInitial'>['payload'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new UpdateInitialActionType<Payload>( {
			actionTypeOptions,
			hasAugmentedAction: hasAction,
			payload,
		}, );
	};
}

export class ResetActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'reset'> {
	constructor( param: Pick<ActionTypeConstructParam<Payload, 'reset'>, 'actionTypeOptions' | 'payload' | 'hasAugmentedAction'>, ) {
		super( {
			...param,
			type: 'reset',
		}, );
	}
}

export function createResetActionType<
	Payload extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAction = _hasAugmentedAction( actions, 'reset', );

	return function resetActionType(
		payload?: ActionTypeConstructParam<Payload, 'reset'>['payload'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new ResetActionType<Payload>( {
			actionTypeOptions,
			hasAugmentedAction: hasAction,
			payload,
		}, );
	};
}

export class UpdateActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'update'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Payload,
			'update'
		>,
		'actionTypeOptions' | 'payload' | 'hasAugmentedAction'
	>, ) {
		super( {
			...param,
			type: 'update',
		}, );
	}
}

export function createUpdateActionType<
	Payload extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAugmentedAction = _hasAugmentedAction( actions, 'update', );

	return function updateActionType(
		payload: ActionTypeConstructParam<Payload, 'update'>['payload'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new UpdateActionType<Payload>( {
			actionTypeOptions,
			hasAugmentedAction,
			payload,
		}, );
	};
}

export class ReplaceActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'replace'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Payload,
			'replace'
		>,
		'actionTypeOptions' | 'payload' | 'hasAugmentedAction'
	>, ) {
		super( {
			...param,
			type: 'replace',
		}, );
	}
}

export function createReplaceActionType<
	Payload extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAugmentedAction = _hasAugmentedAction( actions, 'replace', );

	return function replaceActionType(
		payload: ActionTypeConstructParam<Payload, 'replace'>['payload'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new ReplaceActionType<Payload>( {
			actionTypeOptions,
			hasAugmentedAction,
			payload,
		}, );
	};
}

export class ReplaceInitialActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'replaceInitial'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Payload,
			'replaceInitial'
		>,
		'actionTypeOptions' | 'payload' | 'hasAugmentedAction'
	>, ) {
		super( {
			...param,
			type: 'replaceInitial',
		}, );
	}
}

export function createReplaceInitialActionType<
	Payload extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAugmentedAction = _hasAugmentedAction( actions, 'replaceInitial', );

	return function replaceInitialActionType(
		payload: ActionTypeConstructParam<Payload, 'replaceInitial'>['payload'],
		actionTypeOptions?: ActionTypeOptions,
	) {
		return new ReplaceInitialActionType<Payload>( {
			actionTypeOptions,
			hasAugmentedAction,
			payload,
		}, );
	};
}
