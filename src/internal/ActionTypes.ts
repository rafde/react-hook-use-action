import { CTAInitial, } from '../types/CTAInitial';

type PredefinedActions = 'replace' | 'replaceInitial' | 'reset' | 'update';

export type ActionTypeConstructParam<Initial extends CTAInitial,> = {
	type: PredefinedActions
	nextState?: Initial | Partial<Initial>
	options?: { useDefault: boolean }
};

export class ActionType<Initial extends CTAInitial,> {
	readonly type: ActionTypeConstructParam<Initial>['type'];
	readonly nextState: Readonly<ActionTypeConstructParam<Initial>['nextState']>;
	readonly options: Readonly<Exclude<ActionTypeConstructParam<Initial>['options'], undefined>>;

	constructor( param: ActionTypeConstructParam<Initial>, ) {
		this.type = param.type;
		this.nextState = param.nextState;
		this.options = {
			useDefault: false,
			...param?.options,
		};
	}
}

export class ReplaceActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState: Initial, options?: ActionTypeConstructParam<Initial>['options'], ) {
		return new ReplaceActionType( {
			nextState,
			options,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'options'> & { nextState: Initial }, ) {
		super( {
			...param,
			type: 'replace',
		}, );
	}
}

export class ReplaceInitialActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState: Initial, options?: ActionTypeConstructParam<Initial>['options'], ) {
		return new ReplaceInitialActionType( {
			nextState,
			options,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'options'> & { nextState: Initial }, ) {
		super( {
			...param,
			type: 'replaceInitial',
		}, );
	}
}

export class ResetActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState?: Initial, options?: ActionTypeConstructParam<Initial>['options'], ) {
		return new ResetActionType( {
			nextState,
			options,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'options'> & { nextState?: Initial }, ) {
		super( {
			...param,
			type: 'reset',
		}, );
	}
}

export class UpdateActionType<Initial extends CTAInitial,> extends ActionType<Initial> {
	static create<Initial extends CTAInitial,>( nextState: Partial<Initial>, options?: ActionTypeConstructParam<Initial>['options'], ) {
		return new UpdateActionType( {
			nextState,
			options,
		}, );
	}

	constructor( param: Pick<ActionTypeConstructParam<Initial>, 'options'> & { nextState: Partial<Initial> }, ) {
		super( {
			...param,
			type: 'update',
		}, );
	}
}
