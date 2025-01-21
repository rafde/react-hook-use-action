import type { ActionTypeConstructParam, ActionTypeOptions, } from '../types/ActionTypeConstructParam';
import type { CTAState, } from '../types/CTAState';
import type { DeepUpdateActionRecord, } from '../types/DeepUpdateActionRecord';
import type { DeepUpdateInitialActionRecord, } from '../types/DeepUpdateInitialActionRecord';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import createObjectFromArrayPath from './createObjectFromArrayPath';
import createObjectFromPath from './createObjectFromPath';

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

export class DeepUpdateActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'deepUpdate'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Payload,
			'deepUpdate'
		>,
		'actionTypeOptions' | 'payload' | 'hasAugmentedAction'
	>, ) {
		super( {
			...param,
			type: 'deepUpdate',
		}, );
	}
}

export function createDeepUpdateActionType<
	Payload extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAugmentedAction = _hasAugmentedAction( actions, 'deepUpdate', );
	const deepUpdateActionType: DeepUpdateActionRecord<Payload>['deepUpdateAction'] = (
		payload: unknown,
		value: unknown,
		options: unknown,
	) => {
		if ( Array.isArray( payload, ) ) {
			return new DeepUpdateActionType( {
				actionTypeOptions: options as ActionTypeOptions,
				hasAugmentedAction,
				payload: createObjectFromArrayPath(
					payload,
					value,
				) as ActionTypeConstructParam<
					Payload,
					'deepUpdate'
				>['payload'],
			}, );
		}

		if ( typeof payload === 'number' ) {
			return new DeepUpdateActionType( {
				actionTypeOptions: options as ActionTypeOptions,
				hasAugmentedAction,
				payload: {
					[ payload ]: value,
				} as ActionTypeConstructParam<
					Payload,
					'deepUpdate'
				>['payload'],
			}, );
		}

		if ( typeof payload === 'string' ) {
			return new DeepUpdateActionType( {
				actionTypeOptions: options as ActionTypeOptions,
				hasAugmentedAction,
				payload: createObjectFromPath(
					payload,
					value,
				) as ActionTypeConstructParam<
					Payload,
					'deepUpdate'
				>['payload'],
			}, );
		}
		return new DeepUpdateActionType( {
			actionTypeOptions: value as ActionTypeOptions,
			hasAugmentedAction,
			payload: payload as ActionTypeConstructParam<
				Payload,
				'deepUpdate'
			>['payload'],
		}, );
	};

	return deepUpdateActionType;
}

export class DeepUpdateInitialActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'deepUpdateInitial'> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Payload,
			'deepUpdateInitial'
		>,
		'actionTypeOptions' | 'payload' | 'hasAugmentedAction'
	>, ) {
		super( {
			...param,
			type: 'deepUpdateInitial',
		}, );
	}
}

export function createDeepUpdateInitialActionType<
	Payload extends CTAState,
	Actions,
>( actions: Actions, ) {
	const hasAugmentedAction = _hasAugmentedAction( actions, 'deepUpdateInitial', );

	const deepUpdateInitialActionType: DeepUpdateInitialActionRecord<Payload>['deepUpdateInitialAction'] = (
		payload: unknown,
		value: unknown,
		options: unknown,
	) => {
		if ( Array.isArray( payload, ) ) {
			return new DeepUpdateInitialActionType( {
				actionTypeOptions: options as ActionTypeOptions,
				hasAugmentedAction,
				payload: createObjectFromArrayPath(
					payload,
					value,
				) as ActionTypeConstructParam<
					Payload,
					'deepUpdateInitial'
				>['payload'],
			}, );
		}

		if ( typeof payload === 'number' ) {
			return new DeepUpdateInitialActionType( {
				actionTypeOptions: options as ActionTypeOptions,
				hasAugmentedAction,
				payload: {
					[ payload ]: value,
				} as ActionTypeConstructParam<
					Payload,
					'deepUpdateInitial'
				>['payload'],
			}, );
		}

		if ( typeof payload === 'string' ) {
			return new DeepUpdateInitialActionType( {
				actionTypeOptions: options as ActionTypeOptions,
				hasAugmentedAction,
				payload: createObjectFromPath(
					payload,
					value,
				) as ActionTypeConstructParam<
					Payload,
					'deepUpdateInitial'
				>['payload'],
			}, );
		}

		return new DeepUpdateInitialActionType( {
			actionTypeOptions: value as ActionTypeOptions,
			hasAugmentedAction,
			payload: payload as ActionTypeConstructParam<
				Payload,
				'deepUpdateInitial'
			>['payload'],
		}, );
	};

	return deepUpdateInitialActionType;
}

export class UpdateInitialActionType<
	Payload extends CTAState,
> extends ActionType<Payload, 'updateInitial'> {
	constructor( param: Pick<
		ActionTypeConstructParam<Payload, 'updateInitial'>,
		'actionTypeOptions' | 'payload' | 'hasAugmentedAction'
	>, ) {
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
