import './globals.css';

import type { Metadata, } from 'next';
import { Inter, } from 'next/font/google';
import { ReactNode, } from 'react';
import { AppSidebar, } from '../components/AppSidebar';
import { SidebarProvider, SidebarTrigger, } from '../components/ui/sidebar';

const inter = Inter( { subsets: ['latin',], }, );

export const metadata: Metadata = {
	title: 'react-hook-use-cta Documentation',
	description: 'Documentation for react-hook-use-cta',
};

export default function RootLayout( {
	children,
}: {
	children: ReactNode
}, ) {
	return (
		<html lang="en" className="bg-black">
			<body className={`${inter.className} bg-black text-white`}>
				<SidebarProvider>
					<AppSidebar />
					<main className="relative flex flex-1 flex-col">
						<SidebarTrigger />
						{children}
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
