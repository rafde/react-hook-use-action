const withBundleAnalyzer = require( '@next/bundle-analyzer', )( {
	enabled: process.env.ANALYZE === 'true',
}, );

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		optimizePackageImports: [
			'lucide-react',
		],
	},
	transpilePackages: [
		'lucide-react',
	],
};

if ( process.env.NODE_ENV === 'production' ) {
	const pkg = require( '../package.json', );
	nextConfig.basePath = `/${pkg.name}`;
	nextConfig.output = 'export';
	nextConfig.images = {
		unoptimized: true,
	};
}

module.exports = withBundleAnalyzer( nextConfig, );
