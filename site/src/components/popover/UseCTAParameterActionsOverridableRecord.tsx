'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsOverridableRecord() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'UseCTAParameterActionsOverridable', ), );
	return <PopoverTypes className="max-w-[455px]" aria-label="default actions record">
		{sourceCode}
	</PopoverTypes>;
}
