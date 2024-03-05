import type { CTAParam, } from './CTAParam';

import type {
	DispatchCTA,
	CustomCTAWithOptionalPayloadProps,
	CustomCTAWithoutPayloadProps,
	CustomCTAWithPayloadProps,
	DispatchCustomCTAWithOptionalPayload,
	DispatchCustomCTAWithoutPayload,
	DispatchCustomCTAWithPayload,
	UseCTAReturnTypeDispatchCTA,
	UseCTAReturnTypeDispatch,
	CustomCTAWithoutPayloadRecord,
	CustomCTAWithOptionalPayloadRecord,
	CustomCTAWithPayloadRecord,
} from './UseCTAReturnTypeDispatch';

type TestInitial = {
	d: number,
	s: string
};

const emptyAction = {} as const;
const actionUpdate = {
	update( ctaParam: CTAParam<TestInitial>, payload: Partial<TestInitial>, ) {
		return payload;
	},
} as const;
const customCTAWithoutPayload = {
	customCTAWithoutPayload( ctaParam: CTAParam<TestInitial>, ) {
		return {
			d: ctaParam.previous.d + 1,
		};
	},
} as const;

const customCTAWithOptionalPayload = {
	customCTAWithOptionalPayload( ctaParam: CTAParam<TestInitial>, payload?: number, ) {
		return {
			d: typeof payload !== 'number' ? ctaParam.previous.d : payload,
		};
	},
} as const;

const customCTAWithPayload = {
	customCTAWithPayload( ctaParam: CTAParam<TestInitial>, payload: string, ) {
		return {
			s: payload,
		};
	},
} as const;

const Update_WithoutPayload = {
	...customCTAWithoutPayload,
	...actionUpdate,
};

const _WithoutPayload_WithOptionalPayload_WithPayload = {
	...customCTAWithoutPayload,
	...customCTAWithOptionalPayload,
};

// -------------------------------------- CustomCTAWithoutPayloadRecord

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithoutPayload_WithoutPayload = CustomCTAWithoutPayloadRecord<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithoutPayload_WithOptionalPayload = CustomCTAWithoutPayloadRecord<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithoutPayload_WithPayload = CustomCTAWithoutPayloadRecord<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithoutPayload_Empty = CustomCTAWithoutPayloadRecord<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithoutPayload_Update = CustomCTAWithoutPayloadRecord<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithoutPayload_undefined = CustomCTAWithoutPayloadRecord<TestInitial>

// -------------------------------------- CustomCTAWithoutPayloadProps

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithoutPayload_WithoutPayload = CustomCTAWithoutPayloadProps<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithoutPayload_WithOptionalPayload = CustomCTAWithoutPayloadProps<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithoutPayload_WithPayload = CustomCTAWithoutPayloadProps<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithoutPayload_Empty = CustomCTAWithoutPayloadProps<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithoutPayload_Update = CustomCTAWithoutPayloadProps<TestInitial, typeof actionUpdate>

// -------------------------------------- CustomCTAWithOptionalPayloadRecord

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithOptionalPayload_WithoutPayload = CustomCTAWithOptionalPayloadRecord<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithOptionalPayload_WithOptionalPayload = CustomCTAWithOptionalPayloadRecord<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithOptionalPayload_WithPayload = CustomCTAWithOptionalPayloadRecord<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithOptionalPayload_Empty = CustomCTAWithOptionalPayloadRecord<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithOptionalPayload_Update = CustomCTAWithOptionalPayloadRecord<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithOptionalPayload_undefined = CustomCTAWithOptionalPayloadRecord<TestInitial>

// -------------------------------------- CustomCTAWithOptionalPayloadProps

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithOptionalPayload_WithoutPayload = CustomCTAWithOptionalPayloadProps<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithOptionalPayload_WithOptionalPayload = CustomCTAWithOptionalPayloadProps<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithOptionalPayload_WithPayload = CustomCTAWithOptionalPayloadProps<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithOptionalPayload_Empty = CustomCTAWithOptionalPayloadProps<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithOptionalPayload_Update = CustomCTAWithOptionalPayloadProps<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithOptionalPayload_undefined = CustomCTAWithOptionalPayloadProps<TestInitial>

// -------------------------------------- CustomCTAWithPayloadRecord

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithPayload_WithoutPayload = CustomCTAWithPayloadRecord<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithPayload_WithOptionalPayload = CustomCTAWithPayloadRecord<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithPayload_WithPayload = CustomCTAWithPayloadRecord<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithPayload_Empty = CustomCTAWithPayloadRecord<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithPayload_Update = CustomCTAWithPayloadRecord<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAWithPayload_undefined = CustomCTAWithPayloadRecord<TestInitial>

