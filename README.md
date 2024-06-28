# react-hook-use-cta: useCTA (use Call To Action)

A somewhat flexible react hook alternative to `React.useReducer`. Written in Typescript.

# Table of Contents

- [Installation](#installation)
  - [NPM](#npm)
- [useCTA](#usecta)
  - [Parameter](#parameter)
    - [initial](#initial)
    - [onInit](#oninit)
    - [actions](#actions)
  - [Return](#Return)
    - [Current State](#current-state)
    - [Dispatcher](#dispatcher)
      - [cta](#cta)
      - [state](#state)
        - [state.initial](#stateinitial)
        - [state.current](#statecurrent)
        - [state.previous](#stateprevious)
        - [state.changes](#statechanges)
      - [Dispatcher Parameter](#dispatcher-parameter)
        - [type](#type)
        - [payload](#payload)
        - [options](#options)
  - [Call to Actions](#call-to-actions)
    - [update](#update)
      - [How to update a single property](#how-to-update-a-single-property)
      - [How to update multiple properties](#how-to-update-multiple-properties)
      - [How to augment update](#how-to-augment-update)
    - [replace](#replace)
      - [How to replace the entire state](#how-to-replace-the-entire-state)
      - [How to augment replace](#how-to-augment-replace)
    - [replaceInitial](#replaceinitial)
      - [How to call replaceInitial](#how-to-call-replaceinitial)
      - [How to augment replaceInitial](#how-to-augment-replaceinitial)
    - [reset](#reset)
      - [How to call reset without a payload to replace current state with initial state](#how-to-call-reset-without-a-payload-to-replace-current-state-with-initial-state)
      - [How to call reset with payload](#how-to-call-reset-with-payload)
      - [How to augment reset](#how-to-augment-reset)
  - [Custom Actions](#custom-actions)
    - [How to define and call custom action as update behavior](#how-to-define-and-call-custom-action-as-update-behavior)
    - [How to define and call custom action as replace behavior](#how-to-define-and-call-custom-action-as-replace-behavior)
    - [How to define and call custom action as replaceInitial behavior](#how-to-define-and-call-custom-action-as-replaceinitial-behavior)
    - [How to define and call custom action as reset behavior](#how-to-define-and-call-custom-action-as-reset-behavior)
- [createCTAContext](#createctacontext)
  - [CTAProvider](#ctaprovider)
  - [useCTAStateContext](#usectastatecontext)
  - [useCTAStateContext](#usectadispatchcontext)
  

<details>

<summary>Table of Contents: <strong>Typescript helper and exports</strong></summary>

- [returnActionsType](#returnactionstype)
- [Typescript exports](#typescript-exports)
	- [CTAInitial](#export-type--ctainitial-)
	- [UseCTAParameter](#export-type--usectaparameter-)
	- [UseCTAReturnType](#export-type--usectareturntype-)
	- [UseCTAReturnTypeDispatch](#export-type--usectareturntypedispatch-)
	- [CTAPayloadCallbackParameter](#export-type--ctapayloadcallbackparameter-)
	- [CustomCTAStateParam](#export-type--customctastateparam-)
	- [CTAStateParam](#export-type--ctastateparam-)

</details>

---

# Installation

```
react-hook-use-cta
```

## NPM

```bash
npm i react-hook-use-cta
```

---

# useCTA

[Playground](https://codesandbox.io/p/sandbox/react-hook-use-cta-7jnc32?file=%2Fsrc%2FApp.tsx%3A17%2C34)

<details open>

<summary>Basic example code</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			search: 'initial',
			isFuzzy: false, 
			count: 0,
		}
	});

	useEffect(
		() => dispatch.cta.update('search', 'update search'),
		[]
	);

	/* Renders `update search` */
	return state.search;
}
```

</details>

<details>

<summary>Advance example code</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, CustomCTAStateParam, CTAStateParam, } from 'react-hook-use-cta'

type ViewPropsInitial = { 
	search: string
	isFuzzy: boolean
	count: number
};

function View(props: { initial: ViewPropsInitial }) {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: props.initial,
		onInit(initial) {
			return {
				...initial,
				search: 'onInit',
			}
		},
		actions: {
			// START: augment predefined actions
			replace(ctaStateParam: CTAStateParam<ViewPropsInitial>, payload) {
				return payload;
			},
			replaceInitial(ctaStateParam: CTAStateParam<ViewPropsInitial>, payload) {
				return payload;
			},
			reset(ctaStateParam: CTAStateParam<ViewPropsInitial>, payload) {
				return payload;
			},
			update(ctaStateParam: CTAStateParam<ViewPropsInitial>, payload) {
				return payload;
			},
			// END: augment predefined actions

			// START: Custom actions
			toggleIsFuzzy(customCTAStateParam: CustomCTAStateParam<ViewPropsInitial>, isFuzzy?: boolean) {
				if (typeof isFuzzy === 'undefined') {
					return {
						isFuzzy: !ctaParam.previous.isFuzzy,
					}
				}

				return {
					isFuzzy
				}
			},
			addToCount(customCTAStateParam: CustomCTAStateParam<ViewPropsInitial>, value: number) {
				return {
					count: ctaParam.previous.count + value,
				}
			},
			incrementCount(customCTAStateParam: CustomCTAStateParam<ViewPropsInitial>) {
				return {
					count: ctaParam.previous.count + 1,
				}
			},
			// END: Custom actions
		}
	});

	useEffect(
		() => dispatch.cta.update('search', 'update'),
		[]
	);

	return <>
		<div>{state.search}</div>
		<div>{dispatch.state.initial.search}</div>
		<div>{dispatch.state.changes?.search}</div>
		<div>{dispatch.state.previous.search}</div>
	</>;
}
```

</details>

---

## Parameter

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/UseCTAParameter.ts#L12-L19

> [!NOTE]
> [useCTA](#usecta) accepts an `object`, that is read once, with the following properties:

### `initial`

> [!IMPORTANT]
> A **required** `object` representing the initial state.
> Property values can be anything that [strictDeepEqual](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal)
> from [fast-equals](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#fast-equals) supports.

Typescript:
- [CTAInitial](#export-type--ctainitial-)

### `onInit`

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/UseCTAParameter.ts#L18

> [!NOTE]
> An _optional_ callback for setting [initial](#initial) `object` on first render. It accepts the [initial](#initial)
> state `object` and returns a new [initial](#initial) state `object`.

<details>

<summary>onInit example code</summary>

```tsx
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
	] = useCTA({
		initial: {
			search: '',
		},
		onInit(initial) {
			return {
				...initial,
				search: 'onInit',
			}
		}
	});
	
	// renders `onInit`
	return state.search;
}
```

</details>

### `actions`

> [!NOTE]
> An _optional_ `object` for augmenting [call to actions](#call-to-actions)
> or to create your own [custom call to actions](#custom-actions)

---

## Return

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/UseCTAReturnType.ts#L7-L13

> [!NOTE]
> An `array` with 2 values:

### Current State

> [!NOTE]
> A read-only `object` that is set by [initial](#initial) or result of [onInit](#oninit) on first render. 
> It is changed by most [call to actions](#call-to-actions)

### Dispatcher

> [!NOTE]
> A `function` used to make changes to the current state and trigger re-render. It also includes two properties:

#### `cta`

> [!NOTE]
> A read-only `object` for accessing [calls to actions](#call-to-actions) to trigger state change.
> By default, it includes the following [calls to actions](#call-to-actions)
> https://github.com/rafde/react-hook-use-cta/blob/5ea1a69edc0a38e2aa4b870c08a95157628d914e/src/types/UseCTAReturnTypeDispatch.ts#L260-L292
> `type CTAPayloadCallbackParameter` has the following properties:
> https://github.com/rafde/react-hook-use-cta/blob/68163de2b6f2dd1153c4dd703a45daba3dd9a495/src/types/CustomCTAStateParam.ts#L12-L15

#### `state`

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/CustomCTAStateParam.ts#L12-L15

> [!NOTE]
> A read-only `object` that can be used to reference additional states:
> You have access to the following states

##### `state.initial`

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/CustomCTAStateParam.ts#L12

> [!NOTE]
> Starts of equal to [initial](#initial) parameter or result of [onInit](#oninit) on first render

<details>

<summary>
The following call to actions can affect it:
</summary>

- [replaceInitial](#replaceinitial)
- [reset](#reset)
- [custom replaceInitial action](#how-to-define-and-call-custom-action-as-replaceinitial-behavior)
- [custom reset action](#how-to-define-and-call-custom-action-as-reset-behavior)

</details>

##### `state.current`

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/CustomCTAStateParam.ts#L13

> [!NOTE]
> Equivalent to [current state](#current-state).

<details>

<summary>
The following call to actions can affect it:
</summary>

- [update](#update)
- [replace](#replace)
- [reset](#reset)
- [custom update action](#how-to-define-and-call-custom-action-as-update-behavior)
- [custom replace action](#how-to-define-and-call-custom-action-as-replace-behavior)
- [custom reset action](#how-to-define-and-call-custom-action-as-reset-behavior)

</details>

##### `state.previous`

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/CustomCTAStateParam.ts#L14

> [!NOTE]
> Starts of equal to [initial](#initial) parameter or result of [onInit](#oninit) on first render.
> Is set to the previous [current state](#current-state) if it changes.

<details> 

<summary>
The following call to actions can affect it:
</summary>

- [update](#update)
- [replace](#replace)
- [replaceInitial](#replaceinitial)
- [reset](#reset)
- [custom update action](#how-to-define-and-call-custom-action-as-update-behavior)
- [custom replace action](#how-to-define-and-call-custom-action-as-replace-behavior)
- [custom replaceInitial action](#how-to-define-and-call-custom-action-as-replaceinitial-behavior)
- [custom reset action](#how-to-define-and-call-custom-action-as-reset-behavior)

</details>

##### `state.changes`

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/CustomCTAStateParam.ts#L15

> [!NOTE]
> Starts of equal to `null`. 
> When the property values of [state.initial](#stateinitial) are equal to the [current state](#current-state), the value is `null`. 
> Otherwise, it's equal to the difference in property values of [state.initial](#stateinitial) and [current state](#current-state).

<details> 

<summary>
The following call to actions can affect it:
</summary>

- [update](#update)
- [replace](#replace)
- [replaceInitial](#replaceinitial)
- [reset](#reset)
- [custom update action](#how-to-define-and-call-custom-action-as-update-behavior)
- [custom replace action](#how-to-define-and-call-custom-action-as-replace-behavior)
- [custom replaceInitial action](#how-to-define-and-call-custom-action-as-replaceinitial-behavior)
- [custom reset action](#how-to-define-and-call-custom-action-as-reset-behavior)

</details>

#### Dispatcher Parameter

Dispatcher `function` also accepts a parameter object with properties:

##### `type`

> [!IMPORTANT]
> **Required** `string`. The value is a [call to action](#call-to-actions) or [custom action](#custom-actions) name.

##### `payload`

> [!WARNING]
> A parameter that a [call to action](#call-to-actions) can read.
> It's value depends on what it's corresponding [call to action](#call-to-actions) can accept.

##### `options`

https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/CustomCTAStateParam.ts#L16

> [!NOTE]
> _Optional_ key/value `object` that an augmented [call to action](#call-to-actions) or [custom action](#custom-actions) may read.

---

# Call to Actions

> [!NOTE]
> ***Call to actions*** can be made through [cta](#cta) or [dispatcher](#dispatcher)
> and augmented through [actions](#actions) parameter.
> There are ***call to actions*** available for immediate use.

> [!IMPORTANT] 
> When augmenting an existing ***call to action***, the first parameter signature is [CTAStateParam](#export-type--ctastateparam-)
> with the following properties:
> https://github.com/rafde/react-hook-use-cta/blob/193f711b632be93aaa693751e9bd7ed50ba098e6/src/types/CustomCTAStateParam.ts#L12-L16
> The second parameter depends on what the corresponding ***call to action*** expects.

> [!IMPORTANT]
> When using a callback as a `payload`, the first parameter signature is [CTAPayloadCallbackParameter](#export-type--ctapayloadcallbackparameter-)
> with the following properties:
> https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/CustomCTAStateParam.ts#L12-L15
> `return;` or `return undefined` results in the ***call to action*** not triggering re-render.
> Otherwise, the returning value depends on what the corresponding ***call to action*** expects.

## `update`

> [!NOTE]
> Used to partially `update` the [current state](#current-state) with a `payload`. 
> Affects the following [states](#state):

| state                      | new state                                                                                       |
|----------------------------|-------------------------------------------------------------------------------------------------|
| [current](#statecurrent)   | `payload` merged with old [current](#statecurrent)                                              |
| [initial](#stateinitial)   | no change                                                                                       |
| [previous](#stateprevious) | old [current](#statecurrent)                                                                    |
| [changes](#statechanges)   | difference between [initial](#stateinitial) and new [current](#statecurrent) or `null` if equal |


### How to `update` a single property

https://github.com/rafde/react-hook-use-cta/blob/6e82c86f58e637df321b27f116b68d8c514990ec/src/types/UseCTAReturnTypeDispatch.ts#L234-L238

<details open>

<summary>
<code>update</code> a single property example code
</summary>

```ts
dispatch.cta.update('search', 'update without option');
```

</details>

<details>

<summary>
<code>update</code> a single property with an option example code
</summary>

```ts
dispatch.cta.update('search', 'update with option', {hasOption: true});
```

</details>

### How to `update` multiple properties

https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L282-L287

<details open>

<summary>
<code>update</code> multiple properties example code
</summary>

```ts
dispatch.cta.update({
	search: 'dispatch.cta.update',
	isFuzzy: true, 
});
```

</details>

<details>

<summary>
<code>update</code> multiple properties with an option example code
</summary>

```ts
dispatch.cta.update(
	{
		search: 'dispatch.cta.update with options',
		isFuzzy: true,
	},
	{
		updateWithOption: true,
	}
);
```

</details>

<details open>

<summary>
<code>update</code> multiple properties using a callback example code
</summary>

```ts
dispatch.cta.update(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	(ctaPayloadCallbackParameter) => {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// This is a way to prevent an update from triggering.
			return;
		}
		
		return {
			search: 'dispatch.cta.update with callback',
			count: ctaPayloadCallbackParameter.current.count + 1,
		}
	}
);
```

</details>

<details>

<summary>
<code>update</code> multiple properties with an option using a callback example code
</summary>

```ts
dispatch.cta.update(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	(ctaPayloadCallbackParameter) => {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// This is a way to prevent an update from triggering.
			return;
		}

		return {
			search: 'dispatch.cta.update with callback and options',
			count: ctaPayloadCallbackParameter.current.count + 1,
		}
	},
	{
		updateWithCallbackOption: true,
	}
);
```

</details>

<details>

<summary>
Using dispatcher function instead of <code>dispatch.cta.update</code>
</summary>

https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L48-L54

```ts
dispatch({
	type: 'update',
	payload: {
		search: 'dispatch update',
		isFuzzy: true,
	},
});

dispatch({
	type: 'update',
	payload: {
		search: 'dispatch update with options',
		isFuzzy: true,
	},
	options: {
		dispatchUpdateWithOption: true,
	}
});

dispatch({
	type: 'update',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	payload(ctaPayloadCallbackParameter) {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// This is a way to prevent an update from happening.
			return;
		}
	
		return {
			search: 'dispatch.cta.update with callback',
			count: ctaPayloadCallbackParameter.current.count + 1,
		}
	},
});


dispatch({
	type: 'update',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	payload: (ctaPayloadCallbackParameter) => ({
		search: 'dispatch update with callback and options',
		count: ctaPayloadCallbackParameter.current.count + 1,
	}),
	options: {
		dispatchUpdateWithCallbackAndOption: true,
	}
});
```

</details>

### How to augment `update`

https://github.com/rafde/react-hook-use-cta/blob/6e82c86f58e637df321b27f116b68d8c514990ec/src/types/UseCTAParameterActionsPredefinedRecord.ts#L8

<details open>

<summary>
augment <code>update</code> example code
</summary>

```tsx
import {useEffect} from 'react';
import {useCTA, CTAStateParam,} from 'react-hook-use-cta'

const initial = {
	search: 'initial',
	isFuzzy: false,
	count: 0,
}

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial,
		actions: {
			/**
			 * @param {CTAStateParam<typeof initial>} ctaStateParam
			 * @param {typeof initial} payload
			 * @returns {(Partial<typeof initial> | void)} returning `void` prevents action from triggering.
			 */
			update(ctaStateParam, payload,) {
				const {
					current,
					options,
				} = ctaStateParam;
				let {
					count,
				} = payload;
				
				if (!Number.isSafeInteger(count)) {
					// if `count` is not a safe integer, prevent update 
					return;
				}

				// set count to current.count if allowNegativeCount is falsey and count is less than 0
				if (count < 0 && !options?.allowNegativeCount) {
					count = current.count;
				}

				return {
					...payload,
					count
				};
			}
		}
	});

	useEffect(
		() => {
			dispatch.cta.update(
				'count',
				-1,
				{
					allowNegativeCount: true
				}
			);
		},
		[
			dispatch,
		]
	);
	
	// will render `-1`
	return state.count;
}
```

</details>

## `replace`

> [!NOTE]
> Used to `replace` [current state](#current-state) with a `payload`.
> Affects the following [states](#state): 

| state                      | new state                                                                                       |
|----------------------------|-------------------------------------------------------------------------------------------------|
| [current](#statecurrent)   | `payload`                                                                                       |
| [initial](#stateinitial)   | no change                                                                                       |
| [previous](#stateprevious) | old [current](#statecurrent)                                                                    |
| [changes](#statechanges)   | difference between [initial](#stateinitial) and new [current](#statecurrent) or `null` if equal |

### How to `replace` the entire state

https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L260-L265

<details open>

<summary>
<code>replace</code> entire state example code
</summary>

```ts
dispatch.cta.replace({
	search: 'dispatch.cta.replace',
	isFuzzy: true,
	count: 10,
});
```

</details>

<details>

<summary>
<code>replace</code> entire state with an option example code
</summary>

```ts
dispatch.cta.replace(
	{
		search: 'dispatch.cta.replace with options',
		isFuzzy: true,
		count: 10,
	},
	{
		isReplacingWithOption: true,
	}
);

```

</details>

<details open>

<summary>
<code>replace</code> entire state using a callback example code
</summary>

```ts

dispatch.cta.replace(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents triggering the action
	 */
	(ctaPayloadCallbackParameter) => {
		const count = ctaPayloadCallbackParameter.current.count;
		// This is a way to prevent replace from happening.
		if (count > 10) {
			return;
		}
		return {
			search: 'dispatch.cta.replace with callback',
			isFuzzy: true,
			count,
		}
	}
);
```

</details>

<details>

<summary>
<code>replace</code> entire state with an option using a callback example code
</summary>

```ts
dispatch.cta.replace(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents triggering the action
	 */
	(ctaPayloadCallbackParameter) => ({
		search: 'dispatch.cta.replace with callback and options',
		isFuzzy: true,
		count: ctaPayloadCallbackParameter.current.count + 1,
	}),
	{
		isCallbackReplacingWithOption: true,
	}
);
```

</details>

<details>

<summary>
Using dispatcher function instead of <code>dispatch.cta.replace</code>
</summary>


https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L20-L26

```ts
dispatch({
	type: 'replace',
	payload: {
		search: 'dispatch replace',
		isFuzzy: true,
		count: 10,
	}
});

dispatch({
	type: 'replace',
	payload: {
		search: 'dispatch replace with option',
		isFuzzy: true,
		count: 10,
	},
	options: {
		isReplacingWithOption: true,
	}
});

dispatch({
	type: 'replace',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	payload: (ctaPayloadCallbackParameter) => {
		const count = ctaPayloadCallbackParameter.current.count;
		
		if (count > 10) {
			// This is a way to prevent replace from triggering.
			return;
		}
		
		return {
			search: 'dispatch.cta.replace with callback',
			isFuzzy: true,
			count,
		}
	},
});

dispatch({
	type: 'replace',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	payload: (ctaPayloadCallbackParameter) => {
		const count = ctaPayloadCallbackParameter.current.count;

		if (count > 10) {
			// This is a way to prevent replace from triggering.
			return;
		}

		return {
			search: 'dispatch.cta.replace with callback with options',
			isFuzzy: true,
			count,
		}
	},
	options: {
		isCallbackReplacingWithOption: true,
	}
});
```

</details>

### How to augment `replace`

https://github.com/rafde/react-hook-use-cta/blob/6e82c86f58e637df321b27f116b68d8c514990ec/src/types/UseCTAParameterActionsPredefinedRecord.ts#L5

<details open>

<summary>augment <code>replace</code> example code</summary>

```tsx
import {useEffect} from 'react';
import {useCTA, CTAStateParam,} from 'react-hook-use-cta'

const initial = {
	search: 'initial',
	isFuzzy: false,
	count: 0,
}

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial,
		actions: {
			/**
			 * @param {CTAStateParam<typeof initial>} ctaStateParam
			 * @param {typeof initial} payload
			 * @return {(typeof initial | void)} returning `void` prevents action from triggering.
			 */
			replace(ctaStateParam, payload,) {
				const {
					current,
					options,
				} = ctaStateParam;
				let {
					count,
				} = payload;
				
				if (Number.isSafeInteger(count)) {
					// if count is not a safe integer, prevent triggering replace
					return;
				}
				
				// set count to current.count if allowNegativeCount is falsey and count is less than 0
				if (count < 0 && !options?.allowNegativeCount) {
					count = current.count;
				}

				return {
					...payload,
					count
				};
			}
		}
	});

	useEffect(
		() => {
			dispatch.cta.replace(
				{
					search: 'replace',
					isFuzzy: true,
					count: 10,
				},
				{
					allowNegativeCount: true,
				}
			);
		},
		[
			dispatch,
		]
	);
	
	// will render `-1`
	return state.count;
}
```

</details>

## `replaceInitial`

> [!NOTE]
> Set a new [initial](#stateinitial) state with a `payload`. The idea of this action is in case there
> is new source data that should be used to compare changes with [current state](#current-state)
> Affects the following [states](#state):

| state                      | new state                                                                                       |
|----------------------------|-------------------------------------------------------------------------------------------------|
| [current](#statecurrent)   | no change                                                                                       |
| [initial](#stateinitial)   | `payload`                                                                                       |
| [previous](#stateprevious) | no change                                                                                       |
| [changes](#statechanges)   | difference between new [initial](#stateinitial) and [current](#statecurrent) or `null` if equal |

### How to call `replaceInitial`

https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L266-L271

<details open>

<summary>
<code>replaceInitial</code> state example code
</summary>

```ts
dispatch.cta.replaceInitial({
	search: 'dispatch.cta.replaceInitial',
	isFuzzy: true,
	count: 10,
});
```

</details>

<details>

<summary>
<code>replaceInitial</code> state using an option example code
</summary>

```ts
dispatch.cta.replaceInitial(
	{
		search: 'dispatch.cta.replaceInitial with option',
		isFuzzy: true,
		count: 10,
	},
	{
		isReplaceInitialWithOption: true,
	}
);
```

</details>

<details open>

<summary>
<code>replaceInitial</code> state using a callback example code
</summary>

```ts
dispatch.cta.replaceInitial(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	(ctaPayloadCallbackParameter) => {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// This is a way to prevent replaceInitial from triggering.
			return;
		}
		
		return {
			search: 'dispatch.cta.replaceInitial with callback',
			isFuzzy: true,
			count: ctaPayloadCallbackParameter.current.count,
		}
	}
);
```

</details>

<details>

<summary>
<code>replaceInitial</code> state with option using a callback example code
</summary>

```ts
dispatch.cta.replaceInitial(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	(ctaPayloadCallbackParameter) => {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// This is a way to prevent replaceInitial from triggering.
			return;
		}

		return {
			search: 'dispatch.cta.replaceInitial with callback with options',
			isFuzzy: true,
			count: ctaPayloadCallbackParameter.current.count,
		}
	},
	{
		isReplaceInitialCallbackWithOption: true,
	}
);
```

</details>

<details>

<summary>
Using dispatcher function instead of <code>dispatch.cta.replaceInitial</code>
</summary>

https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L28-L34

```ts
dispatch({
	type: 'replaceInitial',
	payload: {
		search: 'dispatch replaceInitial',
		isFuzzy: true,
		count: 10,
	}
});

dispatch({
	type: 'replaceInitial',
	payload: {
		search: 'dispatch replaceInitial with options',
		isFuzzy: true,
		count: 10,
	},
	options: {
		isReplacingWithOption: true,
	}
});

dispatch({
	type: 'replaceInitial',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	payload(ctaPayloadCallbackParameter) {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// This is a way to prevent replaceInitial from triggering.
			return;
		}
	
		return {
			search: 'dispatch.cta.replaceInitial with callback',
			isFuzzy: true,
			count: ctaPayloadCallbackParameter.current.count,
		}
	},
});

dispatch({
	type: 'replaceInitial',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	payload: (ctaPayloadCallbackParameter) => ({
		search: 'dispatch replaceInitial with callback and options',
		isFuzzy: true,
		count: ctaPayloadCallbackParameter.current.count + 1,
	}),
	options: {
		isCallbackReplacingWithOption: true,
	}
});
```

</details>

### How to augment `replaceInitial`

https://github.com/rafde/react-hook-use-cta/blob/6e82c86f58e637df321b27f116b68d8c514990ec/src/types/UseCTAParameterActionsPredefinedRecord.ts#L6

<details open>

<summary>augment <code>replaceInitial</code> example code</summary>

```tsx
import {useEffect} from 'react';
import {useCTA, CTAStateParam,} from 'react-hook-use-cta'

const initial = {
	search: 'initial',
	isFuzzy: false,
	count: 0,
}

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial,
		actions: {
			/**
			 * @param {CTAStateParam<typeof initial>} ctaStateParam
			 * @param {typeof initial} payload
			 * @returns {(typeof initial | undefined)} returning `undefined` prevents action from triggering.
			 */
			replaceInitial(ctaStateParam, payload) {
				const {
					current,
					options,
				} = ctaStateParam;
				let {
					count,
				} = payload;

				if (Number.isSafeInteger(count)) {
					// prevent replaceInitial if count is not a safe integer
					return;
				}

				// set count to current.count if allowNegativeCount is falsey and count is less than 0
				if (count < 0 && !options?.allowNegativeCount) {
					count = current.count;
				}

				return {
					...payload,
					count
				};
			}
		}
	});

	useEffect(
		() => {
			dispatch.cta.replaceInitial(
				{
					search: 'replaceInitial',
					isFuzzy: true,
					count: 10,
				},
				{
					allowNegativeCount: true,
				}
			);
		},
		[
			dispatch,
		]
	);
	
	// will render `10`
	return dispatch.state.initial.count;
}
```

</details>

## `reset`

> [!NOTE]
> `reset` is a special action that has 2 behaviors:

### How to call `reset` without a `payload` to replace `current` state with `initial` state

https://github.com/rafde/react-hook-use-cta/blob/eee697a4487ed4a6cfe830ceb6057402fa0a7b07/src/types/UseCTAReturnTypeDispatch.ts#L265-L268

> [!NOTE]
> If no `payload` is sent, then the [current state](#current-state) will be replaced the [initial](#stateinitial) state.
> Affects the following [states](#state):

| state                      | new state                                                             |
|----------------------------|-----------------------------------------------------------------------|
| [current](#statecurrent)   | [initial](#stateinitial)                                              |
| [initial](#stateinitial)   | no change                                                             |
| [previous](#stateprevious) | old [current](#statecurrent)                                          |
| [changes](#statechanges)   | `null` since [initial](#stateinitial) equals [current](#statecurrent) |

<details open>

<summary><code>reset</code> state example code</summary>

```ts
// sets current state = to initial state
dispatch.cta.reset();
```

</details>

<details>

<summary>
<code>reset</code> state example code using an option
</summary>

```ts
// sets current state = to initial state
dispatch.cta.reset(
	undefined,
	{
		resetWithOption: true,
	}
);
```

</details>

<details>

<summary>
Using dispatcher function instead of <code>dispatch.cta.reset</code> without payload
</summary>

https://github.com/rafde/react-hook-use-cta/blob/6e82c86f58e637df321b27f116b68d8c514990ec/src/types/UseCTAReturnTypeDispatch.ts#L26-L32

```tsx
dispatch({
	type: 'reset'
});

dispatch({
	type: 'reset',
	options: {
		resetWithOption: true,
	}
});

```

</details>

### How to call `reset` with `payload`

https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L276-L281

> [!NOTE]
> If a `payload` is sent, then the [initial](#stateinitial) state and the [current state](#current-state) will be replaced with the `payload`.
> Affects the following [states](#state):

| state                      | new state                                                             |
|----------------------------|-----------------------------------------------------------------------|
| [current](#statecurrent)   | `payload`                                                             |
| [initial](#stateinitial)   | `payload`                                                             |
| [previous](#stateprevious) | old [current](#statecurrent)                                          |
| [changes](#statechanges)   | `null` since [initial](#stateinitial) equals [current](#statecurrent) |


<details open>

<summary>
<code>reset</code> state with payload example code
</summary>

```ts
// sets current state and initial state equal to payload
dispatch.cta.reset({
	search: 'dispatch.cta.reset',
	isFuzzy: true,
	count: 10,
});
```

</details>

<details>

<summary>
<code>reset</code> state with payload and option example code
</summary>

```ts
// sets current state and initial state equal to payload
dispatch.cta.reset(
	{
		search: 'dispatch.cta.reset with options',
		isFuzzy: true,
		count: 10,
	},
	{
		resetInitialWithOption: true,
	}
);
```

</details>

<details open>

<summary>
<code>reset</code> state with payload as callback example code
</summary>

```ts
// sets current state and initial state equal to payload
dispatch.cta.reset(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	(ctaPayloadCallbackParameter) => {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// prevent reset from triggering
			return;
		}
	
		// sets current state and initial state equal to payload
		return {
			search: 'dispatch.cta.reset with callback',
			isFuzzy: true,
			count: ctaPayloadCallbackParameter.current.count,
		}
	}
);
```

</details>

<details>

<summary>
<code>reset</code> state with payload as callback and option example code
</summary>

```ts
// sets current state and initial state equal to payload
dispatch.cta.reset(
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	(ctaPayloadCallbackParameter) => {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// prevent reset from triggering
			return;
		}
		
		return {
			search: 'dispatch.cta.reset with callback with options',
			isFuzzy: true,
			count: ctaPayloadCallbackParameter.current.count + 1,
		}
	},
	{
		resetCallbackWithOption: true,
	}
);
```

</details>

<details>

<summary>
Using dispatcher function instead of <code>dispatch.cta.reset</code> with payload
</summary>

https://github.com/rafde/react-hook-use-cta/blob/0e8d359cf0f8dec77cc3d6d28de2c46ab0cc4027/src/types/UseCTAReturnTypeDispatch.ts#L36-L46

```ts
dispatch({
	type: 'reset',
	payload: {
		search: 'dispatch reset',
		isFuzzy: true,
		count: 10,
	}
});

dispatch({
	type: 'reset',
	payload: {
		search: 'dispatch reset with option',
		isFuzzy: true,
		count: 10,
	},
	options: {
		resetInitialWithOption: true,
	}
});

dispatch({
	type: 'reset',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | undefined)} returning `undefined` prevents action from triggering.
	 */
	payload(ctaPayloadCallbackParameter) {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// prevent reset from triggering
			return;
		}

		// sets current state and initial state equal to payload
		return {
			search: 'dispatch.cta.reset with callback',
			isFuzzy: true,
			count: ctaPayloadCallbackParameter.current.count,
		}
	},
});

dispatch({
	type: 'reset',
	/**
	 * @param {CTAPayloadCallbackParameter<Initial>} ctaPayloadCallbackParameter
	 * @returns {(CTAInitial | void)} returning `undefined` prevents action from triggering.
	 */
	payload(ctaPayloadCallbackParameter) {
		if (ctaPayloadCallbackParameter.current.count > 10) {
			// prevent reset from triggering
			return;
		}

		return {
			search: 'dispatch.cta.reset with callback',
			isFuzzy: true,
			count: ctaPayloadCallbackParameter.current.count + 1,
		}
	},
	options: {
		resetCallbackWithOption: true,
	}
});
```

</details>

### How to augment `reset`

https://github.com/rafde/react-hook-use-cta/blob/6e82c86f58e637df321b27f116b68d8c514990ec/src/types/UseCTAParameterActionsPredefinedRecord.ts#L7

<details open>

<summary>augment <code>reset</code> example code</summary>

```ts
import {useEffect} from 'react';
import {useCTA, CTAStateParam,} from 'react-hook-use-cta'

const initial = {
	search: 'initial',
	isFuzzy: false,
	count: 0,
}

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial,
		actions: {
			/**
			 * @param {CTAStateParam<typeof initial>} ctaStateParam
			 * @param {typeof initial=} payload - optional
			 * @returns {(typeof initial | void)} returning `void` prevents action from triggering.
			 */
			reset(ctaStateParam, payload,) {
				const {
					current,
					options,
				} = ctaStateParam;
				
				if (!payload) {
					// this will set current = initial
					return ctaStateParam.initial;
				}
				
				let {
					count,
				} = payload;
				
				if (!Number.isSafeInteger(count)) {
					// prevent reset from triggering
					return;
				}
				
				// set count to current.count if allowNegativeCount is falsey and count is less than 0
				if (count < 0 && !options?.allowNegativeCount) {
					count = current.count;
				}

				return {
					...payload,
					count,
				};
			}
		}
	});

	useEffect(
		() => {
			dispatch.cta.reset(
				{
					search: 'replace',
					isFuzzy: true,
					count: -1,
				},
				{
					allowNegativeCount: true,
				}
			);
		},
		[
			dispatch,
		]
	);
	
	// will render `-1`
	return state.count;
}
```

</details>

## Custom Actions

https://github.com/rafde/react-hook-use-cta/blob/eee697a4487ed4a6cfe830ceb6057402fa0a7b07/src/types/UseCTAParameterActionsRecordProp.ts#L6-L14

> [!NOTE]
> When the available actions aren't enough, you can define your own specialized ***custom actions*** using action behaviors.

> [!IMPORTANT]
> All ***custom action*** callbacks receive a [CustomCTAStateParam](#export-type--customctastateparam-)
> as their first parameter with the following properties.
> https://github.com/rafde/react-hook-use-cta/blob/eee697a4487ed4a6cfe830ceb6057402fa0a7b07/src/types/CustomCTAStateParam.ts#L12-L20
> The second parameter depends on what you want sent as a `payload`

> [!WARNING]
> Augmented existing ***call to actions*** become the default behavior when using them in ***custom actions***.
> To use non-augmented behavior, provide `{useDefault: true}` option as the second parameter.
> https://github.com/rafde/react-hook-use-cta/blob/5ea1a69edc0a38e2aa4b870c08a95157628d914e/src/internal/ActionTypes.ts#L8

### How to define and call ***custom action*** as `update` behavior

> [!IMPORTANT]
> All ***custom actions*** behave as an [update](#update) when returning a `Partial<CTAInitial>`.

<details open>

<summary>
Defining custom <code>update</code> action
</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			count: 0,
		},
		actions: {
			addToCount(ctaParam, value: number) {
				return {
					count: ctaParam.previous.count + value,
				}
			},
			incrementCount(ctaParam) {
				return {
					count: ctaParam.current.count + 1,
				}
			},
		}
	});

	useEffect(
		() => {
			dispatch.cta.incrementCount();
			dispatch.cta.addToCount(3)
		},
		[]
	);

	// renders `4`
	return state.count;
}
```

</details>

<details>

<summary>
Defining custom <code>update</code> action using <code>updateAction</code> behavior
</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			count: 0,
			search: '',
		},
		actions: {
			update(ctaParam, payload) {
				const {
					count = ctaParam.current.count,
				} = payload;
				return {
					...payload,
					count: count + 1
				};
			},
			multiplyCount(ctaParam, value: number) {
				return ctaParam.updateAction(
					{
						count: ctaParam.current.count * value
					},
					{
						// don't update using augmented behavior.
						useDefault: true,
					}
				)
			},
		}
	});

	useEffect(
		() => {
			dispatch.cta.update('search', 'update');
			dispatch.cta.multiplyCount(7)
		},
		[]
	);

	// renders `7`
	return state.count;
}
```

</details>

### How to define and call ***custom action*** as `replace` behavior

<details open>

<summary>
Defining custom <code>replace</code> action using <code>replaceAction</code>
</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			count: 0,
			search: '',
			isFuzzy: false,
		},
		actions: {
			preset(ctaParam,) {
				return ctaParam.replaceAction(
					{
						count: !ctaParam.current.search ? 11 : ctaParam.current.count,
						search: 'preset',
						isFuzzy: true,
					}
				)
			},
		}
	});

	useEffect(
		() => {
			dispatch.cta.preset();
		},
		[]
	);

	return <>
		{/* renders `11` */}
		<div>{state.count}</div>
		{/* renders `preset` */}
		<div>{state.search}</div>
		{/* renders `true` */}
		<div>{state.isFuzzy}</div>
	</>;
}
```

</details>

### How to define and call ***custom action*** as `replaceInitial` behavior

<details open>

<summary>
Defining custom <code>replaceInitial</code> action using <code>replaceInitialAction</code>
</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			count: 0,
			search: '',
			isFuzzy: false,
		},
		actions: {
			sourceSync(ctaParam,) {
				return ctaParam.replaceInitialAction(
					{
						count: 13,
						search: 'sourceSync',
						isFuzzy: true,
					}
				)
			},
		}
	});

	useEffect(
		() => {
			dispatch.cta.sourceSync();
		},
		[]
	);

	return <>
		{/* renders `13` */}
		<div>{dispatch.state.initial.count}</div>
		{/* renders `sourceSync` */}
		<div>{dispatch.state.initial.search}</div>
		{/* renders `true` */}
		<div>{dispatch.state.initial.isFuzzy}</div>
		{/* renders `0` */}
		<div>{state.count}</div>
		{/* renders `` */}
		<div>{state.search}</div>
		{/* renders `false` */}
		<div>{state.isFuzzy}</div>
	</>;
}
```

</details>

### How to define and call ***custom action*** as `reset` behavior

<details open>

<summary>
Defining custom <code>reset</code> action using <code>resetAction</code>
</summary>

```tsx
import { useEffect, } from 'react';
import { useCTA, } from 'react-hook-use-cta'

function View() {
	const [
		state,
		dispatch,
	] = useCTA({
		initial: {
			count: 0,
			search: '',
			isFuzzy: false,
		},
		actions: {
			sync(ctaParam,) {
				return ctaParam.resetAction(
					{
						count: 13,
						search: 'sync',
						isFuzzy: true,
					}
				)
			},
		}
	});

	useEffect(
		() => {
			dispatch.cta.sync();
		},
		[]
	);

	return <>
		{/* renders `null` */}
		<div>{dispatch.state.changes}</div>
		{/* renders `13` */}
		<div>{dispatch.state.initial.count}</div>
		{/* renders `sync` */}
		<div>{dispatch.state.initial.search}</div>
		{/* renders `true` */}
		<div>{dispatch.state.initial.isFuzzy}</div>
		{/* renders `13` */}
		<div>{state.count}</div>
		{/* renders `sync` */}
		<div>{state.search}</div>
		{/* renders `true` */}
		<div>{state.isFuzzy}</div>
	</>;
}
```

</details>

---

# createCTAContext

[Playground](https://codesandbox.io/p/sandbox/react-hook-use-cta-context-krpz5k?file=%2Fsrc%2FglobalContext.ts%3A5%2C18)

> [!NOTE]
> Combines `useCTA` with React `createContext` and `useContext`.
> Accepts the same parameters as `useCTA`:
> https://github.com/rafde/react-hook-use-cta/blob/eee697a4487ed4a6cfe830ceb6057402fa0a7b07/src/types/UseCTAParameter.ts#L12-L19

<details open>

<summary>Create a file for exporting, example globalContext.ts</summary>

```tsx
import { createCTAContext, } from 'react-hook-use-cta'

export const GlobalContext = createCTAContext({
	initial: {
		search: 'initial',
		isFuzzy: false,
		count: 0,
	},
});
```

</details>

Returns an `object` the following key/value:

## CTAProvider

> [!NOTE]
> Provider to wrap the app or component for context.

<details open>

<summary>
	<code>CTAProvider</code> example code
</summary>

```tsx
import GlobalContext from './globalContext';
import { GlobalCountView, } from './GlobalCountView'
import { GlobalCountButton, } from './GlobalCountButton'

export function App() {
	return <GlobalContext.CTAProvider>
		<GlobalCountButton/>
		<GlobalCountView/>
	</GlobalContext.CTAProvider>;
}
```

</details>

## useCTAStateContext

> [!NOTE]
> Hook that returns the current state

<details open>

<summary>
<code>useCTAStateContext</code> example code
</summary>

```tsx
import { GlobalContext, } from './globalContext';

const {
	useCTAStateContext
} = GlobalContext;

export function GlobalCountView() {
	const globalState = useCTAStateContext();
	return <div>
		{globalState.count}
	</div>;
}
```

</details>

## useCTADispatchContext

> [!NOTE]
> Hook that returns cta dispatcher. Returns `null` if called outside [CTAProvider](#ctaprovider)

<details open>

<summary>
<code>useCTADispatchContext</code> example code
</summary>

```tsx
import { useCallback, } from 'react';
const {
	useCTADispatchContext
} = GlobalContext;

export function GlobalCountButton() {
	const globalDispatch = useCTADispatchContext();
	const onClick = useCallback(
		() => {
			globalDispatch.cta.update((state) => {
				return {
					count: state.current.count + 1,
				}
			})
		},
		[
			globalDispatch
		]
	)
	return <button {...{
		onClick,
	}}>
		Update count:
	</button>;
}
```

</details>

---

# returnActionsType

https://github.com/rafde/react-hook-use-cta/blob/5ea1a69edc0a38e2aa4b870c08a95157628d914e/src/index.ts#L36-L41

> [!NOTE]
> In case you need to define [actions](#actions) parameter from a variable, this function can help infer [actions](#actions) type

<details open>

<summary><code>returnActionsType</code> example code</summary>

```ts
import { returnActionsType, } from 'react-hook-use-cta';

const initial = {
	search: 'initial',
	isFuzzy: false,
	count: 0,
};
const actions = returnActionsType(
	initial,
	{
		setSearch(state, search: string) {
			return {
				search
			}
		}
	}
);

```

</details>

--- 

# Typescript `export`s

https://github.com/rafde/react-hook-use-cta/blob/5ea1a69edc0a38e2aa4b870c08a95157628d914e/src/index.ts#L45-L59

## `export type { CTAInitial, }`

https://github.com/rafde/react-hook-use-cta/blob/9e9206f1ff06e2de5adcde5d107d9d847e210063/src/types/CTAInitial.ts#L1

## `export type { UseCTAParameter, }`

https://github.com/rafde/react-hook-use-cta/blob/5ea1a69edc0a38e2aa4b870c08a95157628d914e/src/types/UseCTAParameter.ts#L12-L19

## `export type { UseCTAReturnType, }`

https://github.com/rafde/react-hook-use-cta/blob/65c3b53dd5d51812e3ffc111ba23c4bc84f614ee/src/types/UseCTAReturnType.ts#L4-L10

## `export type { UseCTAReturnTypeDispatch, }`

https://github.com/rafde/react-hook-use-cta/blob/65c3b53dd5d51812e3ffc111ba23c4bc84f614ee/src/types/UseCTAReturnTypeDispatch.ts#L261-L267

## `export type { CTAPayloadCallbackParameter, }`

https://github.com/rafde/react-hook-use-cta/blob/296c3136ac2d12940c48be06ea20ee80f748c5fa/src/types/UseCTAReturnTypeDispatch.ts#L13-L18

## `export type { CustomCTAStateParam, }`

https://github.com/rafde/react-hook-use-cta/blob/6e82c86f58e637df321b27f116b68d8c514990ec/src/types/CustomCTAStateParam.ts#L11-L21

## `export type { CTAStateParam, }`

https://github.com/rafde/react-hook-use-cta/blob/6c8def7fcd104b6ae0d25627eaad1a1e35a3a391/src/types/CTAStateParam.ts#L4-L9

---
