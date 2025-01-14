import { useCTAParameterCreateFuncConfig, } from '../nav-sidebar/config/use-cta-parameter-create-func-config';
import PopoverUseCTAParameterCreateFunc from '../popover/UseCTAParameterCreateFunc';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function CreateFuncLink() {
	return <>
		<Anchor
			aria-label={useCTAParameterCreateFuncConfig.title}
			href={useCTAParameterCreateFuncConfig.href}>
			<Code>createFunc</Code>
		</Anchor>
		<PopoverUseCTAParameterCreateFunc />
	</>;
}
