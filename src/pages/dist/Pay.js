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
var react_stripe_checkout_1 = require("react-stripe-checkout");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var axios = require('axios');
var key = "pk_test_51JhcbKD8fwNdDWK1YUrWJ3GbRBPJ8z9wawGTknJ93qTbdszHxGP4zcKXPAsAjOsyOr5DCojDHVJvwmn00Rrl9PSR00io27Q0rO";
function Pay() {
    var _this = this;
    var _a = react_1.useState(null), stripeToken = _a[0], setStripeToken = _a[1];
    var _b = react_1.useState(), message = _b[0], setMessage = _b[1];
    var onToken = function (token) {
        setStripeToken(token);
    };
    react_1.useEffect(function () {
        var makeRequest = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.post("http://localhost:3000/api/checkout/payment", {
                                tokenId: stripeToken.id,
                                amount: 200
                            })];
                    case 1:
                        res = _a.sent();
                        console.log(res.data.status, "//////////////////");
                        setMessage(res.data.status);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        stripeToken && makeRequest();
    }, [stripeToken]);
    react_1.useEffect(function () {
        if (message) {
            react_toastify_1.toast("your payment is " + message);
        }
    }, [message]);
    return (react_1["default"].createElement("div", { className: "h-screen w-full flex flex-col items-center justify-center " },
        react_1["default"].createElement("h1", null, "Choose any subscription and use this app"),
        react_1["default"].createElement(react_stripe_checkout_1["default"], { image: "https://happybirthdaycakepic.com/pic-preview/Ameer%20Hamza/80/blue-stars-birthday-cake-for-Ameer%20Hamza.jpg", name: "Kashif Soft dev", billingAddress: true, shippingAddress: true, amount: 200, token: onToken, stripeKey: key },
            react_1["default"].createElement("button", { className: " bg-blue-600 " }, "Pay money")),
        react_1["default"].createElement(react_toastify_1.ToastContainer, null)));
}
exports["default"] = Pay;
