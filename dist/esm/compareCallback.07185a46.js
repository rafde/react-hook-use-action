import {strictDeepEqual as $69Nfk$strictDeepEqual} from "fast-equals";


function $ae55f4861d2c7e56$export$29227ec4dc2b4d64(compare) {
    if (typeof compare !== 'function') return 0, $69Nfk$strictDeepEqual;
    return function cmp(previousValue, nextValue) {
        return Boolean(compare(previousValue, nextValue, (0, $69Nfk$strictDeepEqual)));
    };
}


export {$ae55f4861d2c7e56$export$29227ec4dc2b4d64 as compareCallback};
//# sourceMappingURL=compareCallback.07185a46.js.map
