import type { ActionTypeConstructParam, ActionTypeOptions, } from '../types/ActionTypeConstructParam';
import type { CTAState, } from '../types/CTAState';
import type { DeepUpdateActionRecord, } from '../types/DeepUpdateActionRecord';
import type { DeepUpdateInitialActionRecord, } from '../types/DeepUpdateInitialActionRecord';
import type { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import { Immutable, } from '../types/Immutable';
import type { GetArrayValue, } from '../types/GetArrayValue';
import type { GetCTAStateValue, } from '../types/GetCTAStateValue';
import type { NestedKeyArray, } from '../types/NestedKeyArray';
import type { NestedKeys, } from '../types/NestedKeys';
import type { NestedPartial, } from '../types/NestedPartial';
import createObjectFromArrayPath from './createObjectFromArrayPath';
import createObjectFromPath from './createObjectFromPath';
import deepAssign from './deepAssign';

export class ActionType<
	Payload extends CTAState,
	Type extends keyof DefaultActionsRecord<Payload>,
> {
	readonly type: ActionTypeConstructParam<Payload, Type>['type'];
	protected _payload: ActionTypeConstructParam<Payload, Type>['payload'];
	readonly actionTypeOptions: ActionTypeOptions;

	constructor( param: ActionTypeConstructParam<Payload, Type>, ) {
		this.type = param.type;
		this._payload = param.payload;
		this.actionTypeOptions = param.hasAugmentedAction
			? { ...param?.actionTypeOptions, }
			: { useDefault: true, };
	}

	get payload() {
		return this._payload as Immutable<typeof this._payload>;
	}
}

function _hasAugmentedAction<Actions,>( actions: Actions, type: keyof DefaultActionsRecord<Record<string, never>>, ) {
	return Boolean( actions && typeof actions === 'object' && type in actions, );
}

function getPayload<
	Payload extends CTAState,
	Type extends keyof DefaultActionsRecord<Payload>,
>( payload: unknown, value: unknown, ) {
	if ( Array.isArray( payload, ) ) {
		return createObjectFromArrayPath(
			payload,
			value,
		) as ActionTypeConstructParam<
			Payload,
			Type
		>['payload'];
	}

	if ( typeof payload === 'number' ) {
		return {
			[ payload ]: value,
		} as ActionTypeConstructParam<
			Payload,
			Type
		>['payload'];
	}

	if ( typeof payload === 'string' ) {
		return createObjectFromPath(
			payload,
			value,
		) as ActionTypeConstructParam<
			Payload,
			Type
		>['payload'];
	}

	return payload as ActionTypeConstructParam<
		Payload,
		Type
	>['payload'];
}

class DeepActionType<
	Payload extends CTAState,
	Type extends Extract<keyof DefaultActionsRecord<Payload>, 'deepUpdate' | 'deepUpdateInitial'>,
> extends ActionType<Payload, Type> {
	constructor( param: Pick<
		ActionTypeConstructParam<
			Payload,
			Type
		>,
		'actionTypeOptions' | 'payload' | 'hasAugmentedAction' | 'type'
	>, ) {
		super( {
			...param,
		}, );
	}

	merge<P extends ActionTypeConstructParam<
		Payload,
		Type
	>['payload'], >(
		payload: P,
		_?: never
	): this;

	merge<K extends NestedKeys<Payload>, >(
		key: K,
		value: GetCTAStateValue<Payload, K>,
	): this;

	merge<K extends NestedKeyArray<Payload>,>(
		key: K,
		value: GetArrayValue<Payload, K> extends Record<
			string | number | symbol,
			unknown
		> ? NestedPartial<GetArrayValue<Payload, K>>
			: GetArrayValue<Payload, K>,
	): this;

	merge( payload: unknown, value: unknown, ) {
		const p = getPayload<Payload, Type>( payload, value, );

		deepAssign(
			this._payload,
			p,
		);

		return this;
	}
}

export class DeepUpdateActionType<
	Payload extends CTAState,
> extends DeepActionType<Payload, 'deepUpdate'> {
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
		const params = {
			actionTypeOptions: options as ActionTypeOptions,
			hasAugmentedAction,
			payload: getPayload<Payload, 'deepUpdate'>( payload, value, ),
		};

		return new DeepUpdateActionType( params, );
	};

	return deepUpdateActionType;
}

export class DeepUpdateInitialActionType<
	Payload extends CTAState,
> extends DeepActionType<Payload, 'deepUpdateInitial'> {
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
		const params = {
			actionTypeOptions: options as ActionTypeOptions,
			hasAugmentedAction,
			payload: getPayload<Payload, 'deepUpdateInitial'>( payload, value, ),
		};

		return new DeepUpdateInitialActionType( params, );
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