// -------------------------------------- CustomCTAWithPayloadProps

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithPayload_WithoutPayload = CustomCTAWithPayloadProps<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithPayload_WithOptionalPayload = CustomCTAWithPayloadProps<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithPayload_WithPayload = CustomCTAWithPayloadProps<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithPayload_Empty = CustomCTAWithPayloadProps<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithPayload_Update = CustomCTAWithPayloadProps<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTAPropsWithPayload_undefined = CustomCTAWithPayloadProps<TestInitial>

// -------------------------------------- DispatchCustomCTAWithoutPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTADispatchWithoutPayload_WithoutPayload = DispatchCustomCTAWithoutPayload<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTADispatchWithoutPayload_WithOptionalPayload = DispatchCustomCTAWithoutPayload<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTADispatchWithoutPayload_WithPayload = DispatchCustomCTAWithoutPayload<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTADispatchWithoutPayload_Empty = DispatchCustomCTAWithoutPayload<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTADispatchWithoutPayload_Update = DispatchCustomCTAWithoutPayload<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CustomCTADispatchWithoutPayload_undefined = DispatchCustomCTAWithoutPayload<TestInitial>

// -------------------------------------- DispatchCustomCTAWithOptionalPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAOWithOptionalPayload_WithoutPayload = DispatchCustomCTAWithOptionalPayload<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAOWithOptionalPayload_WithOptionalPayload = DispatchCustomCTAWithOptionalPayload<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAOWithOptionalPayload_WithPayload = DispatchCustomCTAWithOptionalPayload<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAOWithOptionalPayload_Empty = DispatchCustomCTAWithOptionalPayload<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAOWithOptionalPayload_Update = DispatchCustomCTAWithOptionalPayload<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAOWithOptionalPayload_undefined = DispatchCustomCTAWithOptionalPayload<TestInitial>

// -------------------------------------- DispatchCustomCTAWithPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAWithPayload_WithoutPayload = DispatchCustomCTAWithPayload<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAWithPayload_WithOptionalPayload = DispatchCustomCTAWithPayload<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAWithPayload_WithPayload = DispatchCustomCTAWithPayload<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAWithPayload_Empty = DispatchCustomCTAWithPayload<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAWithPayload_Update = DispatchCustomCTAWithPayload<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DispatchCustomCTAWithPayload_undefined = DispatchCustomCTAWithPayload<TestInitial>

// -------------------------------------- UseCTAReturnTypeDispatchCTA

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatchCTA_WithoutPayload = UseCTAReturnTypeDispatchCTA<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatchCTA_WithOptionalPayload = UseCTAReturnTypeDispatchCTA<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatchCTA_WithPayload = UseCTAReturnTypeDispatchCTA<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatchCTA_Empty = UseCTAReturnTypeDispatchCTA<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatchCTA_Update = UseCTAReturnTypeDispatchCTA<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatchCTA_undefined = UseCTAReturnTypeDispatchCTA<TestInitial>

// -------------------------------------- DispatchCTA

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_WithoutPayload = DispatchCTA<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_WithOptionalPayload = DispatchCTA<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_WithPayload = DispatchCTA<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_Empty = DispatchCTA<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_Update = DispatchCTA<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_undefined = DispatchCTA<TestInitial>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_Update_WithoutPayload = DispatchCTA<TestInitial, typeof Update_WithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CTADispatch_Update_WithoutPayload_WithPayload = DispatchCTA<TestInitial, typeof _WithoutPayload_WithOptionalPayload_WithPayload>

// -------------------------------------- UseCTAReturnTypeDispatch

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_WithoutPayload = UseCTAReturnTypeDispatch<TestInitial, typeof customCTAWithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_WithOptionalPayload = UseCTAReturnTypeDispatch<TestInitial, typeof customCTAWithOptionalPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_WithPayload = UseCTAReturnTypeDispatch<TestInitial, typeof customCTAWithPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_Empty = UseCTAReturnTypeDispatch<TestInitial, typeof emptyAction>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_Update = UseCTAReturnTypeDispatch<TestInitial, typeof actionUpdate>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_undefined = UseCTAReturnTypeDispatch<TestInitial>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_Update_WithoutPayload = UseCTAReturnTypeDispatch<TestInitial, typeof Update_WithoutPayload>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseCTAReturnTypeDispatch_WithoutPayload_WithOptionalPayload_WithPayload = UseCTAReturnTypeDispatch<TestInitial, typeof _WithoutPayload_WithOptionalPayload_WithPayload>
