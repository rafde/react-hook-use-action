# react-hook-use-cta: useCTA (use Call To Action)

[![NPM License](https://img.shields.io/npm/l/react-hook-use-cta)](/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-hook-use-cta)](https://www.npmjs.com/package/react-hook-use-cta)
[![JSR Version](https://img.shields.io/jsr/v/%40rafde/react-hook-use-cta)](https://jsr.io/@rafde/react-hook-use-cta)
![Test](https://github.com/rafde/react-hook-use-cta/actions/workflows/test.yml/badge.svg)
![Lines](./site/public/badges/coverage-lines.svg)

## Why should I use this?

Key advantage of react-hook-use-cta is `deepUpdate`. It allows for
- Simple dot notation for accessing deep paths
- Type-safe updates
- Multiple deep updates in a single operation
- Optional manual object spreading
- Combines well with custom actions
- Reduces code complexity significantly
- Less prone to errors from manual nesting
- This makes react-hook-use-cta particularly powerful for applications with complex, deeply nested state structures.

Sample state:
```tsx
const initial = {
	user: {
		profile: {
			name: 'John',
		},
		settings: {
			notifications: {
				email: true,
				push: true,
				frequency: {
					daily: 5,
					weekly: 10
				},
			},
			theme: {
				mode: 'light',
				colors: {
					primary: '#111',
					secondary: '#fff'
				}
			}
		}
	},
}
```

```tsx
import { useCTA } from 'react-hook-use-cta';
import type {GetCTAStateValue} from 'react-hook-use-cta';

export function MyComponent() {
	// react-hook-use-cta with deepUpdate - clean and maintainable
	const [state, dispatch] = useCTA({
		initial: initialState,
		actions: {
			updatenNotif(state, notif: GetCTAStateValue<typeof state.current, 'user.settings.notifications'>) {
				return state.deepUpdateAction('user.settings.notifications', notif);
			},
			// This is unrealistic, but shows how to use deepUpdateAction
			toggleModeAndEmailAndPush({current: {user: {settings}}, deepUpdateAction}) {
				return deepUpdateAction(
					'user.settings.theme.mode',
					settings.theme.mode === 'light' ? 'dark' : 'light'
				).merge(
					'user.settings.notifications',
					{
						email: !settings.notifications.email,
						push: !settings.notifications.push,
					}
				);
			}
		}
	});
	
	return <>
		<button onClick={() => dispatch.cta.deepUpdate( ({current}) => {user: {settings: {theme: {mode: !current.user.settings.theme.mode}}}} ) }>
			Toggle Themer
		</button>
		<button onClick={() => dispatch.cta.updatenNotif( { email:false, push:false } ) }>
			Set email and push false
		</button>
		<button onClick={() => dispatch.cta.toggleModeAndEmailAndPush() }>
			Toggle theme mode, email, and push
		</button>
	<>;
}
```


Read full document for `react-hook-use-cta` on [documentation website](https://rafde.github.io/react-hook-use-cta)

## Install

```bash
npm i react-hook-use-cta
```

```bash
yarn add react-hook-use-cta
```

```bash
deno add jsr:@rafde/react-hook-use-cta
```

## useCTA

```tsx
import { useCTA, } from 'react-hook-use-cta';
```

```tsx
const [
	history,
	dispatch
] = useCTA({
	initial: {
		value: 0,
	},
});
```

## createCTA

```tsx
import { createCTA, } from 'react-hook-use-cta';

const [
	history,
	dispatch
] = createCTA({
	initial: {
		value: 0,
	},
});
```


## createCTAContext

```tsx
import { createCTAContext, } from 'react-hook-use-cta';

const context = createCTAContext({
	initial: {
		value: 0,
	},
});

export const CTAProvider = context.CTAProvider;
export const useCTAHistoryContext = context.useCTAHistoryContext;
export const useCTADispatchContext = context.useCTADispatchContext;
```

## createCTASelector

```tsx
import { createCTASelector, } from 'react-hook-use-cta';

export const useCTASelector = createCTASelector({
	initial: {
		value: 0,
	},
});
```
