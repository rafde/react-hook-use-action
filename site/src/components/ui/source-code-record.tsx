'use client';
import { useEffect, } from 'react';
import useSourceCode from '../../hooks/useSourceCode';
import { SourceCodeRecordProps, } from '../../types/source-code-record-props';

export default function SourceCodeRecord( props: SourceCodeRecordProps, ) {
	const update = useSourceCode( ( { dispatch, }, ) => dispatch.cta.update, );
	useEffect( () => {
		update( 'sourceCodeRecord', props.sourceCodeRecord, );
	}, [props.sourceCodeRecord, update,], );
	return null;
}
