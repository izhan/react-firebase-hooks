import { useMemo, useReducer, useEffect, useRef } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var snapshotToData = function (snapshot, snapshotOptions, idField, refField) {
    if (!snapshot.exists) {
        return undefined;
    }
    return __assign({}, snapshot.data(snapshotOptions), (idField ? (_a = {}, _a[idField] = snapshot.id, _a) : null), (refField ? (_b = {}, _b[refField] = snapshot.ref, _b) : null));
    var _a, _b;
};

var defaultState = function (defaultValue) {
    return {
        loading: defaultValue === undefined || defaultValue === null,
        value: defaultValue,
    };
};
var reducer = function () { return function (state, action) {
    switch (action.type) {
        case 'error':
            return __assign({}, state, { error: action.error, loading: false, value: undefined });
        case 'reset':
            return defaultState(action.defaultValue);
        case 'value':
            return __assign({}, state, { error: undefined, loading: false, value: action.value });
        default:
            return state;
    }
}; };
var useLoadingValue = (function (getDefaultValue) {
    var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    var _a = useReducer(reducer(), defaultState(defaultValue)), state = _a[0], dispatch = _a[1];
    var reset = function () {
        var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
        dispatch({ type: 'reset', defaultValue: defaultValue });
    };
    var setError = function (error) {
        dispatch({ type: 'error', error: error });
    };
    var setValue = function (value) {
        dispatch({ type: 'value', value: value });
    };
    return useMemo(function () { return ({
        error: state.error,
        loading: state.loading,
        reset: reset,
        setError: setError,
        setValue: setValue,
        value: state.value,
    }); }, [
        state.error,
        state.loading,
        reset,
        setError,
        setValue,
        state.value,
    ]);
});

var useComparatorRef = function (value, isEqual, onChange) {
    var ref = useRef(value);
    useEffect(function () {
        if (!isEqual(value, ref.current)) {
            ref.current = value;
            if (onChange) {
                onChange();
            }
        }
    });
    return ref;
};
var isEqual = function (v1, v2) {
    var bothNull = !v1 && !v2;
    var equal = !!v1 && !!v2 && v1.isEqual(v2);
    return bothNull || equal;
};
var useIsEqualRef = function (value, onChange) {
    return useComparatorRef(value, isEqual, onChange);
};

var useCollection = function (query, options) {
    return useCollectionInternal(true, query, options);
};
var useCollectionOnce = function (query, options) {
    return useCollectionInternal(false, query, options);
};
var useCollectionData = function (query, options) {
    return useCollectionDataInternal(true, query, options);
};
var useCollectionDataOnce = function (query, options) {
    return useCollectionDataInternal(false, query, options);
};
var useCollectionInternal = function (listen, query, options) {
    var _a = useLoadingValue(), error = _a.error, loading = _a.loading, reset = _a.reset, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    var ref = useIsEqualRef(query, reset);
    useEffect(function () {
        if (!ref.current) {
            setValue(undefined);
            return;
        }
        if (listen) {
            var listener_1 = options && options.snapshotListenOptions
                ? ref.current.onSnapshot(options.snapshotListenOptions, setValue, setError)
                : ref.current.onSnapshot(setValue, setError);
            return function () {
                listener_1();
            };
        }
        else {
            ref.current
                .get(options ? options.getOptions : undefined)
                .then(setValue)
                .catch(setError);
        }
    }, [ref.current]);
    var resArray = [
        value,
        loading,
        error,
    ];
    return useMemo(function () { return resArray; }, resArray);
};
var useCollectionDataInternal = function (listen, query, options) {
    var idField = options ? options.idField : undefined;
    var refField = options ? options.refField : undefined;
    var snapshotOptions = options ? options.snapshotOptions : undefined;
    var _a = useCollectionInternal(listen, query, options), snapshots = _a[0], loading = _a[1], error = _a[2];
    var values = useMemo(function () {
        return (snapshots
            ? snapshots.docs.map(function (doc) {
                return snapshotToData(doc, snapshotOptions, idField, refField);
            })
            : undefined);
    }, [snapshots, idField, refField]);
    var resArray = [
        values,
        loading,
        error,
    ];
    return useMemo(function () { return resArray; }, resArray);
};

var useDocument = function (docRef, options) {
    return useDocumentInternal(true, docRef, options);
};
var useDocumentOnce = function (docRef, options) {
    return useDocumentInternal(false, docRef, options);
};
var useDocumentData = function (docRef, options) {
    return useDocumentDataInternal(true, docRef, options);
};
var useDocumentDataOnce = function (docRef, options) {
    return useDocumentDataInternal(false, docRef, options);
};
var useDocumentInternal = function (listen, docRef, options) {
    var _a = useLoadingValue(), error = _a.error, loading = _a.loading, reset = _a.reset, setError = _a.setError, setValue = _a.setValue, value = _a.value;
    var ref = useIsEqualRef(docRef, reset);
    useEffect(function () {
        if (!ref.current) {
            setValue(undefined);
            return;
        }
        if (listen) {
            var listener_1 = options && options.snapshotListenOptions
                ? ref.current.onSnapshot(options.snapshotListenOptions, setValue, setError)
                : ref.current.onSnapshot(setValue, setError);
            return function () {
                listener_1();
            };
        }
        else {
            ref.current
                .get(options ? options.getOptions : undefined)
                .then(setValue)
                .catch(setError);
        }
    }, [ref.current]);
    var resArray = [
        value,
        loading,
        error,
    ];
    return useMemo(function () { return resArray; }, resArray);
};
var useDocumentDataInternal = function (listen, docRef, options) {
    var idField = options ? options.idField : undefined;
    var refField = options ? options.refField : undefined;
    var snapshotOptions = options ? options.snapshotOptions : undefined;
    var _a = useDocumentInternal(listen, docRef, options), snapshot = _a[0], loading = _a[1], error = _a[2];
    var value = useMemo(function () {
        return (snapshot
            ? snapshotToData(snapshot, snapshotOptions, idField, refField)
            : undefined);
    }, [snapshot, idField, refField]);
    var resArray = [
        value,
        loading,
        error,
    ];
    return useMemo(function () { return resArray; }, resArray);
};

export { useCollection, useCollectionOnce, useCollectionData, useCollectionDataOnce, useDocument, useDocumentData, useDocumentOnce, useDocumentDataOnce };
