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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
var moment_1 = require("moment");
var react_2 = require("react");
var react_router_1 = require("react-router");
var IconButton_1 = require("../components/IconButton");
var util_1 = require("../helpers/util");
var firestore_config_1 = require("../services/firestore.config");
var types_1 = require("../types");
function OrderForm() {
    var _this = this;
    var _a, _b;
    var _c = react_2.useState(__assign({}, util_1.createOrder())), order = _c[0], setOrder = _c[1];
    var _d = react_2.useState(__assign({}, util_1.createOrder())), savedOrder = _d[0], setSavedOrder = _d[1];
    var _e = react_2.useState([]), naaps = _e[0], setNaaps = _e[1];
    var _f = react_2.useState([]), images = _f[0], setImages = _f[1];
    var _g = react_2.useState(0), setTotalProgress = _g[1];
    var _h = react_2.useState([]), objectUrls = _h[0], setObjectUrls = _h[1];
    var _j = react_2.useState(null), refUploadInput = _j[0], setRef = _j[1];
    var getStatusColors = function () {
        if (types_1.EStatus.ready === order.status)
            return 'text-green-600';
        else if (types_1.EStatus.delivered === order.status)
            return 'text-gray-400';
    };
    var saving = util_1.useSaving();
    var query = util_1.useQueryParams();
    var history = react_router_1.useHistory();
    var onSetImage = function (e) {
        if (e.target.files.length !== 0) {
            setImages(Array.from(e.target.files));
            setOrder(__assign(__assign({}, order), { numberOfSuits: "" + e.target.files.length }));
        }
    };
    react_2.useEffect(function () {
        util_1.collectionSnapshot(types_1.ECollection.naaps, (function (list) {
            setNaaps(list);
            setOrder(__assign(__assign({}, order), { naap: list[0] }));
        }));
        if (query.id) {
            util_1.getDocById(types_1.ECollection.orders, query.id).then(function (resp) {
                var obj = __assign(__assign({}, resp), { dueDate: moment_1["default"](resp.dueDate).format('YYYY-MM-DD') });
                setSavedOrder(obj);
                setOrder(obj);
                setObjectUrls(obj.images);
            });
        }
    }, []);
    react_2.useEffect(function () {
        setObjectUrls(images.map(function (item) { return URL.createObjectURL(item); }));
    }, [images]);
    var startUpload = function (imageFile, callback) {
        if (callback === void 0) { callback = function (progress) { }; }
        return new Promise(function (resolve, reject) {
            var storageRef = firestore_config_1.storage.ref('clothes/' + imageFile.name);
            //Upload file
            var task = storageRef.put(imageFile);
            //Update progress bar
            task.on('state_changed', function progress(snapshot) {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                callback(percentage);
            }, function error(err) {
                reject(err);
            }, function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = resolve;
                            return [4 /*yield*/, storageRef.getDownloadURL()];
                        case 1:
                            _a.apply(void 0, [_b.sent()]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    var handleOnChange = function (key, value) {
        var _a;
        setOrder(__assign(__assign({}, order), (_a = {}, _a[key] = value, _a)));
    };
    var onSaveOrder = function () { return __awaiter(_this, void 0, void 0, function () {
        var progress_1, promises, urls, resp;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    saving.start();
                    if (!(query && query.id)) return [3 /*break*/, 2];
                    return [4 /*yield*/, firestore_config_1.db.collection(types_1.ECollection.orders).doc(query.id).set(__assign({}, util_1.createDoc(order, 'dueDate', true)))];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 2:
                    progress_1 = 0;
                    promises = images.map(function (image) { return startUpload(image, function (imageProgress) {
                        progress_1 += imageProgress;
                        setTotalProgress(Math.round(progress_1 / images.length));
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 3:
                    urls = _c.sent();
                    return [4 /*yield*/, firestore_config_1.db.collection(types_1.ECollection.orders).add(__assign(__assign({}, util_1.createDoc(order, 'dueDate')), { images: urls }))];
                case 4:
                    resp = _c.sent();
                    return [4 /*yield*/, util_1.updateDoc(types_1.ECollection.naaps, (_a = order.naap) === null || _a === void 0 ? void 0 : _a.id, {
                            relatedOrdersIds: __spreadArrays((_b = order.naap) === null || _b === void 0 ? void 0 : _b.relatedOrdersIds, [resp.id])
                        })];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    saving.stop();
                    history.push('/orders');
                    return [2 /*return*/];
            }
        });
    }); };
    var onClickUploadButton = function () {
        refUploadInput && refUploadInput.click();
    };
    var caculateRemaining = function (total, paid) {
        order.remainingAmount = "" + (+total - +paid);
        return false;
    };
    return (react_2["default"].createElement("div", { className: "space-y-2 card" },
        react_2["default"].createElement("div", { className: "w-full flex space-x-2 bg-skin-base rounded-t-xl" },
            react_2["default"].createElement("div", { className: "font-bold rounded w-2/5 h-12  px-2 inline-block text-skin-accent flex items-center justify-center" },
                react_2["default"].createElement("div", { className: "" },
                    "# ",
                    order.naap && order.naap.naapId ? order.naap.naapId : '--')),
            objectUrls && !objectUrls.length &&
                react_2["default"].createElement("div", { className: "bg-gray-100 flex rounded flex-grow p-2 px-4 text-center font-bold text-gray-600 ", onClick: function (e) { return onClickUploadButton(); } },
                    react_2["default"].createElement(react_1.IonIcon, { icon: icons_1.cameraOutline, className: "m-auto" })),
            react_2["default"].createElement("input", { hidden: true, type: "file", ref: function (input) { return setRef(input); }, className: "w-full", multiple: true, onChange: onSetImage }),
            objectUrls && objectUrls.length > 0 &&
                react_2["default"].createElement("div", { className: "flex -space-x-4 px-3 pt-1 h-12 rounded flex-grow justify-end ", onClick: function (e) { return onClickUploadButton(); } }, objectUrls && objectUrls.length > 0 && objectUrls.map(function (image, i) { return (react_2["default"].createElement("div", { key: i, className: "h-10 w-10 transform rounded-full border overflow-hidden" },
                    react_2["default"].createElement("img", { src: image, alt: "imagelocal", className: "h-12 w-12 object-cover" }))); }))),
        react_2["default"].createElement("div", { className: "flex w-full space-x-2" },
            react_2["default"].createElement("div", { className: "w-full" },
                react_2["default"].createElement("select", { className: "w-full", value: (_a = order.naap) === null || _a === void 0 ? void 0 : _a.id, onChange: function (_a) {
                        var value = _a.target.value;
                        return value && handleOnChange('naap', naaps.find(function (item) { return item.id === value; }));
                    } },
                    react_2["default"].createElement("option", null,
                        " Select Naap ", (_b = order.naap) === null || _b === void 0 ? void 0 :
                        _b.naapId,
                        " "),
                    naaps.map(function (item, i) { return (react_2["default"].createElement("option", { key: i, value: item.id }, item.customerName)); }))),
            react_2["default"].createElement("div", { className: "w-32" },
                react_2["default"].createElement("button", { onClick: function (e) { return history.push('/naap-form'); }, className: "w-full bg-skin-accent font-bold text-white flex items-center  justify-center" },
                    react_2["default"].createElement("div", { className: "mr-1" },
                        react_2["default"].createElement("img", { src: "assets/tape.png", className: "h-6", alt: "" })),
                    react_2["default"].createElement("div", null, "New")))),
        react_2["default"].createElement("div", { className: "flex space-x-2" },
            react_2["default"].createElement("div", { className: "w-1/2" },
                react_2["default"].createElement("label", null, "Date"),
                react_2["default"].createElement("input", { type: "date", className: "w-full", disabled: true, placeholder: "todayDate", value: moment_1["default"]().format('YYYY-MM-DD'), onChange: function (e) { return handleOnChange('createdDate', e.target.value); } })),
            react_2["default"].createElement("div", { className: "w-1/2" },
                react_2["default"].createElement("label", null, "Due Date"),
                react_2["default"].createElement("input", { type: "date", className: "w-full", value: order.dueDate, placeholder: "", onChange: function (e) {
                        return handleOnChange('dueDate', e.target.value);
                    } }))),
        react_2["default"].createElement("div", { className: "flex space-x-2" },
            react_2["default"].createElement("div", { className: "w-1/2" },
                react_2["default"].createElement("label", null, "Type of Cloth"),
                react_2["default"].createElement("select", { name: "", id: "", className: "w-full", onChange: function (e) { return handleOnChange('clothType', e.target.value); } },
                    react_2["default"].createElement("option", null, "Cloth"),
                    react_2["default"].createElement("option", null, "Waist-Coat"))),
            react_2["default"].createElement("div", { className: "w-1/2" },
                react_2["default"].createElement("label", null, "Number of Suits"),
                react_2["default"].createElement("input", { type: "number", name: "", id: "", value: order.numberOfSuits, className: "w-full", onChange: function (e) { return handleOnChange('numberOfSuits', e.target.value); } }))),
        react_2["default"].createElement("div", { className: "flex space-x-2" },
            react_2["default"].createElement("div", { className: "w-1/3" },
                react_2["default"].createElement("label", null, "Total Amount"),
                react_2["default"].createElement("input", { className: "w-full", type: "number", value: order.totalAmount, name: "", id: "", onChange: function (e) {
                        return handleOnChange('totalAmount', caculateRemaining(e.target.value, order.paidAmount) || e.target.value);
                    } })),
            react_2["default"].createElement("div", { className: "w-1/3" },
                react_2["default"].createElement("label", null, "Paid Amount"),
                react_2["default"].createElement("input", { className: "w-full", type: "number", value: order.paidAmount, name: "", id: "", onChange: function (e) {
                        return handleOnChange('paidAmount', caculateRemaining(order.totalAmount, e.target.value) || e.target.value);
                    } })),
            react_2["default"].createElement("div", { className: "w-1/2" },
                react_2["default"].createElement("label", null, "Remaining Amount"),
                react_2["default"].createElement("input", { className: "w-full", disabled: true, type: "number", value: order.remainingAmount, name: "", id: "" }))),
        react_2["default"].createElement("div", { className: "flex space-x-4" },
            react_2["default"].createElement("div", { className: "w-full" },
                react_2["default"].createElement("select", { className: getStatusColors(), value: savedOrder.status, onChange: function (e) { return handleOnChange('status', e.target.value); } },
                    react_2["default"].createElement("option", { value: types_1.EStatus.inprogress }, types_1.EStatus.inprogress),
                    react_2["default"].createElement("option", { value: types_1.EStatus.ready }, types_1.EStatus.ready),
                    react_2["default"].createElement("option", { value: types_1.EStatus.delivered }, types_1.EStatus.delivered))),
            react_2["default"].createElement(IconButton_1.IconButton, { onClick: onSaveOrder, value: "Save", saving: saving }))));
}
exports["default"] = OrderForm;
