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
var react_1 = require("@ionic/react");
var react_router_1 = require("@ionic/react-router");
var react_router_dom_1 = require("react-router-dom");
var components_1 = require("./components");
/* Core CSS required for Ionic components to work properly */
require("@ionic/react/css/core.css");
/* Basic CSS for apps built with Ionic */
require("@ionic/react/css/normalize.css");
require("@ionic/react/css/structure.css");
require("@ionic/react/css/typography.css");
/* Optional CSS utils that can be commented out */
require("@ionic/react/css/padding.css");
require("@ionic/react/css/float-elements.css");
require("@ionic/react/css/text-alignment.css");
require("@ionic/react/css/text-transformation.css");
require("@ionic/react/css/flex-utils.css");
require("@ionic/react/css/display.css");
/* Theme variables */
require("./theme/variables.css");
require("./index.css");
var Login_1 = require("./pages/Login");
var Tabs_1 = require("./pages/Tabs");
var pages_1 = require("./pages");
var app_context_1 = require("./context/app-context");
var util_1 = require("./helpers/util");
var useAuth_1 = require("./context/useAuth");
var react_2 = require("react");
var firebase_1 = require("firebase");
var PrivateRoute_1 = require("./pages/PrivateRoute");
var App = function () {
    var sideMenuToggle = util_1.useToggle();
    var auth = useAuth_1.useAuth();
    react_2.useEffect(function () {
        var unregisterAuthObserver = firebase_1["default"].auth().onAuthStateChanged(function (user) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth.setUser(user)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return function () { return unregisterAuthObserver(); }; // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
    var DebugRouter = function (_a) {
        var children = _a.children;
        var location = react_router_dom_1.useHistory().location;
        if (process.env.NODE_ENV === 'development') {
            console.log("Route: " + location.pathname + location.search + ", State: " + JSON.stringify(location.state));
        }
        return children;
    };
    return (React.createElement(app_context_1.AppContext.Provider, { value: {
            sideMenuToggle: sideMenuToggle,
            auth: auth
        } },
        React.createElement(react_1.IonApp, { className: "bg-skin-base" },
            React.createElement(react_router_1.IonReactRouter, null,
                React.createElement(react_1.IonRouterOutlet, { id: "main" },
                    React.createElement(components_1.AppLayout, null,
                        React.createElement(components_1.AppHeader, null),
                        React.createElement("div", { className: "flex-grow p-2 overflow-scroll" },
                            React.createElement(DebugRouter, null,
                                React.createElement(PrivateRoute_1["default"], { exact: true, path: "/", component: pages_1.Naaps }),
                                React.createElement(react_router_dom_1.Route, { path: "/login" },
                                    React.createElement(Login_1["default"], null)),
                                React.createElement(react_router_dom_1.Route, { path: "/naaps", exact: true },
                                    React.createElement(pages_1.Naaps, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/naap-form", exact: true },
                                    React.createElement(pages_1.NaapForm, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/orders", exact: true },
                                    React.createElement(pages_1.Orders, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/order-form", exact: true },
                                    React.createElement(pages_1.OrderForm, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/kareegars", exact: true },
                                    React.createElement(pages_1.Kareegars, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/kareegar-form", exact: true },
                                    React.createElement(pages_1.KareegarForm, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/settings", exact: true },
                                    React.createElement(pages_1.Settings, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/membership", exact: true },
                                    React.createElement(pages_1.MemberShip, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/pay", exact: true },
                                    React.createElement(pages_1.Pay, null)),
                                React.createElement(react_router_dom_1.Route, { path: "/success", exact: true },
                                    React.createElement(pages_1.Success, null)))),
                        React.createElement("div", { className: "fixed bottom-0 z-40 w-full p-0 " }, auth.isAuth() && React.createElement(Tabs_1.Tabs, null))))))));
};
exports["default"] = App;
