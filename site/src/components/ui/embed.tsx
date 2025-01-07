export default function Embed( props: {
	src: string
	title: string
}, ) {
	return <iframe
		src={props.src}
		className="h-[500px] w-full overflow-hidden rounded-s border-0"
		title={props.title}
		allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
		sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
	/>;
}
