import { PropsWithChildren, } from 'react';

export default function Content( props: PropsWithChildren, ) {
	return <article className="flex flex-col space-y-2 p-4">{props.children}</article>;
}
