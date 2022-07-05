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
var firestore_service_1 = require("../services/firestore.service");
var react_router_dom_1 = require("react-router-dom");
var tailor1_png_1 = require("../services/tailor1.png");
function SignUp() {
    var _this = this;
    var _a = react_1.useState(''), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(''), password = _b[0], setPassword = _b[1];
    var history = react_router_dom_1.useHistory();
    var submit = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firestore_service_1.createUserWithEmailAndPassword(email, password)];
                case 1:
                    _a.sent();
                    setEmail('');
                    setPassword('');
                    history.push('/');
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: " pt-32 flex-col px-2 space-y-4 flex items-center content-center" },
        React.createElement("div", { className: "mb-24 flex items-center justify-center flex-col" },
            React.createElement("img", { className: "w-24", src: tailor1_png_1["default"], alt: tailor1_png_1["default"] }),
            React.createElement("h2", { className: "text-2xl font-semibold text-yellow-600" }, "Create Account")),
        React.createElement("input", { value: email, placeholder: ' Enter Email', className: "rounded-md text-center outline-none w-full py-4 focus:outline-none border border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent", type: "email", onChange: function (e) { return setEmail(e.target.value); } }),
        React.createElement("input", { value: password, placeholder: "Enter Password", className: "rounded-md text-center outline-none w-full py-4 focus:outline-none border border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent", type: "text", onChange: function (e) { return setPassword(e.target.value); } }),
        React.createElement("button", { type: "button", className: "bg-yellow-400 text-xl  w-1/2 outline-none text-yellow-700", onClick: submit }, "Create")));
}
exports["default"] = SignUp;
