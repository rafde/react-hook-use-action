import { CTAInitial, } from '../types/CTAInitial';
import { OptionsParams, } from '../types/OptionsParams';

type PredefinedActions = 'replace' | 'replaceInitial' | 'reset' | 'update';

export type ActionTypeConstructParam<Initial extends CTAInitial,> = {
	type: PredefinedActions
	nextState?: Initial | Partial<Initial>
	actionTypeOptions?: {
		useDefault?: boolean
		options?: OptionsParams
	}
};

export class ActionType<Initial extends CTAInitial,> {
	readonly type: ActionTypeConstructParam<Initial>['type'];
	readonly nextState: Readonly<ActionTypeConstructParam<Initial>['nextState']>;
	readonly actionTypeOptions: Readonly<Exclude<ActionTypeConstructParam<Initial>['actionTypeOptions'], undefined>>;

	constructor( param: ActionTypeConstructParam<Initial>, ) {
		this.type = param.type;
		this.nextState = param.nextState;
		this.actionTypeOptions = {
			useDefault: false,
			...param?.actionTypeOptions,
		};
	}
}

export class ReplaceActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState: Initial, actionTypeOptions?: ActionTypeConstructParam<Initial>['actionTypeOptions'], ) {
		return new ReplaceActionType( {
			nextState,
			actionTypeOptions,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'actionTypeOptions'> & { nextState: Initial }, ) {
		super( {
			...param,
			type: 'replace',
		}, );
	}
}

export class ReplaceInitialActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState: Initial, actionTypeOptions?: ActionTypeConstructParam<Initial>['actionTypeOptions'], ) {
		return new ReplaceInitialActionType( {
			nextState,
			actionTypeOptions,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'actionTypeOptions'> & { nextState: Initial }, ) {
		super( {
			...param,
			type: 'replaceInitial',
		}, );
	}
}

export class ResetActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState?: Initial, actionTypeOptions?: ActionTypeConstructParam<Initial>['actionTypeOptions'], ) {
		return new ResetActionType( {
			nextState,
			actionTypeOptions,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'actionTypeOptions'> & { nextState?: Initial }, ) {
		super( {
			...param,
			type: 'reset',
		}, );
	}
}

export class UpdateActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState: Partial<Initial>, actionTypeOptions?: ActionTypeConstructParam<Initial>['actionTypeOptions'], ) {
		return new UpdateActionType( {
			nextState,
			actionTypeOptions,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'actionTypeOptions'> & { nextState: Partial<Initial> }, ) {
		super( {
			...param,
			type: 'update',
		}, );
	}
}
