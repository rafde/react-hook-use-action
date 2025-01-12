'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverDispatchCTACustomActions() {
	const sourceCode = useSourceCode( ( { dispatch, }, ) => dispatch.func.getSourceCode( 'DispatchCTACustomActions', ), );
	return <PopoverTypes className="max-w-[625px]" aria-label="Dispatch CTA Custom Actions">
		{sourceCode}
	</PopoverTypes>;
}
