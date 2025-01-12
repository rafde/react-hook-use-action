import FastEqualsLink from '../../../links/fast-equals';
import StrictDeepEqualLink from '../../../links/strict-deep-equal';

import { useCTAParameterCompareConfig, useCTAParameterCompareExampleConfig, } from '../../../nav-sidebar/config/use-cta-config';
import RelatedLiCreateCTA from '../../../related-li/create-cta-li';
import RelatedLiCreateCTASelector from '../../../related-li/create-cta-selector-li';
import Code from '../../../ui/code';
import CodeBlockSource from '../../../ui/codeBlock/Source';
import Content from '../../../ui/content';
import Embed from '../../../ui/embed';
import Sect from '../../../ui/sect';
import RelatedLiUseCTACommon from '../../../related-li/common-cta-li';

export default function UseCTAParameterCompareTopic() {
	return <>
		<Sect {...useCTAParameterCompareConfig}>
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
				<CodeBlockSource src="types/UseCTAParameterCompare.ts" />
				<ol className="list-inside list-decimal">
					<li>
						<Code>previousValue</Code>
						{': '}
						A state property value from
						{' '}
						<Code>current</Code>
						.
					</li>
					<li>
						<Code>nextValue</Code>
						{': '}
						new value sent from calling an action.
					</li>
					<li>
						<Code>extra</Code>
						{': '}
						object containing
						<ul className="list-inside list-[square] pl-5">
							<li>
								<Code>extra.key</Code>
								{': '}
								state property being compared.
							</li>
							<li>
								<Code>extra.cmp</Code>
								{': '}
								gives you access to
								{' '}
								<StrictDeepEqualLink />
								{' '}
								from
								{' '}
								<FastEqualsLink />
							</li>
						</ul>
					</li>
				</ol>

				<p>
					It should return:
				</p>

				<ul className="list-inside list-[square]">
					<li>
						<Code>true</Code>
						{' '}
						if the values are considered equal
					</li>
					<li>
						<Code>false</Code>
						{' '}
						if the values are different
					</li>
				</ul>

				<p>This is particularly useful when:</p>
				<ul className="list-inside list-[square]">
					<li>You need custom equality logic for specific state properties.</li>
					<li>You want to optimize re-renders by comparing only specific properties.</li>
					<li>Working with complex nested objects that need special comparison handling.</li>
				</ul>
			</Content>
		</Sect>
		<Sect {...useCTAParameterCompareExampleConfig} Header="h5">
			<Embed
				title="react-hook-use-cta useCTA compare parameter example"
				src="https://stackblitz.com/edit/use-cta-compare-tdgkwq3j-kyc7wvdw?ctl=1&embed=1&file=src%2FUseCTACompare.tsx"
			/>
		</Sect>
	</>;
}
