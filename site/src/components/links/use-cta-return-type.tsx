import { exportTypesUseCTAReturnTypeConfig, } from '../nav-sidebar/config/export-types';
import PopoverUseCTAReturnType from '../popover/UseCTAReturnType';
import Anchor from '../ui/anchor';
import Code from '../ui/code';

export default function UseCTAReturnTypeLink() {
	return <>
		<Anchor
			href={exportTypesUseCTAReturnTypeConfig.href}
			aria-label={`Link to ${exportTypesUseCTAReturnTypeConfig.title} section`}>
			<Code>UseCTAReturnType</Code>
		</Anchor>
		<PopoverUseCTAReturnType />
	</>;
}
