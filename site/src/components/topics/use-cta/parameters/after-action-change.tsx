import BuiltInLink from '../../../links/built-in';
import CustomActionLink from '../../../links/custom-action';
import StateHistoryLink from '../../../links/state-history';
import {
	useCTAAfterActionChangeParametersConfig,
	useCTAfterActionChangeReturnConfig,
	useCTAParameterAfterActionChangeConfig,
	useCTAParameterAfterActionChangeExampleConfig,
} from '../../../nav-sidebar/config/use-cta-config';
import RelatedLiCreateCTA from '../../../related-li/create-cta-li';
import RelatedLiCreateCTASelector from '../../../related-li/create-cta-selector-li';
import Code from '../../../ui/code';
import CodeBlockSource from '../../../ui/codeBlock/Source';
import Content from '../../../ui/content';
import Embed from '../../../ui/embed';
import Sect from '../../../ui/sect';
import RelatedLiUseCTACommon from '../../../related-li/common-cta-li';

export function UseCTAParameterAfterActionChangeTopic() {
	return <>
		<Sect {...useCTAParameterAfterActionChangeConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					callback that is a related parameter for:
				</p>
				<ul className="list-inside list-[square]">
					<RelatedLiCreateCTA />
					<RelatedLiCreateCTASelector />
					<RelatedLiUseCTACommon />
				</ul>
				<CodeBlockSource src="types/UseCTAParameterAfterActionChange.ts" />
				<b>Features:</b>
				<ul className="list-inside list-[square]">
					<li>Internally, this gets called asynchronously.</li>
					<li>
						Only runs after an action has changed the hook state history.
					</li>
					<li>
						You can use this for logging, analytics, setting
						{' '}
						<Code>localStorage</Code>
						, etc.
					</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterAfterActionChangeExampleConfig} Header="h5">
			<Embed
				title="react-hook-use-cta useCTA afterActionChange parameter example"
				src="https://stackblitz.com/edit/use-cta-after-action-change-gtdgkwq3j-kyc7wvdw-dadadnur?ctl=1&embed=1&file=src%2FUseCTAAfterActionChange.tsx"
			/>
		</Sect>
		<Sect {...useCTAAfterActionChangeParametersConfig}>
			<Content>
				<ol className="list-inside list-decimal">
					<li>
						<Code>ctaHistory</Code>
						{': '}
						New
						{' '}
						<StateHistoryLink />
						.
					</li>
					<li>
						<Code>actionType</Code>
						{': '}
						The name of the
						{' '}
						<BuiltInLink />
						{' '}
						it will behave like.
					</li>
					<li>
						<Code>customActionName</Code>
						{': '}
						The name of the
						{' '}
						<CustomActionLink />
						{' '}
						that called it.
						{' '}
						<Code>undefined</Code>
						{' '}
						if no custom action was called.
					</li>
				</ol>
			</Content>
		</Sect>
		<Sect {...useCTAfterActionChangeReturnConfig}>
			<Content>
				<p>
					There&#39;s no return value.
				</p>
			</Content>
		</Sect>
	</>;
}
