import './globals.css';

import type { Metadata, } from 'next';
import { Inter, } from 'next/font/google';
import { PropsWithChildren, } from 'react';
import NavSidebar from '../components/nav-sidebar';
import NavOverlayOpenButton from '../components/ui/navOverlayOpenButton';
import NavToggleButton from '../components/ui/navToggleButton';

const inter = Inter( { subsets: ['latin',], }, );

export const metadata: Metadata = {
	title: 'react-hook-use-cta Documentation',
	description: 'Documentation for react-hook-use-cta',
};

export default function RootLayout( props: PropsWithChildren, ) {
	return <html lang="en" className="flex size-full flex-col bg-black">
		<body className={`${inter.className} relative flex grow overflow-hidden bg-black text-white`}>
			<NavSidebar />
			<main className="z-10 flex grow flex-col overflow-hidden">
				<NavToggleButton />
				<NavOverlayOpenButton />
				<div className="flex grow flex-col overflow-auto">
					{props.children}
				</div>
			</main>
		</body>
	</html>;
}
