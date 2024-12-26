import { installConfig, installDenoConfig, installNPMConfig, installYarnConfig, } from '../nav-sidebar/config';
import CodeBlock from '../ui/codeBlock';

import Sect from '../ui/sect';

export default function InstallTopic() {
	return <>
		<Sect {...installConfig} Header="h3">
			<CodeBlock lang="text" copyButton={true}>react-hook-use-cta</CodeBlock>
		</Sect>

		<Sect {...installNPMConfig}>
			<CodeBlock lang="bash" copyButton={true}>npm i react-hook-use-cta</CodeBlock>
		</Sect>

		<Sect {...installYarnConfig}>
			<CodeBlock lang="bash" copyButton={true}>yarn add react-hook-use-cta</CodeBlock>
		</Sect>

		<Sect {...installDenoConfig}>
			<CodeBlock lang="bash" copyButton={true}>deno add jsr:@rafde/react-hook-use-cta</CodeBlock>
		</Sect>
	</>;
}
