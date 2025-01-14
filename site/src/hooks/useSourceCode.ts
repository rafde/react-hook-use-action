'use client';
import { createCTASelector, } from '../../../src';
import type { SourceCodeRecord, } from '../util/getSourceFiles';

const useSourceCode = createCTASelector(
	{
		initial: {
			sourceCodeRecord: {} as SourceCodeRecord,
		},
	},
	dispatch => ( {
		getSourceCode: ( key: keyof SourceCodeRecord, isTrim: boolean, ) => {
			const sourceCode = dispatch.history.current.sourceCodeRecord[ key ];
			if ( isTrim ) {
				return sourceCode?.trim();
			}

			return sourceCode;
		},
	} ),
);

export default useSourceCode;
