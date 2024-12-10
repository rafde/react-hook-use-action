import { installConfig, installNPMConfig, installYarnConfig, } from '../components/AppSidebar';
import CodeBlock from '../components/ui/codeBlock';

import HeaderLink from '../components/ui/headerLink';
import SubHeaderLink from '../components/ui/subHeaderLink';

export default function Install() {
	return <section className="flex flex-col space-y-2">
		<HeaderLink {...installConfig} />
		<article className="px-2">
			<CodeBlock code="react-hook-use-cta" />
		</article>

		<SubHeaderLink href={installNPMConfig.href} title={installNPMConfig.title} />
		<article className="px-2">
			<CodeBlock code="npm i react-hook-use-cta" lang="bash" />
		</article>

		<SubHeaderLink href={installYarnConfig.href} title={installYarnConfig.title} />
		<article className="px-2">
			<CodeBlock code="yarn add react-hook-use-cta" lang="bash" />
		</article>
	</section>;
}
