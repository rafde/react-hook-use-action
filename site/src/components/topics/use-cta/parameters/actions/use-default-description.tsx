import Code from '../../../../ui/code';

export default function UseDefaultDescription( props: { actionTypeName: string }, ) {
	return <div>
		<Code>{'{ useDefault: true }'}</Code>
		{' '}
		will bypass the overridden
		{' '}
		<Code>{props.actionTypeName}</Code>
		{' '}
		action behavior.
	</div>;
}
