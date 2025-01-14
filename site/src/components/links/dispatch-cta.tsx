import PopoverDispatchCTABuiltIn from '../popover/DispatchCTABuiltIn';
import PopoverDispatchCTACustomActions from '../popover/DispatchCTACustomActions';
import Code from '../ui/code';

export default function DispatchCTALink() {
	return <>
		<Code>dispatch.cta</Code>
		<PopoverDispatchCTABuiltIn />
		<PopoverDispatchCTACustomActions />
	</>;
}
