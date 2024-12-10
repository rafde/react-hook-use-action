import Link from 'next/link';
import {
	Sidebar,
	SidebarFooter,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from './ui/sidebar';

export const introductionConfig = {
	title: 'Introduction',
	href: 'introduction',
};

export const installNPMConfig = {
	title: 'NPM',
	href: 'install-npm',
};

export const installYarnConfig = {
	title: 'Yarn',
	href: 'install-yarn',
};

export const installConfig = {
	title: 'Install',
	href: 'install',
	subNav: [
		installNPMConfig,
		installYarnConfig,
	],
};

const navList: {
	title: string
	href: string
	subNav?: Array<{
		title: string
		href: string
	}>
}[] = [
	introductionConfig,
	installConfig,
];

export function AppSidebar() {
	return <Sidebar>
		<SidebarHeader>
			<h1>react-hook-use-cta</h1>
		</SidebarHeader>
		<SidebarGroupContent>
			<SidebarMenu>
				{navList.map( ( nav, ) => {
					let subMenu = null;
					if ( nav.subNav ) {
						subMenu = <SidebarMenuSub>
							{nav?.subNav.map( subnav => <SidebarMenuSubItem key={subnav.title}>
								<SidebarMenuSubButton asChild>
									<Link href={`#${subnav.href}`}>
										{subnav.title}
									</Link>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>, )}
						</SidebarMenuSub>;
					}

					return <SidebarMenuItem key={nav.title}>
						<SidebarMenuButton asChild>
							<Link href={`#${nav.href}`}>
								{nav.title}
							</Link>
						</SidebarMenuButton>
						{subMenu}
					</SidebarMenuItem>;
				}, )}
			</SidebarMenu>
		</SidebarGroupContent>
		<SidebarFooter />
	</Sidebar>;
}
