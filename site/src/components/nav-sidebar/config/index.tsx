import Link from 'next/link';
import { createCtaConfig, } from './create-cta-config';
import { createCTAContextConfig, } from './create-cta-context-config';
import { createCtaSelectorConfig, } from './create-cta-selector-config';
import { exportTypesConfig, } from './export-types';
import { returnCtaParameterConfig, } from './return-cta-parameter-config';
import { useCTAConfig, } from './use-cta-config';

export type NavItem = Readonly<{
	desc?: Parameters<typeof Link>[0]['children']
	href: string
	navTitle?: Parameters<typeof Link>[0]['children']
	subNav?: Array<NavItem>
	title: string
}>;

export const introductionConfig: NavItem = {
	href: 'intro',
	navTitle: 'Intro',
	title: 'Intro',
	desc: 'react-hook-use-cta: (use Call To Action)',
};

export const installNPMConfig: NavItem = {
	href: 'install-npm',
	title: 'NPM',
};

export const installYarnConfig: NavItem = {
	href: 'install-yarn',
	title: 'Yarn',
};

export const installDenoConfig: NavItem = {
	href: 'install-deno',
	title: 'Deno',
};

export const installConfig: NavItem = {
	href: 'install',
	subNav: [
		installNPMConfig,
		installYarnConfig,
		installDenoConfig,
	],
	title: 'Install',
};

export const navList: NavItem[] = [
	introductionConfig,
	installConfig,
	useCTAConfig,
	createCtaSelectorConfig,
	createCtaConfig,
	createCTAContextConfig,
	returnCtaParameterConfig,
	exportTypesConfig,
];
