import { Prism as SyntaxHighlighter, } from 'react-syntax-highlighter';
import { vscDarkPlus, } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeBlockCopyButton from './codeBlockCopyButton';

type CodeBlockProp = {
	lang?: string
	code: string
};

export default function Index( props: CodeBlockProp, ) {
	const {
		lang = 'text',
		code,
	} = props;
	return <div className="group relative">
		<CodeBlockCopyButton code={code} />
		<SyntaxHighlighter
			language={lang}
			style={vscDarkPlus}
		>
			{code}
		</SyntaxHighlighter>
	</div>;
}
