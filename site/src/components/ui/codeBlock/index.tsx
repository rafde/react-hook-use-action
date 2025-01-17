import { CSSProperties, PropsWithChildren, } from 'react';
import { Prism as SyntaxHighlighter, } from 'react-syntax-highlighter';
import { vscDarkPlus, } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeBlockCopyButton from './codeBlockCopyButton';

function PreTag( props: PropsWithChildren<{
	className: string
	style: CSSProperties
}>, ) {
	return <pre className={`${props.className} overflow-auto whitespace-pre rounded-sm bg-[#1e1e1e] px-2 py-4`}>{props.children}</pre>;
}

function CodeTag( props: PropsWithChildren<{
	className: string
	style: CSSProperties
}>, ) {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		style,
		..._props
	} = props;
	return <code {...{
		..._props,
		className: `${props.className} text-[#9cdcfe] text-sm hyphens-none break-normal [direction:ltr]`,
	}} />;
}

type CodeBlockProp = {
	lang?: string
	children: string
	copyButton?: boolean
	className?: string
};

export default function CodeBlock( props: CodeBlockProp, ) {
	const {
		lang = 'typescript',
		children,
		copyButton = false,
		className = '',
	} = props;
	const code = children;
	const codeBlock = <SyntaxHighlighter
		language={lang}
		style={vscDarkPlus}
		PreTag={PreTag}
		CodeTag={CodeTag}
	>
		{code}
	</SyntaxHighlighter>;
	if ( copyButton ) {
		return <div className={`relative mr-4 ${className}`}>
			<CodeBlockCopyButton code={code} />
			{codeBlock}
		</div>;
	}

	return codeBlock;
}
