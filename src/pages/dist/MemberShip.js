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
var react_1 = require("react");
var subs_png_1 = require("../services/subs.png");
var firebase_1 = require("firebase");
var react_router_1 = require("react-router");
var app_context_1 = require("../context/app-context");
var firestore_config_1 = require("../services/firestore.config");
var util_1 = require("../helpers/util");
var react_stripe_checkout_1 = require("react-stripe-checkout");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var axios = require('axios');
var key = "pk_test_51JhcbKD8fwNdDWK1YUrWJ3GbRBPJ8z9wawGTknJ93qTbdszHxGP4zcKXPAsAjOsyOr5DCojDHVJvwmn00Rrl9PSR00io27Q0rO";
function MemberShip() {
    var _this = this;
    var auth = react_1.useContext(app_context_1.AppContext).auth;
    var history = react_router_1.useHistory();
    var _a = react_1.useState(''), style1 = _a[0], setStyle1 = _a[1];
    var _b = react_1.useState(''), style2 = _b[0], setStyle2 = _b[1];
    var _c = react_1.useState(), message = _c[0], setMessage = _c[1];
    var _d = react_1.useState(''), style3 = _d[0], setStyle3 = _d[1];
    var _e = react_1.useState(''), style4 = _e[0], setStyle4 = _e[1];
    var _f = react_1.useState(), freeMember = _f[0], setFreeMember = _f[1];
    var _g = react_1.useState(), monthlyMember = _g[0], setMontlyhMember = _g[1];
    var _h = react_1.useState(), yearlyMember = _h[0], setYearlyMember = _h[1];
    var _j = react_1.useState(), halfYearMember = _j[0], setHalfYearMember = _j[1];
    var _k = react_1.useState(), price = _k[0], setPrice = _k[1];
    var _l = react_1.useState(), monthly = _l[0], setMonthly = _l[1];
    var _m = react_1.useState(), yearly = _m[0], setYearly = _m[1];
    var _o = react_1.useState(), halfyear = _o[0], setHalfYear = _o[1];
    var _p = react_1.useState(), Free = _p[0], setFree = _p[1];
    var _q = react_1.useState(null), stripeToken = _q[0], setStripeToken = _q[1];
    var freePlan = function () {
        setStyle1('border-4 border-yellow-700    ');
        setStyle2('');
        setStyle3('');
        setStyle4('');
        setFreeMember(__assign({}, util_1.free()));
        setFree(true);
        setMonthly(false);
        setYearly(false);
        setHalfYear(false);
    };
    var monthlyPlan = function () {
        setStyle2('border-4 border-yellow-700 h-full flex items-center flex-col justify-center');
        setStyle3('');
        setStyle4('');
        setStyle1('');
        setMontlyhMember(__assign({}, util_1.Monthly()));
        setMonthly(true);
        setYearly(false);
        setFree(false);
        setHalfYear(false);
        setPrice(100);
    };
    var yearlyPlan = function () {
        setStyle3('border-4 border-yellow-700 h-full flex items-center flex-col justify-center ');
        setStyle2('');
        setStyle4('');
        setStyle1('');
        setYearlyMember(__assign({}, util_1.Yearly()));
        setYearly(true);
        setFree(false);
        setMonthly(false);
        setHalfYear(false);
        setPrice(500);
    };
    var halfYearPlan = function () {
        setStyle4('border-4 border-yellow-700 h-full flex items-center flex-col justify-center');
        setStyle3('');
        setStyle2('');
        setStyle1('');
        setHalfYearMember(__assign({}, util_1.halfYear()));
        setYearly(false);
        setFree(false);
        setMonthly(false);
        setHalfYear(true);
        setPrice(250);
    };
    var submit_subscription = function () {
        var _a, _b, _c, _d;
        var _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (!monthly === true && !yearly === true && !Free === true && !halfyear === true) {
            react_toastify_1.toast.error('🦄 please select any plan to proceed', {
                position: "top-center",
                autoClose: false,
                closeOnClick: true
            });
        }
        else {
            if (((_f = (_e = firebase_1["default"].auth().currentUser) === null || _e === void 0 ? void 0 : _e.providerData[0]) === null || _f === void 0 ? void 0 : _f.uid) === auth.user.uid && Free === true) {
                firestore_config_1.db.collection("membership").doc((_h = (_g = firebase_1["default"].auth().currentUser) === null || _g === void 0 ? void 0 : _g.providerData[0]) === null || _h === void 0 ? void 0 : _h.uid).set((_a = {},
                    _a[auth.user.uid] = freeMember,
                    _a));
                // history.push('/naaps')
            }
            else if (monthly === true) {
                firestore_config_1.db.collection('membership').doc((_k = (_j = firebase_1["default"].auth().currentUser) === null || _j === void 0 ? void 0 : _j.providerData[0]) === null || _k === void 0 ? void 0 : _k.uid).set((_b = {},
                    _b[auth.user.uid] = monthlyMember,
                    _b));
                // history.push('/naaps')
            }
            else if (yearly === true) {
                firestore_config_1.db.collection("membership").doc((_m = (_l = firebase_1["default"].auth().currentUser) === null || _l === void 0 ? void 0 : _l.providerData[0]) === null || _m === void 0 ? void 0 : _m.uid).set((_c = {},
                    _c[auth.user.uid] = yearlyMember,
                    _c));
                // history.push('/naaps')
            }
            else if (halfyear === true) {
                firestore_config_1.db.collection('membership').doc((_p = (_o = firebase_1["default"].auth().currentUser) === null || _o === void 0 ? void 0 : _o.providerData[0]) === null || _p === void 0 ? void 0 : _p.uid).set((_d = {},
                    _d[auth.user.uid] = halfYearMember,
                    _d));
            }
        }
        console.log((_r = (_q = firebase_1["default"].auth().currentUser) === null || _q === void 0 ? void 0 : _q.providerData[0]) === null || _r === void 0 ? void 0 : _r.uid);
    };
    var onToken = function (token) {
        setStripeToken(token);
    };
    /// stripe payment effect and function
    react_1.useEffect(function () {
        var makeRequest = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.post("http://localhost:3000/api/checkout/payment", {
                                tokenId: stripeToken.id,
                                amount: price
                            })];
                    case 1:
                        res = _a.sent();
                        console.log(res, "//////////////////");
                        setMessage(res.data.status);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        stripeToken && makeRequest();
    }, [stripeToken]);
    // for giving message for sucess payment 
    react_1.useEffect(function () {
        if (message) {
            react_toastify_1.toast.success("\uD83E\uDD84 congrdulation your plan is updated " + message + "!");
        }
    }, [message]);
    react_1.useEffect(function () {
        setStyle4('border border-yellow-700 h-full flex-col flex items-center justify-center');
    }, []);
    return (react_1["default"].createElement("div", { className: " space-x-4   pt-24 h-screen w-full" },
        react_1["default"].createElement("img", { className: "w-32 absolute top-10  left-32 ", src: subs_png_1["default"], alt: subs_png_1["default"] }),
        react_1["default"].createElement("h1", { className: "w-full text-center font-bold relative text-2xl top-8 text-blue-600" }, "upgrade to premium"),
        react_1["default"].createElement("div", { onClick: freePlan, className: style1 + " w-11/12 mx-auto relative bottom-20  mt-32 flex  rounded-md capitalize  py-1 text-center  items-center justify-evenly shadow-xl bg-white" },
            react_1["default"].createElement("h1", { className: " " + (Free ? "  relative text-yellow-700  text-xl font-bold" : "text-yellow-700 text-xl font-bold") + " " }, "Free"),
            react_1["default"].createElement("h2", { className: "text-2xl font-semibold font-helvetica text-red-400" }, "0 Rs"),
            react_1["default"].createElement("p", { className: "w-24 text-xl font-helvetica text-center" }, "free for 1 week")),
        react_1["default"].createElement("div", { className: "flex justify-center relative bottom-12  items-center space-x-2  h-1/4 w-11/12 mx-auto" },
            react_1["default"].createElement("div", { onClick: monthlyPlan, className: " " + style2 + " W-12   space-y-2 rounded-md capitalize px-1 py-2 text-center h-11/12  shadow-xl bg-white" },
                react_1["default"].createElement("h1", { className: " " + (monthly ? "bg-blue-600 text-white w-full  relative  text-xl font-bold" : "text-yellow-700 text-xl font-bold") + " " }, "1 Month"),
                react_1["default"].createElement("h2", { className: "text-2xl font-semibold font-helvetica text-red-400" }, "100 Rs"),
                react_1["default"].createElement("p", { className: "w-24  text-center" }, "Use for 1 Month")),
            react_1["default"].createElement("div", { onClick: halfYearPlan, className: " " + style4 + " W-12   space-y-2 rounded-md capitalize px-1 py-2  text-center  h-11/12 shadow-xl bg-white" },
                react_1["default"].createElement("h1", { className: " " + (halfyear ? "bg-blue-600 w-full text-white  relative  text-xl font-bold" : "text-yellow-700 text-xl font-bold") + " " }, "6 Month"),
                react_1["default"].createElement("h2", { className: "text-2xl font-semibold font-helvetica text-red-400" }, "300 Rs"),
                react_1["default"].createElement("p", { className: "w-24  text-center" }, "Use for 6 Month")),
            react_1["default"].createElement("div", { onClick: yearlyPlan, className: " " + style3 + "  W-12  space-y-2 rounded-md capitalize px-1 py-2 text-center  h-11/12 shadow-xl bg-white" },
                react_1["default"].createElement("h1", { className: " " + (yearly ? "bg-blue-600  w-full text-center text-white  relative  text-xl font-bold" : "text-yellow-700 text-xl font-bold") + " " }, "Yearly"),
                react_1["default"].createElement("h2", { className: "text-2xl  font-semibold font-helvetica text-red-400" }, "600 Rs"),
                react_1["default"].createElement("p", { className: "w-24 font-center text-center" }, "User for 1 Year"))),
        react_1["default"].createElement(react_stripe_checkout_1["default"], { image: "https://happybirthdaycakepic.com/pic-preview/Ameer%20Hamza/80/blue-stars-birthday-cake-for-Ameer%20Hamza.jpg", name: "" + (!monthly === true && !yearly === true && !Free === true && !halfyear === true ? "please select any plan from app" : "Kashif tech Lead"), billingAddress: true, shippingAddress: true, amount: price, token: onToken, stripeKey: key },
            react_1["default"].createElement("button", { onClick: submit_subscription, className: "w-11/12 relative bottom-4  bg-yellow-700 text-white font-semibold text-xl rounded-md h-14 " }, "Continue")),
        react_1["default"].createElement("div", { className: "w-11/12 h-32  text-center" },
            react_1["default"].createElement("h2", { className: "text-xl font-bold " }, "when will i be billed?"),
            react_1["default"].createElement("h3", { className: "mt-3" }, "you will billed when you select any plan and pay cash via jazzcash or easypaisa")),
        react_1["default"].createElement(react_toastify_1.ToastContainer, { closeOnClick: true, autoClose: false })));
}
exports["default"] = MemberShip;
