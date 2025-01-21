export default function unescapeDots( path: string, ) {
	return path.replace( /\\\./g, '.', );
}
