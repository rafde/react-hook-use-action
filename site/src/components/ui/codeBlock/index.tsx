import { Prism as SyntaxHighlighter, } from 'react-syntax-highlighter';
import { vscDarkPlus, } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeBlockCopyButton from './codeBlockCopyButton';

type CodeBlockProp = {
	lang?: string
	children: string
	copyButton?: boolean
};

export default function CodeBlock( props: CodeBlockProp, ) {
	const {
		lang = 'tsx',
		children,
		copyButton = false,
	} = props;
	return <div className="relative">
		{copyButton && <CodeBlockCopyButton code={children} />}
		<SyntaxHighlighter
			language={lang}
			style={vscDarkPlus}
		>
			{children}
		</SyntaxHighlighter>
	</div>;
}
