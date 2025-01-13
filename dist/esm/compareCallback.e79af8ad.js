import {strictDeepEqual as $69Nfk$strictDeepEqual} from "fast-equals";


function $ae55f4861d2c7e56$export$2e2bcd8739ae039(compare) {
    if (typeof compare !== 'function') return function cmp(previousValue, nextValue) {
        return (0, $69Nfk$strictDeepEqual)(previousValue, nextValue);
    };
    return function cmp(previousValue, nextValue, key) {
        return Boolean(compare(previousValue, nextValue, {
            cmp: (0, $69Nfk$strictDeepEqual),
            key: key
        }));
    };
}


export {$ae55f4861d2c7e56$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=compareCallback.e79af8ad.js.map
