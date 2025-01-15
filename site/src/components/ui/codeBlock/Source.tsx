'use client';
import useSourceCode from '../../../hooks/useSourceCode';
import { SourceCodeRecord, } from '../../../util/getSourceFiles';
import CodeBlock from './index';

export default function CodeBlockSource( {
	src,
	isTrim = true,
}: {
	src: keyof SourceCodeRecord
	isTrim?: boolean
}, ) {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( src, isTrim, ), );
	return <CodeBlock>{sourceCode}</CodeBlock>;
}
