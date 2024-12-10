import { introductionConfig, } from '../components/AppSidebar';
import Code from '../components/ui/code';
import HeaderLink from '../components/ui/headerLink';

export default function Introduction() {
	return <section>
		<HeaderLink href={introductionConfig.href} title="react-hook-use-cta: useCTA (use Call To Action)" />
		<article className="space-y-2 p-4">
			<p>
				A React hook for managing complex state with custom actions, history tracking, and type safety.
			</p>

			<p className="font-bold">Features</p>

			<ul className="list-inside list-[square]">
				<li>Type-safe state management</li>
				<li>Initial state management</li>
				<li>
					Built-in state history tracking
					<ul className="list-inside list-[circle] pl-4">
						<li>
							<Code>initial</Code>
							: The initial state of the component
						</li>
						<li>
							<Code>previousInitial</Code>
							: Tracks previous initial state
						</li>
						<li>
							<Code>current</Code>
							: The current state of the component
						</li>
						<li>
							<Code>previous</Code>
							: The state before current state changed
						</li>
						<li>
							<Code>changes</Code>
							: Different between initial and current state
						</li>
					</ul>
				</li>
				<li>
					Default action types
					<ul className="list-inside list-[circle] pl-4">
						<li>
							<Code>update</Code>
							: Update current state
						</li>
						<li>
							<Code>replace</Code>
							: Replace entire current state
						</li>
						<li>
							<Code>updateInitial</Code>
							: Update initial state
						</li>
						<li>
							<Code>replaceInitial</Code>
							: Replace initial state
						</li>
						<li>
							<Code>reset</Code>
							: Reset current state to initial state, or replace initial state and current state
						</li>
					</ul>
				</li>
				<li>
					Flexible and customizable actions for state management
				</li>
			</ul>
		</article>
	</section>;
}
