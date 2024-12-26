'use client';
import { Code, } from 'lucide-react';
import { ReactNode, useCallback, useEffect, useRef, useState, } from 'react';

type ExampleDetailsProps = {
	summary: ReactNode
	src: string
	title: string
};

export default function ExampleDetails( props: ExampleDetailsProps, ) {
	const {
		summary,
		src,
		title,
	} = props;
	const [
		isOpen,
		setIsOpen,
	] = useState( false, );
	const openRef = useRef( isOpen, );
	const onClick = useCallback( () => {
		setIsOpen( isOpen => !isOpen, );
	}, [], );
	useEffect( () => {
		if ( isOpen ) {
			openRef.current = true;
		}
	}, [isOpen,], );

	return <details className="pb-2" open={isOpen} onClick={onClick}>
		<summary className="cursor-pointer py-2">
			<div className="inline-flex grow flex-row items-start gap-2 pl-2 text-lg">
				<p className="font-extrabold">{summary}</p>
				{' '}
				<Code size="1rem" />
			</div>
		</summary>
		{openRef.current && <iframe
			src={src}
			className="h-[500px] w-full overflow-hidden rounded-s border-0"
			title={title}
			allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
			sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
		/>}
	</details>;
}
