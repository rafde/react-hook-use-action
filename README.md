# react-hook-use-cta: useCTA (use Call To Action)

A somewhat flexible react hook alternative to `React.useReducer`. Written in Typescript.

## Table of Contents

- [Installation](#installation)
  - [NPM](#npm)
- [export { useCTA }](#export--usecta-)
  - [Usage](#usage)

<details>

<summary>Table of Contents: Parameter</summary>

- [Parameter](#parameter)
  - [initial](#parameter-initial)
  - [onInit](#parameter-oninit)
  - [actions](#parameter-actions)
    - [Predefined actions](#predefine-actions)
    - [actions?.\['customAction'\]](#parameter-actionscustomaction)

</details>

<details>

<summary>Table of Contents: Return Type</summary>

- [Return Type](#return-type)
  1. [state](#return-type-state)
  2. [dispatch](#return-type-dispatch)
      - [dispatch.state](#return-type-state)
        - [dispatch.state.current](#return-type-dispatchstatecurrent)
        - [dispatch.state.initial](#return-type-dispatchstateinitial)
        - [dispatch.state.changes](#return-type-dispatchstatechanges)
        - [dispatch.state.previous](#return-type-dispatchstateprevious)
    - [dispatch.cta](#return-type-dispatchcta)
        - [dispatch.cta?.\['customAction'\]](#return-type-dispatchctacustomaction)
          - [dispatch.cta?.\['customAction'\] with `payload` parameter](#return-type-dispatchctacustomaction-with-payload-parameter)
          - [dispatch.cta?.\['customAction'\] without parameter](#return-type-dispatchctacustomaction-without-parameter)
        - [dispatch.cta.update](#return-type-dispatchctaupdate)
          - [dispatch.cta.update with `payload` parameter](#return-type-dispatchctaupdate-with-payload-parameter)
          - [dispatch.cta.update with `key` and `value` parameters](#return-type-dispatchctaupdate-with-key-and-value-parameters)
        - [dispatch.cta.replace](#return-type-dispatchctareplace)
        - [dispatch.cta.replaceInitial](#return-type-dispatchctareplaceinitial)
        - [dispatch.cta.reset](#return-type-dispatchctareset)
          - [dispatch.cta.reset without parameter](#return-type-dispatchctareset-with-payload-parameter)
          - [dispatch.cta.reset with `payload` parameter](#return-type-dispatchctareset-without-parameter)

</details>

<details>

<summary>Table of Contents: Typescript exports</summary>

- [Typescript exports](#typescript-exports)
  - [export type { CTAInitial, }](#export-type--ctainitial-)
  - [export type { CTAParam, }](#export-type--ctaparam-)
  - [export type { UseCTAParameter, }](#export-type--usectaparameter-)
  - [export type { UseCTAReturnTypeDispatch, }](#export-type--usectareturntypedispatch-)
  - [export type { UseCTAReturnType, }](#export-type--usectareturntype-)

</details>


---

## Installation

```
react-hook-use-cta fast-equals
```

### NPM

```bash
npm i react-hook-use-cta fast-equals
```

---

## export { useCTA }

https://github.com/rafde/react-hook-use-cta/blob/9e9206f1ff06e2de5adcde5d107d9d847e210063/src/index.ts#L9-L14

### Usage

```tsx
import { useCTA } from 'react-hook-use-cta'

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
	
	dispatch.cta.update('search', 'update');

	/* Renders `update` */
	return <>{state.search}</>
}
```

<details>

<summary>Example using all parameters</summary>

```tsx
import { useCTA } from 'react-hook-use-cta'

function View(props: {initial: {search: string, isFuzzy: boolean, count: 0}}) {
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
			replace(ctaParam, payload) {
				return payload;
			},
			replaceInitial(ctaParam, payload) {
				return payload;
			},
			reset(ctaParam, payload) {
				return payload;
			},
			update(ctaParam, payload) {
				return payload;
			},
			// END: augment predefined actions
			
			// START: Custom actions
			toggleIsFuzzy(ctaParam, isFuzzy?: boolean) {
				if (typeof isFuzzy === 'undefined') {
					return {
						isFuzzy: !ctaParam.previous.isFuzzy,
					}
				}
				
				return {
					isFuzzy
				}
			},
			addToCount(ctaParam, value: number) {
				return {
					count: ctaParam.previous.count + value,
				}
			},
			incrementCount(ctaParam) {
				return {
					count: ctaParam.previous.count + 1,
				}
			},
			// END: Custom actions
		}
	});
	
	dispatch.cta.update('search', 'update');

	return <>{state.search}</>
}
```

</details>

---

## Parameter

**Required**

Key/value `object` of type `UseCTAParameter`

https://github.com/rafde/react-hook-use-cta/blob/9e9206f1ff06e2de5adcde5d107d9d847e210063/src/types/UseCTAParameter.ts#L4-L11

Typescript Definition:
- [CTAInitial](#export-type--ctainitial-)

---

### Parameter: `initial`

**Required**

https://github.com/rafde/react-hook-use-cta/blob/1e97f6ef6c5bc3d053cf64007bfea7c5c84877a0/src/types/UseCTAParameter.ts#L9

Similar to `React.useReducer` `initialArg` parameter,
but it only takes key/value `object` that defines the shape of your `state`. 

Values can be anything that
[strictDeepEqual](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal)
from [fast-equals](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#fast-equals)
supports.

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)

---

### Parameter: `onInit`

_Optional_

https://github.com/rafde/react-hook-use-cta/blob/1e97f6ef6c5bc3d053cf64007bfea7c5c84877a0/src/types/UseCTAParameter.ts#L10

Similar to `React.useReducer` `init` parameter. Called on first time render. A `function` that is called to replace [initial](#parameter-initial) value.

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)

--- 

### Parameter: `actions`

_Optional_ 

Read once on first time render. Key/value `object` to define the types of actions to implement.

#### Predefine actions

There are predefined actions that can be augmented with the following signatures:

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAParameterActionsRecordProp.ts#L4-L9

Typescript Definition:
- [CTAInitial](#export-type--ctainitial-)
- [CTAParam](#export-type--ctaparam-)

The following results will **not** trigger re-render for all actions:
- Returning a falsy value.
- Returning a non-`null` `object` that doesn't change the values of [state](#return-type-state) or [dispatch.state](#return-type-dispatchstate)

Calls to action:

- [dispatch.cta.update](#return-type-dispatchctaupdate)
- [dispatch.cta.replace](#return-type-dispatchctareplace)
- [dispatch.cta.replaceInitial](#return-type-dispatchctareplaceInitial)
- [dispatch.cta.reset](#return-type-dispatchctareset)

---

#### Parameter: `actions?.['customAction']`

You can define your own custom actions to handle `payload`s to your specifications. 

Typescript signature:

https://github.com/rafde/react-hook-use-cta/blob/9e9206f1ff06e2de5adcde5d107d9d847e210063/src/types/UseCTAParameterActionsRecordProp.ts#L11-L17

Typescript Definitions:
- [CTAInitial](#export-type--ctainitial-)
- [CTAParam](#export-type--ctaparam-)

<details>

<summary>Example</summary>

```tsx
import { useCTA } from 'react-hook-use-cta'

function View(props: {initial: {search: string, isFuzzy: boolean, count: 0}}) {
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
			// START: Custom actions
			toggleIsFuzzy(ctaParam, payload?: boolean) {
				if (typeof payload === 'undefined') {
					return {
						isFuzzy: !ctaParam.previous.isFuzzy,
					}
				}
				
				return {
					isFuzzy: payload,
				}
			},
			addToCount(ctaParam, payload: number) {
				const count = ctaParam.previous.count + payload;
				if (isNaN(count) || count < 0) {
					return;
				}
				return {
					count,
				}
			},
			incrementCount(ctaParam) {
				return {
					count: ctaParam.previous.count + 1,
				}
			},
			// END: Custom actions
		}
	});
	
	dispatch.cta.addToCount(4);

	return <>{state.count}</>
}
```

</details>

`payload`s can be:
- `undefined`
- optional or required where the value can by
anything [strictDeepEqual](https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal) supports

Return type can be 
- `Partial<Initial>` to trigger re-render if it changes the values of [state](#return-type-state) or [dispatch.state](#return-type-dispatchstate)
- Falsy value to **not** trigger re-render.

Call to action:

- [`dispatch.cta?.\['customAction'\]](#return-type-dispatchctacustomaction)
  - [dispatch.cta?.\['customAction'\] with payload parameter](#return-type-dispatchctacustomaction-with-payload-parameter)
  - [dispatch.cta?.\['customAction'\] without parameter](#return-type-dispatchctacustomaction-without-parameter)

---

## Return Type

Array with two values: `[state, dispatch]` of type `UseCTAReturnType`

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnType.ts#L4C6-L10

Typescript Definitions:
- [CTAInitial](#export-type--ctainitial-)
- [UseCTAReturnTypeDispatch](#return-type-dispatch)

---
### Return Type: `state`

Key/value `object` of type [CTAInitial](#export-type--ctainitial-)

The current `state`. During the first render, it’s set to the result of [onInit](#parameter-oninit)
or [initial](#parameter-initial) if [onInit](#parameter-oninit) was not defined.

---

### Return Type: `dispatch`

Is type [UseCTAReturnTypeDispatch](#export-type--usectareturntypedispatch-)

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L219-L225

Typescript Definition:
- [CTAInitial](#export-type--ctainitial-)

A `function` with static read-only properties [dispatch.state](#return-type-dispatchstate)
and [dispatch.cta](#return-type-dispatchcta). 

Triggers re-render when [state](#return-type-state) or [dispatch.state](#return-type-dispatchstate) change.

Parameters description will be covered by:

- [dispatch.cta?.\['customAction'\]](#return-type-dispatchctacustomaction)
- [dispatch.cta.update](#return-type-dispatchctaupdate)
- [dispatch.cta.replace](#return-type-dispatchctareplace)
- [dispatch.cta.replaceInitial](#return-type-dispatchctareplaceinitial)
- [dispatch.cta.reset](#return-type-dispatchctareset)

---

#### Return Type: `dispatch.state`

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L224

Is of type `UseCTAReturnTypeDispatchState`.

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L212-L217

This is extra data information that can be referenced for certain changes over time.

Typescript Definition:
- [CTAInitial](#export-type--ctainitial-)

---

##### Return Type: `dispatch.state.current`

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L214

The value is equal to [Return Type: state](#return-type-dispatchstate)

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)

---

##### Return Type: `dispatch.state.initial`

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L215

Starts of equal to [initial](#parameter-initial) or the result of [onInit](#parameter-oninit).

It can be changed with [dispatch.cta.replaceInitial](#return-type-dispatchctareplaceinitial) 
or [dispatch.cta.reset with payload parameter](#return-type-dispatchctareset-with-payload-parameter)

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)

---

##### Return Type: `dispatch.state.changes`

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L213

- `Partial<Initial>`: When key/values of [dispatch.state.current](#return-type-dispatchstatecurrent) are not equal to
	[dispatch.state.initial](#return-type-dispatchstateinitial) Example:
	```ts
		dispatch.state.initial /* = {
			search: '',
			isFuzzy: true,
			count: 1,
		} */
 
		dispatch.state.current /* = {
			search: 'current',
			isFuzzy: true,
			count: 1,
		} */
 
		dispatch.state.changes /* = {
			search: 'current',
		} */
 
		if ( dispatch.state.changes ) {
			console.log('state has changes')
		}
	```
- `null`: When the key/values [dispatch.state.initial](#return-type-dispatchstateinitial) 
	and [dispatch.state.current](#return-type-dispatchstatecurrent) are equal. Example:
	```ts
		dispatch.state.initial /* = {
			search: 'current',
			isFuzzy: true,
			count: 1,
		} */
 
		dispatch.state.current /* = {
			search: 'current',
			isFuzzy: true,
			count: 1,
		} */
 
		dispatch.state.changes /* = null */
 
		if ( !dispatch.state.changes ) {
			console.log('No changes to state')
		}
	```
 
Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)

---

##### Return Type: `dispatch.state.previous`

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L216

Equal to the previous [dispatch.state.current](#return-type-dispatchstatecurrent) value.

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)

---

#### Return Type: `dispatch.cta`

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L223

Has predefined actions

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L192-L198

and custom actions if defined in [actions?.\['customAction'\]](#parameter-actionscustomaction).

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)
- [CTAParams](#export-type--ctaparam-)

---

##### Return Type: `dispatch.cta?.['customAction']`

_Optional_

Custom call to action for partially changing [state](#return-type-state)

Parameters are based the expected `payload` you defined them in [Parameter: actions?.\['customAction'\]](#parameter-actionscustomaction)

###### Return Type: `dispatch.cta?.['customAction']` with `payload` parameter

<details>

<summary>Example</summary>

```ts

dispatch.cta.addToCount(5);

// Alias for
dispatch({
	type: 'addToCount',
	payload: 5
});

// or
dispatch.cta.addToCount((ctaParam) => {
	return ctaParam.previous.count + 10;
});

// Alias for
dispatch({
	type: 'addToCount',
	payload: (ctaParam) => {
		return ctaParam.previous.count + 10;
	}
});

// or
dispatch.cta.addToCount((ctaParam) => {
	// No re-render
	return;
});

// Alias for
dispatch({
	type: 'addToCount',
	payload: (ctaParam) => {
		// No re-render
		return;
	}
});

```

</details>


###### Return Type: `dispatch.cta?.['customAction']` without parameter

<details>

<summary>Example</summary>

```ts

dispatch.cta.incrementCount();

// Alias for
dispatch({
	type: 'incrementCount',
});

```

</details>

Effects
- [state](#return-type-state) = new `state` with partial change(s).
- [dispatch.state.current](#return-type-dispatchstatecurrent) = new `state` with partial change(s).
- [dispatch.state.changes](#return-type-dispatchstatechanges)
	- = new differences between [dispatch.state.current](#return-type-dispatchstatecurrent) and [dispatch.state.initial](#return-type-dispatchstateinitial)
	- = `null` if no difference.
- [dispatch.state.previous](#return-type-dispatchstateprevious) = previous [dispatch.state.current](#return-type-dispatchstatecurrent)

---

##### Return Type: `dispatch.cta.update`

Overloaded `function` for partially changing [state](#return-type-state)

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L196-L197

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)
- [CTAParams](#export-type--ctaparam-)

###### Return Type: `dispatch.cta.update` with `payload` parameter

Accepts partial key/values from [Initial](#parameter-initial) and updates [state](#return-type-state) with partial change(s)

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L196

<details>

<summary>Example</summary>

```ts

dispatch.cta.update({
	// partial `state` change
	search: 'update',
	count: 8,
});

// Alias for
dispatch({
	type: 'update',
	payload: {
		// partial `state` change
		search: 'update',
		count: 8,
	}
});

// or
dispatch.cta.update((ctaParam) => {
	return {
		// partial `state` change
		search: 'update',
		count: 8,
	};
});

// Alias for
dispatch({
	type: 'update',
	payload: (ctaParam) => {
		return {
			// partial `state` change
			search: 'update',
			count: 8,
		};
	}
});

// or
dispatch.cta.update((ctaParam) => {
	// No re-render
	return;
});

// Alias for
dispatch({
	type: 'update',
	payload: (ctaParam) => {
		// No re-render
		return;
	}
});

```

</details>

###### Return Type: `dispatch.cta.update` with `key` and `value` parameters

https://github.com/rafde/react-hook-use-cta/blob/1e97f6ef6c5bc3d053cf64007bfea7c5c84877a0/src/types/UseCTAReturnTypeDispatch.ts#L197

Accepts a key from [Initial](#parameter-initial) and a corresponding value type for that key from [Initial](#parameter-initial)`[keyof Initial]` 
and updates [state](#return-type-state) with partial change


<details>

<summary>Example</summary>

```ts

dispatch.cta.update('seatch', 'update'); // partial `state` change

// Alias for
dispatch.cta.update({
	seatch: 'update',
});

```

</details>

Effects
- [state](#return-type-state) = new `state` with partial change(s).
- [dispatch.state.current](#return-type-dispatchstatecurrent) = new `state` with partial change(s).
- [dispatch.state.changes](#return-type-dispatchstatechanges)
	- = new differences between [dispatch.state.current](#return-type-dispatchstatecurrent) and [dispatch.state.initial](#return-type-dispatchstateinitial)
	- = `null` if no difference.
- [dispatch.state.previous](#return-type-dispatchstateprevious) = previous [dispatch.state.current](#return-type-dispatchstatecurrent)

---

##### Return Type: `dispatch.cta.replace`

Replace entire [state](#return-type-state) with a new `state`.

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L193

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)
- [CTAParams](#export-type--ctaparam-)

<details>

<summary>Example</summary>

```ts

dispatch.cta.replace({
	// new `state`
	search: 'replace',
	isFuzzy: false,
	count: 8,
});

// Alias for
dispatch({
	type: 'replace',
	payload: {
		// new `state`
		search: 'replace',
		isFuzzy: false,
		count: 8,
	}
});

// or
dispatch.cta.replace((ctaParam) => {
	return {
		// new `state`
		search: 'replace',
		isFuzzy: false,
		count: 8,
	};
});

// Alias for
dispatch({
	type: 'replace',
	payload: (ctaParam) => {
		return {
			// new `state`
			search: 'replace',
			isFuzzy: false,
			count: 8,
		};
	}
});

// or
dispatch.cta.replace((ctaParam) => {
	// No re-render
	return;
});

// Alias for
dispatch({
	type: 'replace',
	payload: (ctaParam) => {
		// No re-render
		return;
	}
});
```

</details>

Effects
- [state](#return-type-state) = new `state`
- [dispatch.state.current](#return-type-dispatchstatecurrent) = new `state`
- [dispatch.state.changes](#return-type-dispatchstatechanges)
	- = new differences between [dispatch.state.current](#return-type-dispatchstatecurrent) and [dispatch.state.initial](#return-type-dispatchstateinitial)
	- = `null` if no difference.
- [dispatch.state.previous](#return-type-dispatchstateprevious) = previous [dispatch.state.current](#return-type-dispatchstatecurrent)

---

##### Return Type: `dispatch.cta.replaceInitial`

Replace entire [dispatch.state.initial](#return-type-dispatchstateinitial) value with a new `initial` value.

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L194

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)
- [CTAParams](#export-type--ctaparam-)

<details>

<summary>Example</summary>

```ts

dispatch.cta.replaceInitial({
	// new `initial`
	search: 'replaceInitial',
	isFuzzy: true,
	count: 5,
});

// Alias for
dispatch({
	type: 'replaceInitial',
	payload: {
		// new `initial`
		search: 'replaceInitial',
		isFuzzy: true,
		count: 5,
	}
});

// or
dispatch.cta.replaceInitial((ctaParam) => {
	return {
		// new `initial`
		search: 'replaceInitial',
		isFuzzy: true,
		count: 5,
	};
});

// Alias for
dispatch({
	type: 'replaceInitial',
	payload: (ctaParam) => {
		return {
			// new `initial`
			search: 'replaceInitial',
			isFuzzy: true,
			count: 5,
		};
	}
});

// or
dispatch.cta.replaceInitial((ctaParam) => {
	// No re-render
	return;
});

// Alias for
dispatch({
	type: 'replaceInitial',
	payload: (ctaParam) => {
		// No re-render
		return;
	}
});

```

</details>

Effects
- [dispatch.state.initial](#return-type-dispatchstateinitial) = new `initial`
- [dispatch.state.changes](#return-type-dispatchstatechanges)
	- = new differences between [dispatch.state.current](#return-type-dispatchstatecurrent) and [dispatch.state.initial](#return-type-dispatchstateinitial)
	- = `null` if no difference.

---

##### Return Type: `dispatch.cta.reset`

Overloaded `function` that differs in behavior when called with payload parameter and without parameter.

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/UseCTAReturnTypeDispatch.ts#L195

Typescript Definition:
- `Initial` extends [CTAInitial](#export-type--ctainitial-)
- [CTAParams](#export-type--ctaparam-)

###### Return Type: `dispatch.cta.reset` without parameter

Sets [state](#return-type-state) equal to [dispatch.state.initial](#return-type-dispatchstateinitial)

<details>

<summary>Example</summary>

```ts
dispatch.cta.reset();

// Alias for
dispatch({
	type: 'reset',
});
```

</details>

Effects
- [state](#return-type-state) = [dispatch.state.initial](#return-type-dispatchstateinitial)
- [dispatch.state.current](#return-type-dispatchstatecurrent) = [dispatch.state.initial](#return-type-dispatchstateinitial)
- [dispatch.state.changes](#return-type-dispatchstatechanges) = `null`
- [dispatch.state.previous](#return-type-dispatchstateprevious) = previous [dispatch.state.current](#return-type-dispatchstatecurrent)

---

###### Return Type: `dispatch.cta.reset` with `payload` parameter

Sets [state](#return-type-state) and [dispatch.state.initial](#return-type-dispatchstateinitial) equal to `payload`

<details>

<summary>Example</summary>

```ts

dispatch.cta.reset({
	// new `state` and `initial`
	search: 'reset',
	isFuzzy: true,
	count: 10,
});

// Alias for
dispatch({
	type: 'reset',
	payload: {
		// new `state` and `initial`
		search: 'reset',
		isFuzzy: true,
		count: 10,
	}
});

// or
dispatch.cta.reset((ctaParam) => {
	return {
		// new `state` and `initial`
		search: 'reset',
		isFuzzy: true,
		count: 10,
	}; 
});

// Alias for
dispatch({
	type: 'reset',
	payload: (ctaParam) => {
		return {
			// new `state` and `initial`
			search: 'reset',
			isFuzzy: true,
			count: 10,
		};
	}
});

// or
dispatch.cta.reset((ctaParam) => {
	// No re-render
	return;
});

// Alias for
dispatch({
	type: 'reset',
	payload: (ctaParam) => {
		// No re-render
		return;
	}
});
```

</details>

Effects
- [state](#return-type-state) = new `state`
- [dispatch.state.current](#return-type-dispatchstatecurrent) = new `state`
- [dispatch.state.changes](#return-type-dispatchstatechanges) = `null`
- [dispatch.state.initial](#return-type-dispatchstateinitial) = new `state`
- [dispatch.state.previous](#return-type-dispatchstateprevious) = previous [dispatch.state.current](#return-type-dispatchstatecurrent)

---

## Typescript exports

https://github.com/rafde/react-hook-use-cta/blob/9e9206f1ff06e2de5adcde5d107d9d847e210063/src/index.ts#L22-L30

---

## export type { CTAInitial, }

https://github.com/rafde/react-hook-use-cta/blob/9e9206f1ff06e2de5adcde5d107d9d847e210063/src/types/CTAInitial.ts#L1

---

## export type { CTAParam, }

https://github.com/rafde/react-hook-use-cta/blob/0ed13652508f2b3afb74cd7d35c920a3291b5620/src/types/CTAParam.ts#L3-L7

---

## export type { UseCTAParameter, }

See [Parameter](#parameter)

---

## export type { UseCTAReturnTypeDispatch, }

See [Return Type: dispatch](#return-type-dispatch)

---

## export type { UseCTAReturnType, }

See [Return Type](#return-type)

---


