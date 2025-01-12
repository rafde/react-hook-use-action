import {
	useCTAParameterAfterActionChangeConfig, useCTAParameterCompareConfig,
	useCTAParameterInitialConfig, useCTAParameterTransformConfig,
} from '../../../../nav-sidebar/config/use-cta-config';
import PopoverCTAState from '../../../../popover/ctaState';
import PopoverUseCTAParameterAfterActionChange from '../../../../popover/UseCTAParameterAfterActionChange';
import PopoverUseCTAParameterCompare from '../../../../popover/UseCTAParameterCompare';
import PopoverUseCTAParameterTransform from '../../../../popover/UseCTAParameterTransform';
import Anchor from '../../../../ui/anchor';
import Code from '../../../../ui/code';

export default function UseCTAParameterCommonLi() {
	return <>
		<li>
			<Anchor href={useCTAParameterInitialConfig.href} aria-label={useCTAParameterInitialConfig.title}>
				<Code>initial</Code>
			</Anchor>
			{' '}
			<PopoverCTAState />
		</li>
		<li>
			<Anchor href={useCTAParameterCompareConfig.href} aria-label={useCTAParameterCompareConfig.title}>
				<Code>compare</Code>
			</Anchor>
			{' '}
			<PopoverUseCTAParameterCompare />
		</li>
		<li>
			<Anchor
				href={useCTAParameterAfterActionChangeConfig.href}
				aria-label={useCTAParameterAfterActionChangeConfig.title}>
				<Code>afterActionChange</Code>
			</Anchor>
			{' '}
			<PopoverUseCTAParameterAfterActionChange />
		</li>
		<li>
			<Anchor href={useCTAParameterTransformConfig.href} aria-label={useCTAParameterTransformConfig.title}>
				<Code>transform</Code>
			</Anchor>
			{' '}
			<PopoverUseCTAParameterTransform />
		</li>
	</>;
}
