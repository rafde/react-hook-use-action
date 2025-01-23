const frozenObj = Object.freeze( Object.create( null, ), );

export default function createFrozenObj<T,>() {
	return frozenObj as T;
}
