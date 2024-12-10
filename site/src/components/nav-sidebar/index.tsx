import GithubIcon from '../ui/githubIcon';
import NavHiddenCheck from '../ui/navHiddenCheck';
import NavList from '../ui/navList';
import NavOverlayCloseButton from '../ui/navOverlayCloseButton';

import pkg from '../../../../package.json';
import NavOverlyHiddenCheck from '../ui/navOverlayHiddenCheck';

export default function NavSidebar() {
	return <aside className="absolute inset-0 z-0 flex flex-col overflow-hidden bg-slate-500/50 opacity-0 transition-[opacity,z-index] duration-300 has-[.navOverlay:checked]:z-20 has-[.navOverlay:checked]:opacity-100 sm:static sm:w-0 sm:max-w-[--navbar-max-width] sm:grow sm:transition-[opacity,width] sm:has-[.navSidebar:checked]:w-full sm:has-[.navSidebar:checked]:opacity-100">
		<NavOverlyHiddenCheck />
		<NavHiddenCheck />
		<nav className="flex w-full max-w-[--navbar-max-width] grow -translate-x-full flex-col space-y-2 overflow-hidden bg-black pb-2 transition-transform duration-300 ease-in-out peer-checked/overlay:translate-x-0 sm:transform-none">
			<header className="flex p-1">
				<h1 className="grow text-wrap text-2xl font-bold">react-hook-use-cta</h1>
				<NavOverlayCloseButton />
			</header>
			<NavList />
			<footer className="flex justify-between p-2">
				<p>
					Version
					{' '}
					{pkg.version}
				</p>
				<a
					href="https://github.com/rafde/react-hook-use-cta"
					target="_blank"
					className="size-6 overflow-hidden"
					aria-label="Link to open new window react-hook-use-cta GitHub repository"
				>
					<GithubIcon />
				</a>
			</footer>
		</nav>
	</aside>;
}
