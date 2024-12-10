import { CSSProperties, PropsWithChildren, } from 'react';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps, } from 'react-syntax-highlighter';
import { vscDarkPlus, } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customStyleDefault = {
	margin: 0,
	padding: 0,
	fontSize: 'inherit',
	lineHeight: 'inherit',
};

type CodeProps = {
	lang?: string
} & Omit<SyntaxHighlighterProps, 'language' | 'PreTag' | 'CodeTag'>;

function CodeTag( props: PropsWithChildren<{ className: string
	style: CSSProperties }>, ) {
	const {
		style,
	} = props;
	return <code {...{
		...props,
		style: {
			...style,
			fontSize: 'inherit',
			lineHeight: 'inherit',
			whiteSpace: 'pre-wrap',
			overflowWrap: 'break-word',
		},
	}} />;
}

export default function Code( props: CodeProps, ) {
	const {
		lang = 'typescript',
	} = props;
	return <SyntaxHighlighter style={vscDarkPlus} customStyle={customStyleDefault} PreTag="span" CodeTag={CodeTag} language={lang}>
		{props.children}
	</SyntaxHighlighter>;
}
