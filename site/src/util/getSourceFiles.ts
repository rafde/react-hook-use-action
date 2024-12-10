import * as fs from 'node:fs';

type SourceCodeFileRecord = {
	filePath: string
	start: number
	end?: number
};

type SourceFileList = string | SourceCodeFileRecord;

const sourceFileList = [
	'types/CTAState.ts',
	'types/CTAHistory.ts',
	'types/UseCTAParameterOnInit.ts',
	'types/UseCTAParameterCompare.ts',
	'types/DefaultActionsRecord.ts',
	{
		filePath: 'types/CTAHistory.ts',
		start: 2,
		end: 9,
	},
	'types/UseCTAParameterActionsCustomRecord.ts',
	{
		filePath: 'types/UseCTAReturnTypeDispatch.ts',
		start: 225,
		end: 235,
	},
	{
		filePath: 'types/CustomCTAHistory.ts',
		start: 11,
	},
	'types/UseCTAReturnType.ts',
] as const;

type SourceFilePath<T extends SourceFileList,> = T extends SourceCodeFileRecord ? T['filePath'] : T;

function getSourceFile( sourceFilePath: SourceFileList, ) {
	return new Promise<string>( ( resolve, reject, ) => {
		const filePath: SourceFileList = typeof sourceFilePath !== 'string' ? sourceFilePath.filePath : sourceFilePath;

		fs.readFile( `../src/${filePath}`, 'utf8', ( err, sourceText, ) => {
			if ( err ) {
				reject( err, );
				return;
			}
			let sourceRange = sourceText.trim();
			if ( typeof sourceFilePath !== 'string' ) {
				sourceRange = sourceText.split( '\n', ).slice( sourceFilePath.start, sourceFilePath.end, )
					.join( '\n', )
					.trim();
			}
			// console.log( filePath, sourceText, );
			resolve( sourceRange, );
		}, );
	}, );
}

export default async function getSourceFiles() {
	return Promise.all(
		sourceFileList.map(
			filePath => getSourceFile( filePath, ),
		),
	).then( data => data.reduce( ( acc, file, index, ) => {
		const sourceFilePath = sourceFileList[ index ];
		const key = typeof sourceFilePath === 'string' ? sourceFilePath : sourceFilePath.filePath;

		acc[ key ] = file;
		return acc;
	}, {} as Record<SourceFilePath<typeof sourceFileList[number]>, string>, ), );
}

export type SourceCodeRecord = Awaited<ReturnType<typeof getSourceFiles>>;
