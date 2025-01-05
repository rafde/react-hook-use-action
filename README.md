# react-hook-use-cta: useCTA (use Call To Action)

[![NPM License](https://img.shields.io/npm/l/react-hook-use-cta)](/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/react-hook-use-cta)](https://www.npmjs.com/package/react-hook-use-cta)
[![JSR Version](https://img.shields.io/jsr/v/%40rafde/react-hook-use-cta)](https://jsr.io/@rafde/react-hook-use-cta)
![Test](https://github.com/rafde/react-hook-use-cta/actions/workflows/badges.yml/badge.svg)
![Lines](./site/public/badges/coverage-lines.svg)

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
