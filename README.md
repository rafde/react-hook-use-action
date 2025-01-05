# react-hook-use-cta: useCTA (use Call To Action)

![Branches](./site/public/badges/coverage-branches.svg)
![Functions](./site/public/badges/coverage-functions.svg)
![Lines](./site/public/badges/coverage-lines.svg)
![Statements](./site/public/badges/coverage-statements.svg)
![Coverage total](./site/public/badges/coverage-total.svg)

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
