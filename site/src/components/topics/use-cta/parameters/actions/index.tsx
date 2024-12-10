import { SourceCodeRecordProps, } from '../../../../../types/source-code-record-props';
import {
	useCTAParameterActionsConfig,
} from '../../../../nav-sidebar/config/use-cta-config';
import { useCTAReturnValues1DispatchConfig, } from '../../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverDefaultActionsRecord from '../../../../popover/defaultActionsRecord';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';
import Content from '../../../../ui/content';
import Sect from '../../../../ui/sect';
import UseCTAParameterActionsCustomTopic from './UseCTAParameterActionsCustom';
import UseCTAParameterActionsOverridableTopic from './UseCTAParameterActionsOverridable';

export default function UseCTAParameterActionsTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAParameterActionsConfig}>
			<Content>
				<p>
					<i>Optional</i>
					{' '}
					<Code>Record</Code>
					{' '}
					with the following capabilities:
				</p>

				<ul className="list-inside list-[square]">
					<li>
						Gives you a clean, type-safe way to encapsulate your state logic while keeping your component code focused
						on presentation.
					</li>
					<li>Defines reusable state operations</li>
					<li>Maintains full TypeScript type safety</li>
					<li>
						Can be called via
						{' '}
						<Anchor href={useCTAReturnValues1DispatchConfig.href} aria-label={`Link to ${useCTAReturnValues1DispatchConfig.title} section`}>
							<Code>dispatch.cta</Code>
							{' '}
							or
							{' '}
							<Code>dispatch</Code>
						</Anchor>
					</li>
					<li>
						Can override the built-in
						{' '}
						<Code>actions</Code>
						{' '}
						<PopoverDefaultActionsRecord {...props} />
					</li>
					<li>Can accept multiple parameters</li>
					<li>
						Has access all built-in actions.
					</li>
				</ul>
			</Content>
		</Sect>

		<UseCTAParameterActionsOverridableTopic {...props} />

		<UseCTAParameterActionsCustomTopic {...props} />
	</>;
}
