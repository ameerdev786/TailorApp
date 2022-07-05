"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getWindow = exports.isMatched = exports.format = exports.useToggle = exports.tailorData = exports.halfYear = exports.Yearly = exports.Monthly = exports.free = exports.createOrder = exports.createNaap = exports.createUser = exports.createSize = exports.useSaving = exports.useQueryParams = exports.getDocById = exports.updateDoc = exports.addDoc = exports.setDoc = exports.collectionSnapshot = exports.createDoc = void 0;
var moment_1 = require("moment");
var react_1 = require("react");
var firestore_config_1 = require("../services/firestore.config");
var types_1 = require("../types");
var lodash_1 = require("lodash");
exports.createDoc = function (doc, dateKey, isUpdate) {
    var _a;
    if (dateKey === void 0) { dateKey = null; }
    if (isUpdate === void 0) { isUpdate = false; }
    if (dateKey) {
        return __assign(__assign({}, doc), (_a = { createdDate: isUpdate ? new Date(doc.createdDate).getTime() : Date.now(), updatedDate: Date.now() }, _a[dateKey] = new Date(doc[dateKey]).getTime(), _a));
    }
    else {
        return __assign(__assign({}, doc), { createdDate: isUpdate ? new Date(doc.createdDate).getTime() : Date.now(), updatedDate: Date.now() });
    }
};
// ======================== Firestore Uitilites STARTED ==============================///
function collectionSnapshot(collectionName, callback) {
    firestore_config_1.db.collection(collectionName).onSnapshot(function (resp) {
        var list = resp.docs.map(function (item) { return (__assign(__assign({}, item.data()), { id: item.id })); });
        callback && callback(list);
    });
}
exports.collectionSnapshot = collectionSnapshot;
function setDoc(collectionName, id, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firestore_config_1.db.collection(collectionName).doc(id).set(data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.setDoc = setDoc;
function addDoc(collectionName, data, id) {
    if (id === void 0) { id = ""; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id) return [3 /*break*/, 2];
                    return [4 /*yield*/, firestore_config_1.db.collection(collectionName).doc(id).set(data)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, firestore_config_1.db.collection(collectionName).add(data)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.addDoc = addDoc;
function updateDoc(collectionName, id, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, firestore_config_1.db.collection(collectionName).doc(id).update(data)];
        });
    });
}
exports.updateDoc = updateDoc;
function getDocById(collectionName, id) {
    return firestore_config_1.db
        .collection(collectionName)
        .doc(id)
        .get()
        .then(function (item) {
        var data = item.data();
        return __assign(__assign({}, data), { id: item.id, createdDate: moment_1["default"](data.createdDate).format("YYYY-MM-DD"), updatedDate: moment_1["default"](data.updatedDate).format("YYYY-MM-DD") });
    });
}
exports.getDocById = getDocById;
// ======================== Firestore Uitilites END ==============================///
exports.useQueryParams = function () {
    var queryList = window.location.search.split("?").filter(function (item) { return item; });
    var result = queryList.reduce(function (prev, curr) {
        var _a;
        var _b = curr.split("="), key = _b[0], value = _b[1];
        return __assign(__assign({}, prev), (_a = {}, _a[key] = value, _a));
    }, {});
    return result;
};
exports.useSaving = function () {
    var _a = react_1.useState(false), isSaving = _a[0], setSaving = _a[1];
    var start = function () { return setSaving(true); };
    var stop = function () { return setSaving(false); };
    return {
        isSaving: isSaving,
        start: start,
        stop: stop
    };
};
exports.createSize = function () {
    return {
        inch: "",
        fraction: ""
    };
};
exports.createUser = function () {
    return {
        type: types_1.UserType.tailor,
        uid: "",
        photoUrl: ""
    };
};
exports.createNaap = function () {
    return {
        naapId: "",
        lambai: exports.createSize(),
        bazoo: exports.createSize(),
        teera: exports.createSize(),
        kalar: exports.createSize(),
        chatee: exports.createSize(),
        geera: exports.createSize(),
        pancha: exports.createSize(),
        customerName: "",
        customerPhone: "",
        user: exports.createUser(),
        relatedOrdersIds: [],
        design: {}
    };
};
exports.createOrder = function () {
    return {
        id: "",
        naap: exports.createNaap(),
        dueDate: moment_1["default"]().add(7, "days").format("YYYY-MM-DD"),
        clothType: "Cloth",
        numberOfSuits: "1",
        totalAmount: "",
        remainingAmount: "",
        paidAmount: "",
        images: [],
        status: types_1.EStatus.inprogress
    };
};
exports.free = function () {
    return {
        membershipStatus: true,
        plan: 'Free',
        price: 0,
        startAt: '27 sep 2021',
        endAt: '4 oct 2021'
    };
};
exports.Monthly = function () {
    return {
        membershipStatus: true,
        plan: 'monthly',
        price: 100,
        startAt: '27 sep 2021',
        endAt: '27 oct 2021'
    };
};
exports.Yearly = function () {
    return {
        membershipStatus: true,
        plan: 'Yearly',
        price: 600,
        startAt: '27 sep 2021',
        endAt: '27 sep 2022'
    };
};
exports.halfYear = function () {
    return {
        membershipStatus: true,
        plan: '6 month',
        price: 300,
        startAt: '27 sep 2021',
        endAt: '27 feb 2022'
    };
};
exports.tailorData = function () {
    return {
        tailorName: "",
        banner: "",
        logo: "",
        id: "",
        phone: "",
        adress: ""
    };
};
exports.useToggle = function (value) {
    if (value === void 0) { value = false; }
    var _a = react_1.useState(value), isShow = _a[0], setShow = _a[1];
    var show = function () { return setShow(true); };
    var hide = function () { return setShow(false); };
    var toggle = function () { return setShow(!isShow); };
    return {
        isShow: isShow,
        setShow: setShow,
        show: show,
        hide: hide,
        toggle: toggle
    };
};
exports.format = function (date) {
    return moment_1["default"](date).format("dddd, DD/MM/YY");
};
exports.isMatched = function (item, path, searchTerm) {
    var value = lodash_1["default"].get(item, path, "").toLowerCase();
    var term = searchTerm.toLowerCase();
    return value.includes(term);
};
var InitiateSystemTemplates = function () {
    // const templates = require('./templates.json');
    // db.collection('templates').add(templates[0])
};
exports.getWindow = function () {
    return window;
};
