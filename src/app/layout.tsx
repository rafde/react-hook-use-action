import type { Metadata, } from 'next';
import { Inter, } from 'next/font/google';
import { ReactNode, } from 'react';

const inter = Inter( { subsets: ['latin',], }, );

export const metadata: Metadata = {
	title: 'react-hook-use-cta docs',
	description: 'Documentation for react-hook-use-cta',
};

export default function RootLayout( {
	children,
}: {
	children: ReactNode
}, ) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
