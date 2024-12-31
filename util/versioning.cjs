#!/usr/bin/env node

const process = require( 'node:process', );
const fs = require( 'node:fs', );

const { inc, } = require( 'semver', );
const pkg = require( '../package.json', );
const jsr = require( '../jsr.json', );

const { release, } = process.env;

if ( !release ) {
	console.error( 'no release type specified', );
	process.exit( 1, );
}

const preid = release === 'prerelease' ? 'pre' : undefined;

console.log( 'process.env.release', release, 'preid', preid, );

const versionInc = inc( pkg.version, release, preid, );

console.log( 'package.json version:', pkg.version, );
console.log( 'jsr.json version:', jsr.version, );

console.log( 'version inc:', versionInc, );

fs.writeFile(
	'package.json',
	JSON.stringify( {
		...pkg,
		version: versionInc,
	},
	null,
	2, ),
	{
		encoding: 'utf8',
		flags: 'w',
	},
	( err, ) => {
		if ( err ) {
			console.error( 'error updating version', err, );
			return;
		}
		console.log( 'package.json version updated', );
	},
);

fs.writeFile(
	'jsr.json',
	JSON.stringify( {
		...jsr,
		version: versionInc,
	},
	null,
	2, ),
	{
		encoding: 'utf8',
		flags: 'w',
	},
	( err, ) => {
		if ( err ) {
			console.error( 'error updating version', err, );
			return;
		}
		console.log( 'jsr.json version updated', );
	},
);
