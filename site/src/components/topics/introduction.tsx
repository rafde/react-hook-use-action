import Image from 'next/image';
import { introductionConfig, } from '../nav-sidebar/config';

import { useCTAReturnValues0HistoryConfig, } from '../nav-sidebar/config/use-cta-config';
import {
	useCTAParameterActionsOverridableConfig,
} from '../nav-sidebar/config/use-cta-parameter-actions-override-built-in-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import Content from '../ui/content';
import Sect from '../ui/sect';

export default function IntroductionTopic() {
	return <Sect {...introductionConfig} Header="h2">
		<Content>
			<p>
				A React hook for managing complex state with custom actions, history tracking, and type safety.
			</p>
			<p className="flex flex-wrap items-center justify-center gap-2">
				<a href="https://github.com/rafde/react-hook-use-cta/blob/main/LICENSE" target="_blank" rel="noreferrer"><Image alt="NPM License" src="https://img.shields.io/npm/l/react-hook-use-cta" width="75" height="20" /></a>
				<a href="https://www.npmjs.com/package/react-hook-use-cta" target="_blank" rel="noreferrer"><Image alt="NPM Version" src="https://img.shields.io/npm/v/react-hook-use-cta" width="75" height="20" /></a>
				<a href="https://jsr.io/@rafde/react-hook-use-cta" target="_blank" rel="noreferrer"><Image alt="JSR Version" src="https://img.shields.io/jsr/v/%40rafde/react-hook-use-cta" width="65" height="20" /></a>
				<Image alt="Test" src="https://github.com/rafde/react-hook-use-cta/actions/workflows/badges.yml/badge.svg" width="115" height="20" />
				<Image alt="Lines" src="/badges/coverage-lines.svg" width="105" height="20" />
			</p>
			<b>Features</b>

			<ul className="list-inside list-[square]">
				<li>Type-safe state management</li>
				<li>Initial state management</li>
				<li>
					Built-in
					{' '}
					<Anchor
						href={useCTAReturnValues0HistoryConfig.href}
						aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title} section`}>
						state history
					</Anchor>
					{' '}
					tracking.
					<ul className="list-inside list-[circle] pl-4">
						<li>
							<Code>current</Code>
							: The current hook state
						</li>

						<li>
							<Code>initial</Code>
							: The initial state of the hook.
						</li>

						<li>
							<Code>changes</Code>
							: The changes between the
							{' '}
							<Code>initial</Code>
							{' '}
							and
							{' '}
							<Code>current</Code>
							{' '}
							state.
						</li>

						<li>
							<Code>previous</Code>
							: The previous
							{' '}
							<Code>current</Code>
							{' '}
							state object.
						</li>

						<li>
							<Code>previousInitial</Code>
							: The previous
							{' '}
							<Code>initial</Code>
							{' '}
							state object.
						</li>

					</ul>
				</li>
				<li>
					{' '}
					<Anchor
						href={useCTAParameterActionsOverridableConfig.href}
						aria-label={`Link to ${useCTAParameterActionsOverridableConfig.title} section`}>
						Overridable built-in action
					</Anchor>
					{' '}
					types
					<ul className="list-inside list-[circle] pl-6">
						<li>
							<Code>update</Code>
							: Update
							{' '}
							<Code>current</Code>
							{' '}
							state
						</li>
						<li>
							<Code>replace</Code>
							: Replace entire
							{' '}
							<Code>current</Code>
							{' '}
							state
						</li>
						<li>
							<Code>updateInitial</Code>
							: Update
							{' '}
							<Code>initial</Code>
							{' '}
							state
						</li>
						<li>
							<Code>replaceInitial</Code>
							: Replace
							{' '}
							<Code>initial</Code>
							{' '}
							state
						</li>
						<li>
							<Code>reset</Code>
							: Reset
							{' '}
							<Code>current</Code>
							{' '}
							state to
							{' '}
							<Code>initial</Code>
							{' '}
							state, or replace
							{' '}
							<Code>initial</Code>
							{' '}
							state and
							{' '}
							<Code>current</Code>
							{' '}
							state
						</li>
					</ul>
				</li>
				<li>
					Flexible and customizable actions for state management
				</li>
			</ul>
		</Content>
	</Sect>;
}
