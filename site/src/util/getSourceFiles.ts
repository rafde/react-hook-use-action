import * as fs from 'node:fs';

type SourceCodeFileRecord = {
	filePath: string
	segments: Array<
		{
			start?: number
			end: number
		} | {
			start: number
			end?: number
		}
	>
	key?: string
};

type SourceFileList = string | SourceCodeFileRecord;

const sourceFileList = [
	'types/CTAState.ts',
	'types/CTAHistory.ts',
	'types/UseCTAParameterOnInit.ts',
	'types/UseCTAParameterCompare.ts',
	'types/UseCTAParameterAfterActionChange.ts',
	'types/UseCTAParameterTransform.ts',
	'types/UseCTAParameterActionsRecordProp.ts',
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsOverridable',
		segments: [
			{
				start: 3,
				end: 6,
			},
			{
				start: 47,
				end: 71,
			},
		],
	},
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsRecordPropUpdate',
		segments: [
			{
				start: 50,
				end: 54,
			},
		],
	},
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsRecordPropReplace',
		segments: [
			{
				start: 54,
				end: 58,
			},
		],
	},
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsRecordPropReset',
		segments: [
			{
				start: 58,
				end: 62,
			},
		],
	},
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsRecordPropUpdateInitial',
		segments: [
			{
				start: 62,
				end: 66,
			},
		],
	},
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsRecordPropReplaceInitial',
		segments: [
			{
				start: 66,
				end: 70,
			},
		],
	},
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsCustomRecord',
		segments: [
			{
				end: 3,
			},
			{
				start: 47,
				end: 50,
			},
			{
				start: 73,
			},
		],
	},
	{
		filePath: 'types/UseCTAParameterActionsRecordProp.ts',
		key: 'UseCTAParameterActionsRecordPropCustom',
		segments: [
			{
				start: 58,
				end: 61,
			},
		],
	},
	{
		filePath: 'types/UseCTAReturnTypeDispatch.ts',
		segments: [{
			start: 83,
		},],
	},
	'types/CustomCTAHistory.ts',
	'types/UseCTAReturnType.ts',
	'types/CreateCTAContextReturn.ts',
] as const;

type SourceFilePath<T,> = T extends { key: string } ? T['key'] : ( T extends { filePath: string } ? T['filePath'] : T );

function getSourceFile( sourceFilePath: SourceFileList, ) {
	return new Promise<string>( ( resolve, reject, ) => {
		const filePath: SourceFileList = typeof sourceFilePath !== 'string' ? sourceFilePath.filePath : sourceFilePath;

		fs.readFile( `../src/${filePath}`, 'utf8', ( err, sourceText, ) => {
			if ( err ) {
				reject( err, );
				return;
			}
			let sourceRange = sourceText;
			if ( typeof sourceFilePath !== 'string' ) {
				const { segments, } = sourceFilePath;
				if ( Array.isArray( segments, ) ) {
					const sourceTextSplit = sourceText.split( '\n', );
					sourceRange = segments.map( segment => sourceTextSplit.slice( segment.start ?? 0, segment.end, ).join( '\n', ), )
						.join( '\n', );
				}
			}
			resolve( sourceRange.replace( /\n?\/\*\*[\s\S]*?\*\//g, '', ).trimRight(), );
		}, );
	}, );
}

export default async function getSourceFiles() {
	return Promise.all(
		sourceFileList.map(
			filePath => getSourceFile( filePath as SourceFileList, ),
		),
	).then( data => data.reduce<Record<string, string>>( ( acc, file, index, ) => {
		const sourceFilePath = sourceFileList[ index ] as SourceFileList;
		if ( typeof sourceFilePath === 'string' ) {
			acc[ sourceFilePath ] = file;
			return acc;
		}

		const key = sourceFilePath.key ?? sourceFilePath.filePath;

		acc[ key ] = file;
		return acc;
	}, {}, ) as Record<SourceFilePath<typeof sourceFileList[number]>, string>, );
}

export type SourceCodeRecord = Awaited<ReturnType<typeof getSourceFiles>>;
