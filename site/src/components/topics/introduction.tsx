import { introductionConfig, } from '../nav-sidebar/config';

import { useCTAReturnValues0HistoryConfig, } from '../nav-sidebar/config/use-cta-config';
import Anchor from '../ui/anchor';
import Code from '../ui/code';
import Content from '../ui/content';
import Sect from '../ui/sect';

export default function IntroductionTopic() {
	return <Sect {...introductionConfig} Header="h2" title={introductionConfig.desc}>
		<Content>
			<p>
				A React hook for managing complex state with custom actions, history tracking, and type safety.
			</p>

			<b>Features</b>

			<ul className="list-inside list-[square]">
				<li>Type-safe state management</li>
				<li>Initial state management</li>
				<li>
					Built-in
					{' '}
					<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title} section`}>
						state history
					</Anchor>
					{' '}
					tracking
				</li>
				<li>
					Built-in action types
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
