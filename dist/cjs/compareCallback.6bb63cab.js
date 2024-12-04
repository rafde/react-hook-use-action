var $fACw7$fastequals = require("fast-equals");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "compareCallback", () => $56455aab2d865ec7$export$29227ec4dc2b4d64);

function $56455aab2d865ec7$export$29227ec4dc2b4d64(compare) {
    if (typeof compare !== 'function') return 0, $fACw7$fastequals.strictDeepEqual;
    return function cmp(previousValue, nextValue) {
        return Boolean(compare(previousValue, nextValue, (0, $fACw7$fastequals.strictDeepEqual)));
    };
}


//# sourceMappingURL=compareCallback.6bb63cab.js.map
