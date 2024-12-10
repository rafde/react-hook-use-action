import { PropsWithChildren, } from 'react';

export default function Code( props: PropsWithChildren, ) {
	return <code className="bg-slate-700 px-1">{props.children}</code>;
}
