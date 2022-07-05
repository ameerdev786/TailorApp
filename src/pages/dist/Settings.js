"use strict";
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
var react_1 = require("react");
var icons_1 = require("ionicons/icons");
var react_2 = require("@ionic/react");
var util_1 = require("../helpers/util");
var types_1 = require("../types");
var firestore_config_1 = require("../services/firestore.config");
var last_gif_1 = require("../services/last.gif");
var IconButton_1 = require("../components/IconButton");
var Settings = function () {
    var _a = react_1.useState(''), Name = _a[0], setTailorName = _a[1];
    var _b = react_1.useState(false), showInput = _b[0], setShowInput = _b[1];
    var _c = react_1.useState(false), showAdress = _c[0], setShowAdress = _c[1];
    var _d = react_1.useState(false), showPhone = _d[0], setShowPhone = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    var _f = react_1.useState(false), alert = _f[0], setAlert = _f[1];
    var _g = react_1.useState(''), adress = _g[0], setTailorAdress = _g[1];
    var _h = react_1.useState(), file = _h[0], setFile = _h[1];
    var _j = react_1["default"].useState(""), mobile = _j[0], setMobile = _j[1];
    var _k = react_1.useState([]), info = _k[0], setInfo = _k[1];
    var saving = util_1.useSaving();
    var id = [];
    info.map(function (item) { return id.push(item.id); });
    var onFileChange = function (e) {
        setFile(e.target.files[0]);
    };
    /// image upload
    var onUpload = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var storageRef, fileRef, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!!file) return [3 /*break*/, 1];
                    setAlert(true);
                    return [3 /*break*/, 8];
                case 1:
                    setAlert(false);
                    setLoading(true);
                    storageRef = firestore_config_1.storage.ref();
                    fileRef = storageRef.child(file.name);
                    return [4 /*yield*/, fileRef.put(file)];
                case 2:
                    _g.sent();
                    if (!(info.length > 0)) return [3 /*break*/, 4];
                    _b = (_a = firestore_config_1.db.collection(types_1.ECollection.tailorInfo).doc(id[0])).update;
                    _c = {};
                    return [4 /*yield*/, fileRef.getDownloadURL()];
                case 3:
                    _b.apply(_a, [(_c.banner = _g.sent(),
                            _c)]);
                    setFile('');
                    return [3 /*break*/, 7];
                case 4:
                    if (!(info.length < 0 || info.length === 0)) return [3 /*break*/, 6];
                    _e = (_d = firestore_config_1.db.collection(types_1.ECollection.tailorInfo)).add;
                    _f = {};
                    return [4 /*yield*/, fileRef.getDownloadURL()];
                case 5:
                    _e.apply(_d, [(_f.banner = _g.sent(),
                            _f)]);
                    setFile('');
                    return [3 /*break*/, 7];
                case 6: return [2 /*return*/];
                case 7:
                    setLoading(false);
                    _g.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var onUploadAdress = function () {
        if (info.length > 0) {
            firestore_config_1.db.collection(types_1.ECollection.tailorInfo).doc(id[0]).update({
                adress: adress
            });
            setTailorAdress('');
        }
        else if (info.length < 0 || info.length === 0) {
            firestore_config_1.db.collection(types_1.ECollection.tailorInfo).add({
                adress: adress
            });
            setTailorAdress('');
        }
        else {
            return;
        }
    };
    var onUploadName = function () {
        if (info.length > 0) {
            firestore_config_1.db.collection(types_1.ECollection.tailorInfo).doc(id[0]).update({
                tailorName: Name
            });
            setTailorName('');
        }
        else if (info.length < 0 || info.length === 0) {
            firestore_config_1.db.collection(types_1.ECollection.tailorInfo).add({
                tailorName: Name
            });
            setTailorName('');
        }
        else {
            return;
        }
    };
    var onUploadPhone = function () {
        if (info.length > 0) {
            firestore_config_1.db.collection(types_1.ECollection.tailorInfo).doc(id[0]).update({
                phone: mobile
            });
            setMobile('');
        }
        else if (info.length < 0 || info.length === 0) {
            firestore_config_1.db.collection(types_1.ECollection.tailorInfo).add({
                phone: mobile
            });
            setMobile('');
        }
        else {
            return;
        }
    };
    // validate value
    var numberHandler = function (val) {
        var validatedValue = val.replace(/[^0-9]/g, "");
        setMobile(validatedValue);
    };
    // get data form firebase firebase
    react_1.useEffect(function () {
        util_1.collectionSnapshot(types_1.ECollection.tailorInfo, (function (list) {
            setInfo(list);
        }));
    }, []);
    return (react_1["default"].createElement("div", { className: "w-full overflow-scroll flex items-center space-y-1  flex-col h-screen pb-24" }, info.map(function (item) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
        loading ? react_1["default"].createElement("img", { className: "w-20 absolute z-30 mt-8", src: last_gif_1["default"], alt: last_gif_1["default"] }) : "",
        react_1["default"].createElement("img", { key: item.id, src: item.banner, alt: item.banner, className: " " + (loading ? " rounded-full z-20 w-32 h-32 border-3 border-yellow-300 opacity-30" : "rounded-full z-20 w-32 h-32 border-3 border-yellow-300") + " " }),
        react_1["default"].createElement("label", { className: "" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.cameraOutline, className: "text-4xl relative z-30 bottom-8 text-blue-700 p-2 rounded-full bg-gray-50 left-9" }),
            react_1["default"].createElement("input", { onChange: onFileChange, type: "file", style: { display: "none" } })),
        react_1["default"].createElement("button", { className: "" + (alert ? "bg-yellow-600 w-24 relative z-30 bottom-7 text-white" : "bg-blue-500 w-24 relative z-30 bottom-7 text-white"), onClick: onUpload }, alert ? 'upload img' : 'upload'),
        react_1["default"].createElement("div", { className: "w-11/12  rounded-md items-center  flex" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.person, className: "text-3xl text-yellow-400 pl-4" }),
            react_1["default"].createElement("div", { className: "pl-8 flex flex-col justify-center  " },
                react_1["default"].createElement("p", { className: "font-bold  " }, "Name"),
                react_1["default"].createElement("h2", { className: "text-xl mb-4 capitalize" }, item.tailorName)),
            react_1["default"].createElement(react_2.IonIcon, { onClick: function () { return setShowInput(!showInput); }, icon: icons_1.brush, className: "text-2xl absolute right-8 text-gray-500  " })),
        react_1["default"].createElement("div", { className: "flex  w-11/12 items-center" },
            react_1["default"].createElement("input", { value: Name, type: "text", className: (showInput ? "text-center  capitalize  font-light text-lg w-11/12" : "text-center hidden capitalize mt-1 font-light text-lg w-11/12") + " ", onChange: function (e) { return setTailorName(e.target.value); }, placeholder: " save your Name" }),
            react_1["default"].createElement(IconButton_1.IconButton, { onClick: function () {
                    onUploadName();
                    setShowInput(false);
                }, value: "Save", className: (showInput ? 'bg-blue-600 py-1 ml-2 w-24 text-white' : 'hidden') + " ", saving: saving })),
        react_1["default"].createElement("div", { className: "w-11/12  rounded-md items-center  flex" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.informationCircleOutline, className: "text-4xl text-yellow-400 pl-4" }),
            react_1["default"].createElement("div", { className: "pl-8 flex flex-col justify-center  " },
                react_1["default"].createElement("p", { className: "font-bold  " }, "Adress"),
                react_1["default"].createElement("h2", { className: "text-xl mb-4 capitalize" }, item.adress)),
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.brush, onClick: function () { return setShowAdress(!showAdress); }, className: "text-2xl absolute right-8 text-gray-500  " })),
        react_1["default"].createElement("div", { className: "flex  w-11/12 items-center" },
            react_1["default"].createElement("input", { value: adress, type: "text", className: (showAdress ? "text-center  capitalize  font-light text-lg w-11/12" : "text-center hidden capitalize mt-1 font-light text-lg w-11/12") + " ", onChange: function (e) { return setTailorAdress(e.target.value); }, placeholder: "save adress" }),
            react_1["default"].createElement(IconButton_1.IconButton, { onClick: function () {
                    onUploadAdress();
                    setShowAdress(false);
                }, value: "Save", className: (showAdress ? 'bg-blue-600 ml-2 w-24 text-white' : 'hidden') + " ", saving: saving })),
        react_1["default"].createElement("div", { className: "w-11/12  rounded-md items-center  flex" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.callOutline, className: "text-4xl text-yellow-400 pl-4" }),
            react_1["default"].createElement("div", { className: "pl-8 flex flex-col justify-center  " },
                react_1["default"].createElement("p", { className: "font-bold  " }, "Phone"),
                react_1["default"].createElement("h2", { className: "text-xl  mb-4 capitalize" }, item.phone)),
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.brush, onClick: function () { return setShowPhone(!showPhone); }, className: "text-2xl absolute right-8 text-gray-500  " })),
        react_1["default"].createElement("div", { className: "flex  w-11/12 items-center" },
            react_1["default"].createElement("input", { value: mobile, type: "tel", className: (showPhone ? "text-center  capitalize  font-light text-lg w-11/12   " : "text-center hidden capitalize mt-1 font-light text-lg w-11/12") + " ", onChange: function (e) { return numberHandler(e.target.value); }, placeholder: "save your whatsapp" }),
            react_1["default"].createElement(IconButton_1.IconButton, { onClick: function () {
                    onUploadPhone();
                    setShowPhone(false);
                }, value: "Save", className: (showPhone ? 'bg-blue-600 ml-2 w-24 text-white' : 'hidden') + " ", saving: saving })))); })));
};
exports["default"] = Settings;
