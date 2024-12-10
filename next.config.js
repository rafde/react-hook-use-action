/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ['src/app', 'src/lib', 'src/components', 'src/hooks',], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
	},
};

if ( process.env.NODE_ENV === 'production' ) {
	nextConfig.output = 'export';
}

module.exports = nextConfig;
