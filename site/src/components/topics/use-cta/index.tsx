import { SourceCodeRecordProps, } from '../../../types/source-code-record-props';

import { useCTABasicExampleConfig, useCTAConfig, } from '../../nav-sidebar/config/use-cta-config';
import CodeBlock from '../../ui/codeBlock';
import Embed from '../../ui/embed';
import Sect from '../../ui/sect';
import UseCTAParameterActionsTopic from './parameters/actions';
import { UseCTAParameterAfterActionChangeTopic, } from './parameters/after-action-change';
import UseCTAParameterOnInitTopic from './parameters/on-init';
import UseCTAParameterInitialTopic from './parameters/initial';
import UseCTAParameterCompareTopic from './parameters/compare';
import { UseCTAParameterTransformTopic, } from './parameters/transform';
import UseCTAReturnValuesTopic from './return/values';

export default function UseCTATopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAConfig}>
			<CodeBlock copyButton={true}>
				{`
import { useCTA, } from 'react-hook-use-cta';

export function FC() {
	const [
		history,
		dispatch,
	] = useCTA({
		initial: {
			search: '',
		},
	});
	
	return <>
		{history.current.search}
	<>;
}
				`.trim()}
			</CodeBlock>
		</Sect>
		<Sect {...useCTABasicExampleConfig}>
			<Embed
				title="react-hook-use-cta useCTA basic example"
				src="https://stackblitz.com/edit/use-cta-basic-tdgkwq3j?ctl=1&embed=1&file=src%2FUseCTABasic.tsx&theme=dark"
			/>
		</Sect>

		<UseCTAParameterInitialTopic {...props} />
		<UseCTAParameterOnInitTopic {...props} />
		<UseCTAParameterCompareTopic {...props} />
		<UseCTAParameterTransformTopic {...props} />
		<UseCTAParameterAfterActionChangeTopic {...props} />
		<UseCTAParameterActionsTopic {...props} />
		<UseCTAReturnValuesTopic {...props} />
	</>;
}
